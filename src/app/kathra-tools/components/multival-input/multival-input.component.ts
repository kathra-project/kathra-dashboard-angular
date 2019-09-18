import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kathra-multival-input',
  templateUrl: './multival-input.component.pug',
  styleUrls: ['./multival-input.component.scss']
})
export class MultivalInputComponent implements OnInit {

  tags: Array<string> = [];
  @Output() updateValue: EventEmitter<Array<string>> = new EventEmitter();

  constructor() { }

  processKeydown($event){
    if($event.key === 'Enter'){
      if($event.target.value != "" && !this.hasTag($event.target.value))
        this.addTag($event.target.value);
      $event.target.value = "";
    }
  }

  hasTag(value){
    return this.tags.includes(value);
  }

  addTag(tag: string){
    this.tags.push(tag);
    this.updateValue.emit(this.tags);
  }
  
  deleteTag(tag: string){
    this.tags.splice(this.tags.findIndex(item => item == tag), 1);
    this.updateValue.emit(this.tags);
  }

  ngOnInit() {
  }
}
