import { K8sApplication } from './k8s-application'

export class K8sEnvironment {

    name: string;
    owner: string;
    status: string;

    services: Array<K8sApplication>;
    tags: Array<string>;
    events: Array<any>;
}