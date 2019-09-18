import { Injectable, Provider } from '@angular/core';

@Injectable()
export class LoggerService {

    public LEVEL = {
        DEBUG:  1,
        LOG:    2,
        WARN:   3,
        ERROR:  4
    }

    public threshold: number = this.LEVEL.WARN;

    constructor(){}

    log(level: number, message: string, ...args: any[]): void {
        let argsArray = [message];
        for(let i=0; i<args.length; i++){ argsArray.push(args[i]); };

        if (level >= this.threshold){
            if (level == this.LEVEL.ERROR){
                console.error.apply(this, argsArray);
            }
            else if (level == this.LEVEL.WARN){
                console.warn.apply(this, argsArray);
            }
            else if (level == this.LEVEL.LOG){
                console.log.apply(this, argsArray);
            }
            else if (level == this.LEVEL.DEBUG){
                console.debug.apply(this, argsArray);
            }
        }
    }

    debug(message: string, ...args: any[]): void {
        this.log(this.LEVEL.DEBUG, message, args);
    }
    warn(message: string, ...args: any[]): void {
        this.log(this.LEVEL.WARN, message, args);
    }
    error(message: string, ...args: any[]): void {
        this.log(this.LEVEL.ERROR, message, args);
    }

    setLevel(level: number): void {
        if (level > 0 && level <= 4) { this.threshold = level; }
        else { this.log(this.LEVEL.ERROR, "LoggerService could't set log level, must be between 1(:ERROR) and 4(:DEBUG)"); }
    }
}