import { Component, OnInit } from '@angular/core';

import { MediaService } from './services/media.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  nodes = [
    {
      children: [
        {
          children: [
            {
              children: [],
              name: 'subchild',
              path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder/child2/subchild',
              size: 0,
              type: 'directory'
            }
          ],
          name: 'child2',
          path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder/child2',
          size: 0,
          type: 'directory'
        }
      ],
      name: 'folder',
      path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder',
      size: 0,
      type: 'directory'
    },
    {
      children: [
        {
          children: [
            {
              children: [],
              name: 'subchild',
              path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder1/child/subchild',
              size: 0,
              type: 'directory'
            }
          ],
          name: 'child',
          path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder1/child',
          size: 0,
          type: 'directory'
        }
      ],
      name: 'folder1',
      path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder1',
      size: 0,
      type: 'directory'
    },
    {
      children: [
        {
          children: [
            {
              children: [],
              name: 'subchild',
              path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder2/child/subchild',
              size: 0,
              type: 'directory'
            }
          ],
          name: 'child',
          path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder2/child',
          size: 0,
          type: 'directory'
        }
      ],
      name: 'folder2',
      path: '/Users/andy/Development/Sites/dam-site/dam-ui-angular/stubs/folders/folder2',
      size: 0,
      type: 'directory'
    }
  ];
  options = {};

  constructor(
    private readonly mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.mediaService.path$.subscribe(
      () => {
        this.mediaService.fetch().subscribe();
      },
    );
  }

  onEvent(event) {
    this.mediaService.setPath(encodeURI(event.node.data.path));
  }
}
