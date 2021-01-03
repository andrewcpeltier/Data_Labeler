import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InfoTab } from 'src/app/models/InfoTab';

@Component({
  selector: 'app-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.css']
})
export class InfoTabComponent implements OnInit {

  @Input() infoTabModel: InfoTab;
  assetImage: HTMLImageElement;

  constructor() { }

  ngOnInit(): void {
    this.assetImage = document.getElementById('viewImage') as HTMLImageElement;
  }

}
