import { Component, ContentChildren, QueryList, AfterContentChecked, Input } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'accordion',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterContentChecked {
  @Input() initOpenFirst = false;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  firstWasSet = false;

  ngAfterContentChecked() {
    if (this.initOpenFirst) {
      if (this.panels.length) {
        this.firstWasSet = true;
      }

      if (!this.firstWasSet) {
        setTimeout(() => this.panels.first.isOpen = true);
      }
    }

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
