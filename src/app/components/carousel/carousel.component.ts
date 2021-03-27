import {
  AfterViewChecked,
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
export class CarouselComponent implements AfterViewChecked, AfterViewInit, OnDestroy, OnInit {
  @ViewChild('scene') scene: ElementRef<HTMLElement>;
  @ViewChild('carousel') carousel: ElementRef<HTMLElement>;
  @ViewChildren('cellContainer', { emitDistinctChangesOnly: true }) cells: QueryList<ElementRef<HTMLElement>>;
  height$ = this.resize$.pipe(map(entry => entry.contentRect.height));
  width$ = this.resize$.pipe(map(entry => entry.contentRect.width));
  selected: IFile[];
  private sceneRect: DOMRect;
  private cellCount: number;
  private cellHeight: number;
  private cellWidth: number;
  private isHorizontal = true;
  private radius: number;
  private rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
  private rotationIndex = 0;
  private theta: number;

  private readonly subs: Subscription[] = [];

  constructor(
    private readonly mediaService: MediaService,
    private readonly resize$: NgResizeObserver,
  ) {}

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.rotationIndex--;
        this.rotate();
        break;

      case 'ArrowRight':
        this.rotationIndex++;
        this.rotate();
        break;

      case 'ArrowDown':
        this.mediaService.removeFromSelection(this.cellIndex);
        this.change();
        break;
    }
  }

  ngOnInit(): void {
    const selectedSub = this.mediaService.selected$.subscribe(
      (data) => this.selected = data,
    );

    this.subs.push(selectedSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.change();
  }

  ngAfterViewChecked(): void {
    this.cells.changes.subscribe(
      () => {
        this.cellCount = this.cells.length;
        this.change();
      });
  }

  rotate(): void {
    const angle = this.theta * this.rotationIndex * -1;
    this.carousel.nativeElement.style.transform = `${this.rotateFn}(${angle}deg)`;

    const cellInner = this.carousel.nativeElement.querySelectorAll('.carousel__cell');
    cellInner.forEach((item: HTMLDivElement, index) => {
      const itemAngle = (this.rotationIndex - index++) * this.theta;
      item.style.transform = `${this.rotateFn}(${itemAngle}deg)`;
    });
  }

  // use an arrow function to workaround issues with reference to `this`
  change = (): void => {
    this.sceneRect = this.scene.nativeElement.getBoundingClientRect();

    this.cellHeight = this.sceneRect.height;
    this.cellWidth = this.sceneRect.width;

    this.cellCount = this.cells.length;

    this.theta = 360 / this.cellCount;
    const cellSize = this.isHorizontal ? this.cellWidth : this.cellHeight;
    this.radius = Math.round((cellSize / 2) / Math.tan(Math.PI / this.cellCount));

    for (let i = 0; i < this.cellCount; i++) {
      const cell = this.cells.get(i);

      if (i < this.cellCount) {
        // visible cell
        cell.nativeElement.style.opacity = '1';
        const cellAngle = this.theta * i;
        cell.nativeElement.style.transform = `${this.rotateFn}(${cellAngle}deg) translateZ(${this.radius}px)`;
      } else {
        // hidden cell
        cell.nativeElement.style.opacity = '0';
        cell.nativeElement.style.transform = 'none';
      }
    }

    this.rotate();
  };

  onOrientationChange(): void {
    this.isHorizontal = true;
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.change();
  }

  private get cellIndex(): number {
    const remainder = Math.floor(Math.abs(this.rotationIndex / this.selected.length));
    return this.rotationIndex - (remainder * this.selected.length);
  }
}
