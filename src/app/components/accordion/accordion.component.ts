import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'accordion',
  template: '<ng-content></ng-content>'
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {
    setTimeout(() => this.panels.toArray()[0].isOpen = true);

    this.panels.toArray().forEach((panel: PanelComponent) => {
      panel.toggle.subscribe(
        () => this.openPanel(panel),
      );
    });
  }

  openPanel(panel: PanelComponent) {
    this.panels.toArray().forEach(p => p.isOpen = false);
    panel.isOpen = true;
  }
}
