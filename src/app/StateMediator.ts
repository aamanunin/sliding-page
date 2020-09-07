export enum StateType {
  MainPanelOnly,
  MainPanelWithSideNav,
  DetailPanel
}

export enum PanelType {
  Primary,
  Detail
}

export interface IState {
  getPanelType(): PanelType;
  getStateType(): StateType;
  getPanelButtonClass(): string;
  isSideNavVisible(): boolean;
}

export class MainPanelOnly implements IState {
  getPanelType(): PanelType {
    return PanelType.Primary;
  }

  getStateType(): StateType {
    return StateType.MainPanelOnly;
  }

  getPanelButtonClass(): string {
    return 'fa-chevron-right';
  }

  isSideNavVisible(): boolean {
    return false;
  }
}

export class MainPanelWithSideNav implements IState {
  getPanelType(): PanelType {
    return PanelType.Primary;
  }

  getStateType(): StateType {
    return StateType.MainPanelWithSideNav;
  }

  getPanelButtonClass(): string {
    return 'fa-chevron-left';
  }

  isSideNavVisible(): boolean {
    return true;
  }
}

export class DetailPanel implements IState {
  getPanelType(): PanelType {
    return PanelType.Detail;
  }

  getStateType(): StateType {
    return StateType.DetailPanel;
  }

  getPanelButtonClass(): string {
    return '';
  }

  isSideNavVisible(): boolean {
    return false;
  }
}

export interface IMediatorImpl {
  showNavPanel();
  hideNavPanel();
  showDetailPanel();
  hideDetailPanel();
  changeShowHideSideButton(fromClass: string, toClass: string);
}

export class Mediator {
  private mainPanelState = new MainPanelOnly();
  private detailPanelState = new DetailPanel();
  private sideNavState = new MainPanelWithSideNav();

  private currentState: IState;
  private currentMainPanelState: IState;
  private mediatorImpl: IMediatorImpl;

  constructor(mediatorImpl: IMediatorImpl) {
    this.mediatorImpl = mediatorImpl;
    this.currentState = this.currentMainPanelState = this.sideNavState;
  }

  getStateImpl(stateType: StateType): IState {
    let stateImpl: IState;
    switch (stateType) {
      case StateType.DetailPanel:
        stateImpl = this.detailPanelState;
        break;
      case StateType.MainPanelOnly:
        stateImpl = this.mainPanelState;
        break;
      case StateType.MainPanelWithSideNav:
        stateImpl = this.sideNavState;
        break;
    }

    return stateImpl;
  }

  moveToState(stateType: StateType) {
    const previousState = this.currentState;
    const nextState = this.getStateImpl(stateType);

    if (previousState.getPanelType() === PanelType.Primary && nextState.getPanelType() === PanelType.Detail) {
      this.mediatorImpl.showDetailPanel();
    }

    if (previousState.getPanelType() === PanelType.Detail && nextState.getPanelType() === PanelType.Primary) {
      this.mediatorImpl.hideDetailPanel();
    }

    if (nextState.isSideNavVisible()) {
      this.mediatorImpl.showNavPanel();
    } else {
      this.mediatorImpl.hideNavPanel();
    }

    this.mediatorImpl.changeShowHideSideButton(
      previousState.getPanelButtonClass(),
      nextState.getPanelButtonClass()
    );

    this.currentState = nextState;
    if (this.currentState.getPanelType() === PanelType.Primary) {
      this.currentMainPanelState = this.currentState;
    }
  }

  getCurrentMainPanelState(): IState {
    return this.currentMainPanelState;
  }

  showHideSideNavClicked() {
    switch (this.currentState.getStateType()) {
      case StateType.MainPanelWithSideNav:
        this.moveToState(StateType.MainPanelOnly);
        break;
      case StateType.MainPanelOnly:
        this.moveToState(StateType.MainPanelWithSideNav);
        break;
    }
  }
}
