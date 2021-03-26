import { Component, ContentChildren, QueryList, OnDestroy, ChangeDetectionStrategy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-accordion',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnDestroy, AfterContentInit {
  @ContentChildren(PanelComponent, { emitDistinctChangesOnly: true }) panels: QueryList<PanelComponent>;
  subscriptions: Subscription[] = [];

  ngAfterContentInit(): void {
    const panelChangesSub = this.panels.changes.subscribe(
      () => {
        this.panels.toArray().forEach((panel: PanelComponent) => {
          const sub = panel.toggle.subscribe(
            () => this.openPanel(panel),
          );
          this.subscriptions.push(sub);
        });
      },
    );
    this.subscriptions.push(panelChangesSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openPanel(panel: PanelComponent): void {
    this.panels.toArray().forEach(p => {
      if (p !== panel) {
        p.isOpen = false;
      }
    });
    panel.isOpen = !panel.isOpen;
  }
}
