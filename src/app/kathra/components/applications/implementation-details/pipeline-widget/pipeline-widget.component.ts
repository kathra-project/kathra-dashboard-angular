import { Component,Input, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PipelinesService, RepositoriesService, Implementation, Build } from '../../../../../appmanager';
import { FormGroup, FormControl } from '@angular/forms';
import { KathraElementStatusService } from '../../../../../kathra-tools';
import { Observable, timer, pipe, Subscription } from 'rxjs';
import { AppConfig } from '../../../../../app.config';

@Component({
  selector: 'kathra-pipeline-widget',
  templateUrl: './pipeline-widget.component.pug',
  styleUrls: ['./pipeline-widget.component.scss']
})

export class PipelineWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() implementation: Implementation;

  @Input() branches: Array<String> = [];
  builds: Array<Build> = [];
  subscription: Subscription;
  private _currentBranch: string;
  private _buildResquested: Build;
  @Input('currentBranch')
  set currentBranch(branch: string) {
    this._currentBranch = branch;
    this.updateBuilds(branch, null)
  }

  constructor( 
    private pipelineSvc: PipelinesService,
    private kathraStatus: KathraElementStatusService,
    private el: ElementRef,
    private config: AppConfig,
    private repositorySvc: RepositoriesService ) {}

  buildPipeline(event){
    this.buildsLoading();
    
    this._buildResquested = {
      buildNumber: 'n/c',
      creationDate: (Date.now()/1000),
      status: Build.StatusEnum.Scheduled
    };
    this.pipelineSvc.executePipeline(this.implementation.pipeline.id, this._currentBranch).subscribe(res => {
      this._buildResquested = null;
    });
    
    this.builds.push(this._buildResquested);
  }

  updateBuilds(branch: string, subscription: Subscription) {
    this._currentBranch = branch;
    this.buildsLoading();

    this.pipelineSvc.getPipelineBuildsForBranch(this.implementation.pipeline.id, branch).subscribe(builds => {
      if(builds != null && builds.length > 0){
        this.builds = builds.slice(0, 4)
      }else{
        this.builds = [];
      }
      if (this._buildResquested) {
        this.builds.push(this._buildResquested);
      }
      this.buildsLoaded();
    });
  }

  allBuildsFinished(){
    let result = this.builds.find( (build) => !this.kathraStatus.isBuildSucceed(build) && !this.kathraStatus.isBuildFailed(build) )
    return result == undefined
  }

  displayLogs( build){
    let projectPath = this.implementation.pipeline.path.split("/").join("/job/")
    let pipelineUrl = this.config.getConfig("pipeline_endpoint")
    let buildLogPath = pipelineUrl + projectPath + "/" + build.buildNumber + "/console"
    window.open(buildLogPath)
  }

  buildsLoaded(){
    let loader:HTMLElement = this.el.nativeElement.querySelector('.ui.special.loader');
    //loader.classList.remove('active')
  }

  buildsLoading(){
    let loader:HTMLElement = this.el.nativeElement.querySelector('.ui.special.loader');
    //loader.classList.add('active')
  }

  getTimeInMinute(timeInMilli){
    let seconds = timeInMilli/1000;
    let minutes = seconds/60;
    return Math.floor(minutes);
  }

  ngOnInit() {
    if(this.implementation != null){
      this.updateBuilds("dev", null);
    }
  }

  ngAfterViewInit(){
    this.subscription = timer(5000, 10000).subscribe( x => {
      this.updateBuilds(this._currentBranch, this.subscription);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
