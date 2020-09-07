import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-right-screen',
  templateUrl: './right-screen.component.html',
  styleUrls: ['./right-screen.component.css']
})
export class RightScreenComponent implements OnInit {
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  closeClicked() {
    this.notify.emit('Click from close button');
  }

  closeRightWindow() {
    document.getElementById('rightScreen').style.transform = 'translateX(100%)';
  }

  openRightWindow() {
    document.getElementById('rightScreen').style.transform = 'translateX(0%)';
  }
}
