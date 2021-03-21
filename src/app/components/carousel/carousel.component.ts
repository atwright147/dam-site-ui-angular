import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { map } from 'rxjs/operators';
import { NgResizeObserver, ngResizeObserverProviders } from 'ng-resize-observer';
import { Subscription } from 'rxjs';

import { MediaService } from '../../services/media.service';
import { IFile } from '../../interfaces/files.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [...ngResizeObserverProviders],
})
export class CarouselComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('carousel') carousel: ElementRef<HTMLElement>;
  @ViewChildren('cellContainer', { emitDistinctChangesOnly: true }) cells: QueryList<ElementRef<HTMLElement>>;
  height$ = this.resize$.pipe(map(entry => entry.contentRect.height));
  width$ = this.resize$.pipe(map(entry => entry.contentRect.width));
  selected: IFile[];

  cellCount: number;
  cellHeight: number;
  cellWidth: number;
  isHorizontal = true;
  radius: number;
  rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
  rotationIndex = 0;
  theta: number;

  private _selectionIndex = 0;
  private readonly subs: Subscription[] = [];

  set selectionIndex(value: number) {
    if (value > this.selected.length) {
      this._selectionIndex = value / this.selected.length;
    } else if (value < 0) {
      this._selectionIndex = Math.abs(value) / this.selected.length;
    } else {
      this._selectionIndex = value;
    }
  }

  get selectionIndex() {
    return this._selectionIndex;
  }

  constructor(
    private readonly mediaService: MediaService,
    private readonly resize$: NgResizeObserver,
  ) {}

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.rotationIndex--;
        this.selectionIndex = this.rotationIndex;
        this.rotate();
        break;

      case 'ArrowRight':
        this.rotationIndex++;
        this.selectionIndex = this.rotationIndex;
        this.rotate();
        break;

      case 'ArrowDown':
        console.info('cellIndex', this.getCellIndex(this.rotationIndex, this.selected.length));
        break;
    }
  }

  ngOnInit(): void {
    const selectedSub = this.mediaService.selected$.subscribe(
      (data) => this.selected = data,
    );

    this.subs.push(selectedSub);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    const cellRect = this.cells.first.nativeElement.getBoundingClientRect();
    this.cellHeight = cellRect.height;
    this.cellWidth = cellRect.width;

    this.cellCount = this.cells.length;

    this.change();
  }

  rotate(): void {
    const angle = this.theta * this.rotationIndex * -1;
    this.carousel.nativeElement.style.transform = this.rotateFn + '(' + angle + 'deg)';

    const cellInner = this.carousel.nativeElement.querySelectorAll('.carousel__cell');
    cellInner.forEach((item: HTMLDivElement, index) => {
      const itemAngle = (this.rotationIndex - index++) * this.theta;
      item.style.transform = this.rotateFn + '(' + itemAngle + 'deg)';
    });
  }

  change(): void {
    this.theta = 360 / this.cellCount;
    const cellSize = this.isHorizontal ? this.cellWidth : this.cellHeight;
    this.radius = Math.round((cellSize / 2) / Math.tan(Math.PI / this.cellCount));

    for (let i = 0; i < this.cellCount; i++) {
      const cell = this.cells.get(i);

      if (i < this.cellCount) {
        // visible cell
        cell.nativeElement.style.opacity = '1';
        const cellAngle = this.theta * i;
        cell.nativeElement.style.transform = this.rotateFn + '(' + cellAngle + 'deg) translateZ(' + this.radius + 'px)';
      } else {
        // hidden cell
        cell.nativeElement.style.opacity = '0';
        cell.nativeElement.style.transform = 'none';
      }
    }

    this.rotate();
  }

  onOrientationChange(): void {
    this.isHorizontal = true;
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.change();
  }

  private getCellIndex(rotationIndex: number, cellQuantity: number): number {
    const remainder = Math.floor(Math.abs(rotationIndex / (cellQuantity)));
    const remainderMultiple = remainder * cellQuantity;
    return (rotationIndex - remainderMultiple);
  }
}
