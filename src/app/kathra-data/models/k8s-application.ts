export class K8sApplication {

    name : string;
    id : string;

    teaser : string;
    description : string;
    categories : Array<string>;
    
    group?: string;
    licence: string;
    websiteUrl: string;
    iconUrl: string;

    endorsements : number;
    comments : number;

    parameters : Array<any>;
    metadata?: {[key: string]: any};
}
