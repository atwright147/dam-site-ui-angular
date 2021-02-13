import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() isOpen = false;
  @Input() title: string;
  @Output() toggle: EventEmitter<PanelComponent> = new EventEmitter<PanelComponent>();
}
