import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { map } from 'rxjs/operators';
import { NgResizeObserver, ngResizeObserverProviders } from 'ng-resize-observer';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [...ngResizeObserverProviders],
})
export class CarouselComponent implements AfterViewInit, OnInit {
  @ViewChild('carousel') carousel: ElementRef<HTMLElement>;
  @ViewChildren('cellContainer', { emitDistinctChangesOnly: true }) cells: QueryList<ElementRef<HTMLElement>>;
  height$ = this.resize$.pipe(map(entry => entry.contentRect.height));
  width$ = this.resize$.pipe(map(entry => entry.contentRect.width));
  selection$ = this.mediaService.selected$;

  cellCount: number;
  cellHeight: number;
  cellWidth: number;
  isHorizontal = true;
  radius: number;
  rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
  selectedIndex = 0;
  theta: number;

  constructor(
    private readonly mediaService: MediaService,
    private readonly resize$: NgResizeObserver,
    ) {}

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.selectedIndex--;
        this.rotate();
        break;

      case 'ArrowRight':
        this.selectedIndex++;
        this.rotate();
        break;

      case 'ArrowDown':
        console.info(this.selectedIndex);
        break;
    }
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const cellRect = this.cells.first.nativeElement.getBoundingClientRect();
    this.cellHeight = cellRect.height;
    this.cellWidth = cellRect.width;

    this.cellCount = this.cells.length;

    this.change();
  }

  rotate(): void {
    const angle = this.theta * this.selectedIndex * -1;
    this.carousel.nativeElement.style.transform = this.rotateFn + '(' + angle + 'deg)';

    const cellInner = this.carousel.nativeElement.querySelectorAll('.carousel__cell');
    cellInner.forEach((item: HTMLDivElement, index) => {
      const itemAngle = (this.selectedIndex - index++) * this.theta;
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
}
