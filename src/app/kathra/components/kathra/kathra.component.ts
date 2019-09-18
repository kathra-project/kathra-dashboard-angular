import { Component, OnInit } from '@angular/core';
import { query, animate, group, style, trigger, transition } from '@angular/animations';
import { LoggerService } from '../../../kathra-tools';
/**
 * Animation between child components.
 * Animates LTR
 */
const slideLeft = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(0%,0,0)' }), {optional:true}),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(-100%,0,0)' }), {optional:true}),
  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(100%,0,0)' })), // y: '-100%'
    ]), {optional:true}),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0%,0,0)' })),
    ]), {optional:true})
  ])
]
/**
 * Animation between child components.
 * Animates RTL
 */
const slideRight = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(0%,0,0)' }), {optional:true}),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)' }), {optional:true}),

  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(-100%,0,0)' })), // y: '-100%'
    ]), {optional:true}),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0%,0,0)' })),
    ]), {optional:true})
  ])
] 

@Component({
  templateUrl: './kathra.component.pug',
  styleUrls: ['./kathra.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('applications => environments', slideRight),
      transition('environments => catalog', slideRight),
      transition('catalog => datasources', slideRight),
      transition('applications => catalog', slideRight),
      transition('applications => datasources', slideRight),
      transition('environements => datasources', slideRight),

      transition('datasources => catalog', slideLeft),
      transition('catalog => environments', slideLeft),
      transition('environments => applications', slideLeft),
      transition('datasources => environments', slideLeft),
      transition('datasources => applications', slideLeft),
      transition('catalog => applications', slideLeft)
    ])
  ]
})
export class KathraComponent implements OnInit {

  constructor(
    private logger: LoggerService
  ) { }

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};

    let loadedComponent = animation['value'] || null;
    let controlsEls = <NodeListOf<HTMLElement>>document.querySelectorAll('kathra-control');

    // Change status of the swipper controls 
    for(let i=0; i<controlsEls.length; i++){
      // Resize all components, reset their order to 1, and remove the 'selected' class
      controlsEls[i].style.flex = "none";
      controlsEls[i].style.order = "1";
      controlsEls[i].classList.remove("selected");

      if(controlsEls[i].className.includes(loadedComponent)){
        // Flex the component we clicked on, order it to the left (0) and add the 'selected' class
        controlsEls[i].style.flex = "1";
        controlsEls[i].style.order = "0";
        controlsEls[i].classList.add("selected")
      }
    }
    // Return corresponding animation value
    return loadedComponent;
  }

  ngOnInit() {
  }
}