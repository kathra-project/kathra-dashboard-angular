import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Implementation, RepositoriesService, Commit } from '../../../../../appmanager';

@Component({
  selector: 'kathra-source-repository-widget',
  templateUrl: './source-repository-widget.component.pug',
  styleUrls: ['./source-repository-widget.component.scss']
})
export class SourceRepositoryWidgetComponent implements OnInit {
  @Input() implementation: Implementation;

  @Input() branches: Array<String> = [];
  commits: Array<Commit> = [];

  private _currentBranch: string;
  @Input('currentBranch')
  set currentBranch(branch: string) {
    this._currentBranch = branch;
    this.updateCommits(branch)
  }

  constructor(
    private el: ElementRef,
    private repositorySvc: RepositoriesService) { }

  commitsLoaded(){
    let loader:HTMLElement = this.el.nativeElement.querySelector('.commits .dimmable .dimmer');
    loader.classList.remove('active')
  }

  commitsLoading(){
    let loader:HTMLElement = this.el.nativeElement.querySelector('.commits .dimmable .dimmer');
    loader.classList.add('active')
  }

  updateCommits(branch) {
    this._currentBranch = branch;
    this.commitsLoading();

    this.repositorySvc.getRepositoryCommitsForBranch(this.implementation.sourceRepository.id, branch).subscribe(commits => {
      if(commits != null && commits.length > 0){
        this.commits = commits.slice(0, 4)
      }else{
        this.commits = [];
      }
      this.commitsLoaded();
    });
  }

  ngOnInit() {
    if(this.implementation != null){
      this.updateCommits("dev");
    }
  }

}
