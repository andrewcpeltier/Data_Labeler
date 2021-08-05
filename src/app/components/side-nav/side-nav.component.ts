import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ImageLabelScreenComponent } from '../image-label-screen/image-label-screen.component';
import { PageHostDirective } from 'src/app/directives/page-host.directive';
import { InfoComponent } from '../info/info.component';
import { MovementLabelScreenComponent } from '../movement-label-screen/movement-label-screen.component';

const LABEL_DATA = 0;
const MV_LABEL_DATA = 1;
const PROJECT_DETAILS = 2;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @ViewChild(PageHostDirective, {static: true}) pageHost: PageHostDirective;
  IMAGE_LABEL_PAGE = ImageLabelScreenComponent;
  MV_IMAGE_LABEL_PAGE = MovementLabelScreenComponent;
  PROJECT_DETAILS_PAGE = InfoComponent;
  test: any;
  currentPage = -1;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadPage(this.IMAGE_LABEL_PAGE, LABEL_DATA);
  }

  loadPage(component: any, type: number): void {
    if (this.currentPage !== type) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const viewContainerRef = this.pageHost.viewContainerRef;

      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);

      this.currentPage = type;
    }
  }

  tryLogout(): void {
    this.authService.logout();
  }
}
