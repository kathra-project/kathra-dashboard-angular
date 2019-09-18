import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';

export class KathraInputFilter {
  values: Array<string>;
  prefix: string;
}

@Component({
  selector: 'kathra-filter',
  templateUrl: './multicrit-input-filter.component.pug',
  styleUrls: ['./multicrit-input-filter.component.scss']
})
export class MulticritInputFilterComponent implements OnInit {

  keyUp = new Subject<any>();

  @Input()
    filters: Array<KathraInputFilter>  = [];
  @Input()
    placeholder: string = 'placeholder';
  @Output()
    onFilteringOptsRefresh: EventEmitter<any> = new EventEmitter();

  optionsList: Array<any> = [];
  validatedOptionsList: Array<any> = [];
  
  constructor(
    private el: ElementRef
  ) {}

  public refreshFilteringOptions(){
    let filtOpts = [];
    
    for(let opt of this.validatedOptionsList){
      if(opt.prefix){
        if(!filtOpts[opt.prefix]){
          filtOpts[opt.prefix] = [opt.value];
        }
        else{
          filtOpts[opt.prefix].push(opt.value);
        }
      }
      else {
        if(!filtOpts['none']){
          filtOpts['none'] = [opt.value];
        }
        else{
          filtOpts['none'].push(opt.value);
        }
      }
    }
    this.onFilteringOptsRefresh.emit(filtOpts);
  }

  containsOption(arr, option) {
    for(let opt of arr){
      if(opt.prefix === option.prefix && opt.value === option.value){
        return true;
      }
    }
    return false;
  }

  preventDefaultBehaviours($event){
    if($event.key === 'ArrowDown' || $event.key === 'ArrowUp'){
      $event.preventDefault();
      $event.stopPropagation();
    }
    if($event.key === "Backspace"){
      if($event.target.value === "") {
        this.validatedOptionsList.pop();
        this.refreshFilteringOptions();
      }
    }
  }

  processInputValue(newStr: string){
    // Generates all related options
    this.optionsList.length = 0;
    if(newStr === '') return;

    // Add raw string filter to the optionsList
    // If it's not already validated
    if(!this.containsOption(this.validatedOptionsList, {prefix: null, value: newStr})){
      this.optionsList.push({
        prefix: null,
        value: newStr
      });
    }
    
    // Search for newStr in each filterCollection
    for(let filter of this.filters){

      filter.values.filter(function(item, idx, arr){
        // Add matching item to the optionsList
        // If it's not already validated
        if(item.toLowerCase().includes(newStr.toLowerCase())){
          if(!this.containsOption(this.validatedOptionsList, {prefix: filter.prefix, value: item})){
            this.optionsList.push({
              prefix: filter.prefix,
              value: item
            });
          }
        }
      }.bind(this))
    }

    // Focus first result option
    setTimeout(function(){
      let toFocus = <HTMLElement>(<HTMLElement>this.el.nativeElement).querySelector('.options.list > .option:first-child');
      if(toFocus) toFocus.classList.add('focused');
    }.bind(this));
  }

  shiftOptionFocus(direction: string) {
    let focusedEl: HTMLElement = this.el.nativeElement.querySelector('.options.list .option.focused');
    
    if(focusedEl){
      focusedEl.classList.remove('focused');
      
      if(direction === 'down') {
        let nextFocus = focusedEl.nextElementSibling || focusedEl.parentElement.firstElementChild;
        if(nextFocus) nextFocus.classList.add('focused');
      }
      else if(direction === 'up'){
        let nextFocus = focusedEl.previousElementSibling || focusedEl.parentElement.lastElementChild;
        if(nextFocus) nextFocus.classList.add('focused');
      }
    }
    else {
      let toFocusEl: HTMLElement = this.el.nativeElement.querySelector('.options.list .option:first-child');
      if(toFocusEl){
        toFocusEl.classList.add('focused');
      }
    }
  }

  validateInputSelection(){
    // Validates selection and add the filter to the component
    let input = this.el.nativeElement.querySelector('.icon.input input');
    let focusedEl = this.el.nativeElement.querySelector('.options.list .option.focused');
    if(focusedEl){
      let focusedElOption = this.optionsList.find(item => item.value.toLowerCase() === focusedEl.attributes.val.value.toLowerCase());
      
      // Validate the option if it's not already done
      if(!this.containsOption(this.validatedOptionsList, focusedElOption.value) && this.validatedOptionsList.length <5){ 
        this.validatedOptionsList.push(focusedElOption);
        this.refreshFilteringOptions();
      }
      input.value = "";
    }
  }

  focusOption($event){
    let options = this.el.nativeElement.querySelectorAll('.options.list .option');
    for(let opt of options){
      opt.classList.remove('focused');
    }
    $event.target.classList.add('focused');
  }

  selectOption($event){
    this.validateInputSelection();
    this.processInputValue('');
  }

  removeOption(option: any){
    this.validatedOptionsList = this.validatedOptionsList.filter(item => item.prefix != option.prefix || item.value != option.value)
    this.refreshFilteringOptions();
  }

  ngOnInit() {
    // Set click events on options list


    // Subscribe to the input changes with delay
    // Allows to let the user type and don't trigger events for every key pressed
    const subscription = this.keyUp
      .pipe(
        map(function(event){
          // If we type 'Enter', validates the currently selected option
          if(event.key){
            if(event.key === 'Enter'){
              this.validateInputSelection();
            }
            if(event.key === 'ArrowDown'){
              this.shiftOptionFocus('down');
            }
            if(event.key === 'ArrowUp'){
              this.shiftOptionFocus('up');
            }
          }

          // Pass the input value to the processing method
          return event.target.value;
        }.bind(this)),
        debounceTime(200),
        distinctUntilChanged(),
        flatMap(search => of(search)))
      .subscribe(this.processInputValue.bind(this));
  }
}
