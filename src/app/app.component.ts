import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SidenavComponent} from './sidenav/sidenav.component';
import {RightScreenComponent} from './right-screen/right-screen.component';
import {IMediatorImpl, Mediator, StateType} from './StateMediator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements IMediatorImpl, AfterViewInit {
  @ViewChild(SidenavComponent)
  private sideNav: SidenavComponent;

  @ViewChild(RightScreenComponent)
  private rightScreen: RightScreenComponent;

  title = 'Select an options :';
  mediator: Mediator = new Mediator(this);

  ngAfterViewInit(): void {
    this.mediator.moveToState(StateType.MainPanelWithSideNav);
  }

  showHideSideClicked() {
    this.mediator.showHideSideNavClicked();
  }

  detailButtonClicked() {
    this.mediator.moveToState(StateType.DetailPanel);
  }

  onNotifyRightWindow() {
    this.mediator.moveToState(this.mediator.getCurrentMainPanelState().getStateType());
  }

  changeShowHideSideButton(fromClass: string, toClass: string) {
    if (fromClass.length > 0 && toClass.length > 0) {
      document.getElementById('show-hide-side-button').classList.remove(fromClass);
      document.getElementById('show-hide-side-button').classList.add(toClass);
    }
  }

  showDetailPanel() {
    this.rightScreen.openRightWindow();
    document.getElementById('main').style.transform = 'translateX(-100%)';
  }

  hideDetailPanel() {
    this.rightScreen.closeRightWindow();
    document.getElementById('main').style.transform = 'translateX(0%)';
  }

  showNavPanel() {
    this.sideNav.showNav();
    document.getElementById('main').style.marginLeft = '250px';
  }

  hideNavPanel() {
    this.sideNav.closeNav();
    document.getElementById('main').style.marginLeft = '0px';
  }
}
