import { Component, OnInit, ViewChild } from '@angular/core';
import { PageHostDirective } from 'src/app/directives/page-host.directive';
import { InfoTab } from 'src/app/models/InfoTab';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @ViewChild(PageHostDirective, {static: true}) overviewHost: PageHostDirective;

  overviewTab: InfoTab = {
    tabName: 'Overview',
    asset_1: ''
  }
  trialOne: InfoTab = {
    tabName: 'Trial 1',
    asset_1: ''
  }
  trialTwo: InfoTab = {
    tabName: 'Trial 2',
    asset_1: ''
  }

  constructor(private assetService: AssetService) { }

  ngOnInit() {
    this.assetService.getAssetReferenceByName("202012419595").getDownloadURL().then(url => {
      this.overviewTab.asset_1 = url;
    });
  }

}
