import { Component, ContentChildren, QueryList, Input, OnDestroy, ChangeDetectionStrategy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-accordion',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnDestroy, AfterContentInit {
  @Input() initOpenFirst = false;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  hasPanelRefs = true;
  subscriptions: Subscription[] = [];

  ngAfterContentInit() {
    setTimeout(() => {
      this.panels.toArray().forEach((panel: PanelComponent) => {
        const sub = panel.toggle.subscribe(
          () => this.openPanel(panel),
        );
        this.subscriptions.push(sub);
      });

      if (this.initOpenFirst) {
        this.panels.first.isOpen = true;
      }
    }, 250);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openPanel(panel: PanelComponent) {
    this.panels.toArray().forEach(p => {
      if (p !== panel) {
        p.isOpen = false;
      }
    });
    panel.isOpen = !panel.isOpen;
  }
}
