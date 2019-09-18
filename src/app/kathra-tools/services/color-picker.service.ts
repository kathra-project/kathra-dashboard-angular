import { Injectable } from '@angular/core';

@Injectable()
export class ColorPickerService {

  private colors = [
    '#527a94', // bleu
    '#b95750', // rouge
    '#dacc84', // jaune
    '#c681c5', // violet
    '#7c9f60', // vert
    '#e5b263', // orange
    '#c5cace', // gris
    '#94cfd0', // turquoise
    '#dcd2b2', // sable
    '#b38770', // chataigne
  ];

  constructor() { }
  
  private stringRandomizer(str: string, modulo: number){
    let bigint = "";
    if(str != null){
      for(let i=0; i<str.length; i++){
          bigint = bigint.concat("" + str.charCodeAt(i));
      }
      return parseInt(bigint) % modulo;
    }
  }

  colorFromString(str){
    return this.colors[this.stringRandomizer(str, 9)];
  }

  hslFromString(str: string, level?: string){
    let _level: number;
    let _saturation = 25;

    switch(level){
      case "dark":
        _level = 40;
        break;
      case "light": 
        _level = 60;
        break;
      case "normal":
      default: 
        _level = 50;
        break;
    }

    let _hue = this.stringRandomizer(str, 255);

    return `hsl(${_hue}, ${_saturation}%, ${_level}%)`;
  }

  colorFromStatus(status: string){
    switch(status) { 
      case "READY": {
        return '#7c9f60';
      }
      case "ERROR": {
        return '#b95750';
      }
      default: {
        return '#e5b263';
      }
    }
  }
}
