import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: 'panel.component.html',
})
export class PanelComponent {
  @Input() isOpen = false;
  @Input() title: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
