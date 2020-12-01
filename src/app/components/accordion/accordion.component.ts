import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'accordion',
  template: '<ng-content></ng-content>'
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {
    // Open the first panel
    // this.panels.toArray()[0].open = true;

    // Loop through all panels
    this.panels.toArray().forEach((panel: PanelComponent) => {
      // subscribe panel toggle event
      panel.toggle.subscribe(() => {
        // Open the panel
        console.info(panel);
        this.openPanel(panel);
      });
    });
  }

  openPanel(panel: PanelComponent) {
    // close all panels
    this.panels.toArray().forEach(p => p.open = false);
    // open the selected panel
    panel.open = true;
  }
}
