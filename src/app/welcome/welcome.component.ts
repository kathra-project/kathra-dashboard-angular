import { Component, OnInit } from '@angular/core';
import { K8sWsService } from '../kathra-data';
import { K8sApplication } from '../kathra-data';
import { KathraAppComponent } from '../kathra-data';

@Component({
  selector: 'kathra-welcome',
  templateUrl: './welcome.component.pug',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  favoriteBundles = [
    { name: "Gestion de scénarii SDC", sources: ["IRT SystemX", "SVA"], id: "b_scenar-mgt-sdc"},
    { name: "ML Image classification", sources: ["IRT SystemX", "TAS"], id: "b_ml-img-classif" },
    { name: "Ethereum blockchain", sources: ["IRT SystemX", "BST"], id: "b_eth-blockchain" }
  ]

  favoriteEnvironments = [
    { name: "test-reduc-model", sources: ["IRT SystemX", "SVA"], id: "test-reduc-model"},
    { name: "autofeedback-tweeter-crawler", sources: ["IRT SystemX", "MSM"], id: "autofeedback-tweeter-crawler" },
    { name: "ethereum-netstat", sources: ["IRT SystemX", "BST"], id: "ethereum-netstat" }
  ]

  favoriteDatasources = [
    { name: "Dataset panneaux SNCF", sources: ["IRT SystemX", "TAS"], id: "dataset-panneaux-sncf"},
    { name: "Transports GeoJson La Defense", sources: ["IRT SystemX", "MSM"], id: "transports-geojson-ladefense" },
    { name: "Scenarios CUT-IN SVA", sources: ["IRT SystemX", "SVA"], id: "scenarios-cutin-sva" }
  ]

  constructor(
    private k8sModel: K8sWsService
  ) { }

  public get favoriteApps(): Array<K8sApplication> {
    return this.k8sModel.k8sApplications.filter((item, index) => item.categories[0] == 'dataprocessing')
  }

  ngOnInit() {

  }
}
