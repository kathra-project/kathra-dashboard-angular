import { Injectable } from '@angular/core';

@Injectable()
export class KathraElementStatusService {

  isPending(element): boolean {
    if(element != null){
      return element.status == 'PENDING';
    }else{
      return false;
    }
  }

  isBuildRunning(element): boolean {
    if(element != null){
      return element.status == 'PROCESSING';
    }else{
      return false;
    }
  }

  isBuildFailed(element): boolean {
    if(element != null){
      return element.status == 'FAILED';
    }else{
      return false;
    }
  }

  isBuildSucceed(element): boolean {
    if(element != null){
      return element.status == 'SUCCESS';
    }else{
      return false;
    }
  }

  isReady(element): boolean {
    if(element != null){
      return element.status == 'READY';
    }else{
      return false;
    }
  }

  isError(element): boolean {
    if(element != null){
      return element.status == 'ERROR';
    }else{
      return false;
    }
  }

  isCreating(element): boolean {
    return !this.isError(element) && !this.isReady(element);
  }

  isDone(element): boolean {
    return this.isError(element) || this.isReady(element);
  }

}