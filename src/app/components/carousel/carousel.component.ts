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
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { map } from 'rxjs/operators';
import { NgResizeObserver, ngResizeObserverProviders } from 'ng-resize-observer';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, state } from '@angular/animations';

import { MediaService } from '../../services/media.service';
import { IFile } from '../../interfaces/files.interface';

// const TRANSLATE_DISTANCE = 250;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [...ngResizeObserverProviders],
  animations: [
    trigger('slideDownFade', [
      // TODO: figure out why cells spin when animating translations
      // state('void', style({ opacity: 0, transform: `translateY(${TRANSLATE_DISTANCE}px) translateZ(${TRANSLATE_DISTANCE}px)` })),
      state('void', style({ opacity: 0 })),
      transition(':leave', animate('250ms ease-out')),
    ]),
  ],
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

  private readonly animationEndUnlisten: () => void;
  private readonly subs: Subscription[] = [];

  constructor(
    private readonly hostElement: ElementRef<HTMLElement>,
    private readonly mediaService: MediaService,
    private readonly renderer: Renderer2,
    private readonly resize$: NgResizeObserver,
  ) {}

  @HostListener('window:keyup', ['$event']) onKeyup(event: KeyboardEvent): void {
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
        const node = this.cells.get(this.cellIndex).nativeElement.children.item(0);
        const rect = node.getBoundingClientRect();

        const nodeClone = node.cloneNode();
        this.renderer.setStyle(nodeClone, 'position', 'absolute');
        this.renderer.setStyle(nodeClone, 'top', `${rect.top}px`);
        this.renderer.setStyle(nodeClone, 'left', `${rect.left + 1}px`);
        this.renderer.setStyle(nodeClone, 'height', `${rect.height}px`);
        this.renderer.setStyle(nodeClone, 'width', `${rect.width}px`);
        this.renderer.removeStyle(nodeClone, 'transform');
        this.renderer.setStyle(nodeClone, 'transform', 'rotateX(20deg)');
        this.renderer.setProperty(nodeClone, 'id', 'anim-remove');
        this.renderer.appendChild(this.hostElement.nativeElement, nodeClone);

        let elementToRemove: HTMLDivElement;
        setTimeout(() => {
          elementToRemove = this.hostElement.nativeElement.querySelector<HTMLDivElement>('#anim-remove');
          const anim = elementToRemove.animate([{ transform: 'translateY(250px)', opacity: 0 }], 250);
          anim.onfinish = (): void => this.renderer.removeChild(this.hostElement.nativeElement, elementToRemove);
        });

        this.mediaService.removeFromSelection(this.cellIndex);
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
    this.animationEndUnlisten();
  }

  ngAfterViewInit(): void {
    setTimeout(this.change);
  }

  ngAfterViewChecked(): void {
    this.cells.changes.subscribe(
      () => {
        this.cellCount = this.cells.length;
      });

      this.resize$.subscribe(
        // TODO: is there a more efficient way of changing the carousel radius?
        () => this.change(),
      );
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

    this.cells.forEach((cell, index) => {
      cell.nativeElement.style.opacity = '1';
      const cellAngle = this.theta * index;
      cell.nativeElement.style.transform = `${this.rotateFn}(${cellAngle}deg) translateZ(${this.radius}px)`;
    });

    this.rotate();
  };

  onOrientationChange(): void {
    this.isHorizontal = true;
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.change();
  }

  onAnimEnd(event): void {
    this.change();
  }

  private get cellIndex(): number {
    const remainder = Math.floor(Math.abs(this.rotationIndex / this.selected.length));
    return this.rotationIndex - (remainder * this.selected.length);
  }
}
