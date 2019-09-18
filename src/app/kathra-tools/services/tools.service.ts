import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() { }
  
  /**
   * Verifies if an object contains the given string value in the given key
   * @param obj The object containing the key to test
   * @param key The key the string value should be searched for in
   * @param value The string value to search for
   */
  keyContainsString(obj: Object, key: string, value: string): boolean {
    if(!value && value !== "" || !obj || !key || !obj[key] || typeof obj[key] != "string"){
      return false;
    }

    if(obj[key].toLowerCase().includes(value.trim().toLowerCase())){
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Verifies if an object contains the given string value in at least one of its keys
   * @param obj The object to test
   * @param value The string value to search for
   */
  objContainsString(obj: Object, value: string): boolean {
    if(!value && value !== "" || !obj){
      return false;
    }

    for(let key in obj){
      if(typeof obj[key] === "string" 
      && obj[key].toLowerCase().includes(value.trim().toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  /**
   * Collection sort method to sort objects by a given string key
   * @param objA The first object in the comparison method
   * @param objB The second object in the comparison method
   * @param key The key used to sort the objects
   * @param ascending The sort direction
   */
  objSortByKey(objA: Object, objB: Object, key: string, ascending = true) {
    let sign: number = ascending ? 1 : -1;
    if(objA[key] && objB[key]){
      if(objA[key].toString().toLowerCase() < objB[key].toString().toLowerCase())
        return -1*sign;
      else if(objA[key].toString().toLowerCase() > objB[key].toString().toLowerCase())
        return 1*sign;
      else
        return 0;
    }
    else return 0;
  }

  objSortByVersions(objA: Object, objB: Object, key: string, ascending = true){
    let sign: number = ascending ? 1 : -1;

    if(objA[key] && objB[key]){

      let aObjVersionNumber = objA[key].split('-')[0];
      let aObjVersionSuffix = objA[key].split('-')[1] || "";
      let bObjVersionNumber = objB[key].split('-')[0];
      let bObjVersionSuffix = objB[key].split('-')[1] || "";
      
      if(aObjVersionNumber < bObjVersionNumber)
        return -1*sign;
      else if(aObjVersionNumber > bObjVersionNumber)
        return 1*sign;
      
      // numbers equals, comparing suffixes
      else { 
        // NoSuffix always greatest
        if(aObjVersionSuffix.toUpperCase() == "")
          return 1*sign;
        
        // RC greater than SNAPSHOT, smaller than NoSuffix
        if(aObjVersionSuffix.toUpperCase() == "RC"){
          if(bObjVersionSuffix.toUpperCase() == "SNAPSHOT") {
            return 1*sign;
          }
          else 
            return -1*sign;
        }
        // SNAPSHOT always smallest
        if(aObjVersionSuffix.toUpperCase() == "SNAPSHOT"){
          return -1*sign;
        }
      }
    }
    else return 0;
  }
}
