import { Component, OnInit, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filmstrip',
  templateUrl: './filmstrip.component.html',
  styleUrls: ['./filmstrip.component.scss']
})
export class FilmstripComponent implements OnInit {
  form: FormArray | FormGroup;

  images = [
    { id: 1, url: 'https://images.pexels.com/photos/758733/pexels-photo-758733.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
    { id: 2, url: 'https://images.pexels.com/photos/21261/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb' },
    { id: 3, url: 'https://images.pexels.com/photos/567973/pexels-photo-567973.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
    { id: 4, url: 'https://images.pexels.com/photos/776653/pexels-photo-776653.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
    { id: 5, url: 'https://images.pexels.com/photos/131046/pexels-photo-131046.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
    { id: 6, url: 'https://images.pexels.com/photos/302515/pexels-photo-302515.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
    { id: 7, url: 'https://images.pexels.com/photos/301682/pexels-photo-301682.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
    { id: 8, url: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' },
  ];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    const controls = this.images.map(image => {
      const control = {};
      control[image.id] = new FormControl(false);
      return control;
    });
    this.form = this.fb.group([...controls]);
  }

  @HostListener('document:keyup', ['$event']) moveFocus(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (target.type !== 'checkbox') {
      return;
    }

    const dataIndex = parseInt((event.target as HTMLElement).dataset.index, 10);

    switch (event.key) {
      case 'ArrowLeft':
        console.info('left');
        (document.querySelector(`input[type="checkbox"][data-index="${dataIndex - 1}"]`) as HTMLInputElement).focus();
        break;

      case 'ArrowRight':
        console.info('right');
        (document.querySelector(`input[type="checkbox"][data-index="${dataIndex + 1}"]`) as HTMLInputElement).focus();
        break;

      case 'ArrowUp':
        console.info('up');
        break;

      case 'ArrowDown':
        console.info('down');
        break;

      default:
        break;
    }
  }

  getControls(group: FormGroup) {
    if (group instanceof FormArray) {
      return group.controls;
    }
    return Object.keys(group.controls);
  }
}
