import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { map } from 'rxjs/operators';
import { NgResizeObserver, ngResizeObserverProviders } from 'ng-resize-observer';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [...ngResizeObserverProviders],
})
export class CarouselComponent implements AfterViewInit, OnInit {
  //#region
  @Input() selection: unknown = [{ id: 1178, ImageUniqueID: '0c560ff6ccb6467c86380671ba49ae15', FileName: '20120117-e01.CR2', ImageHeight: '3456', ImageWidth: '5184', Orientation: '1', FileSize: '24 MiB', FileType: 'CR2', FileTypeExtension: 'cr2', MIMEType: 'image/x-canon-cr2', MajorBrand: null, Make: 'Canon', Model: 'Canon EOS Kiss X4', ExposureTime: '1/200', FNumber: '5.6', ISO: '100', FocalLength: '28.0 mm', SerialNumber: '2213309621', Rating: null, MegaPixels: null, DateTimeOriginal: '2012-02-17T11:26:39.000Z', created_at: '2021-01-17T00:38:46.658Z', updated_at: '2021-01-17T00:38:46.660Z' }, { id: 1207, ImageUniqueID: 'caf50becbb494208bc4017f43e1cdc58', FileName: 'RAW_CANON_EOS_1DX.CR2', ImageHeight: '3456', ImageWidth: '5184', Orientation: '1', FileSize: '25 MiB', FileType: 'CR2', FileTypeExtension: 'cr2', MIMEType: 'image/x-canon-cr2', MajorBrand: null, Make: 'Canon', Model: 'Canon EOS-1D X', ExposureTime: '1/80', FNumber: '5.6', ISO: '1600', FocalLength: '70.0 mm', SerialNumber: '062011000450', Rating: '0', MegaPixels: null, DateTimeOriginal: '2012-10-06T07:48:25.000Z', created_at: '2021-01-17T00:39:06.060Z', updated_at: '2021-01-17T00:39:06.062Z' }, { id: 1215, ImageUniqueID: '37715131d4b14b8c9a5a74f288c74de7', FileName: 'RAW_CANON_POWERSHOT_A3200IS_CHDK.DNG', ImageHeight: '3296', ImageWidth: '4416', Orientation: '1', FileSize: '21 MiB', FileType: 'DNG', FileTypeExtension: 'dng', MIMEType: 'image/x-adobe-dng', MajorBrand: null, Make: 'Canon', Model: 'Canon PowerShot A3200 IS', ExposureTime: '1/182', FNumber: '5.5', ISO: '80', FocalLength: '14.5 mm', SerialNumber: null, Rating: null, MegaPixels: null, DateTimeOriginal: '2012-08-11T13:29:29.000Z', created_at: '2021-01-17T00:39:11.147Z', updated_at: '2021-01-17T00:39:11.157Z' }, { id: 1216, ImageUniqueID: '7cc62d58dc3c4abcb20894d4207ef989', FileName: 'IMG_8329.DNG', ImageHeight: '2480', ImageWidth: '3336', Orientation: '1', FileSize: '9.9 MiB', FileType: 'DNG', FileTypeExtension: 'dng', MIMEType: 'image/x-adobe-dng', MajorBrand: null, Make: 'Canon', Model: 'Canon PowerShot A720 IS', ExposureTime: '1/645', FNumber: '4.7', ISO: '80', FocalLength: '5.8 mm', SerialNumber: null, Rating: null, MegaPixels: null, DateTimeOriginal: '2012-08-29T17:40:43.000Z', created_at: '2021-01-17T00:39:12.049Z', updated_at: '2021-01-17T00:39:12.051Z' }, { id: 1276, ImageUniqueID: '93f5b01e5c40409285fc6b7255c3e208', FileName: 'DSCF0686.RAF', ImageHeight: '1536', ImageWidth: '2048', Orientation: '1', FileSize: '24 MiB', FileType: 'RAF', FileTypeExtension: 'raf', MIMEType: 'image/x-fujifilm-raf', MajorBrand: null, Make: 'FUJIFILM', Model: 'FinePix F770EXR', ExposureTime: '1/900', FNumber: '3.5', ISO: '100', FocalLength: '4.6 mm', SerialNumber: null, Rating: '0', MegaPixels: null, DateTimeOriginal: '2012-05-08T09:05:36.000Z', created_at: '2021-01-17T00:39:42.789Z', updated_at: '2021-01-17T00:39:42.791Z' }, { id: 1296, ImageUniqueID: '97eefa8efe064c68a3b03fe336714d8b', FileName: 'DSCF0514.RAF', ImageHeight: '1536', ImageWidth: '2048', Orientation: '1', FileSize: '19 MiB', FileType: 'RAF', FileTypeExtension: 'raf', MIMEType: 'image/x-fujifilm-raf', MajorBrand: null, Make: 'FUJIFILM', Model: 'X10', ExposureTime: '1/240', FNumber: '5', ISO: '200', FocalLength: '8.6 mm', SerialNumber: null, Rating: '0', MegaPixels: null, DateTimeOriginal: '2012-07-13T13:18:56.000Z', created_at: '2021-01-17T00:39:52.904Z', updated_at: '2021-01-17T00:39:52.906Z' }, { id: 1354, ImageUniqueID: 'bf75ea68285e4df3b1a36f38033f0513', FileName: 'DSCF4005.RAF', ImageHeight: '1536', ImageWidth: '2048', Orientation: '1', FileSize: '19 MiB', FileType: 'RAF', FileTypeExtension: 'raf', MIMEType: 'image/x-fujifilm-raf', MajorBrand: null, Make: 'FUJIFILM', Model: 'XF1', ExposureTime: '1/30', FNumber: '1.8', ISO: '1250', FocalLength: '6.4 mm', SerialNumber: null, Rating: '0', MegaPixels: null, DateTimeOriginal: '2012-07-06T01:08:57.000Z', created_at: '2021-01-17T00:40:48.545Z', updated_at: '2021-01-17T00:40:48.547Z' }];
  //#endregion
  @ViewChild('carousel') carousel: ElementRef<HTMLElement>;
  @ViewChildren('cellContainer', { emitDistinctChangesOnly: true }) cells: QueryList<ElementRef<HTMLElement>>;
  height$ = this.resize$.pipe(map(entry => entry.contentRect.height));
  width$ = this.resize$.pipe(map(entry => entry.contentRect.width));

  cellCount: number;
  cellHeight: number;
  cellWidth: number;
  isHorizontal = true;
  radius: number;
  rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
  selectedIndex = 0;
  theta: number;

  constructor(
    private readonly resize$: NgResizeObserver,
  ) {}

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
}
