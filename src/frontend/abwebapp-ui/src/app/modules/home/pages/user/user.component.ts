import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  sampleData = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
  ];

  sampleHeaders = [
    { dataKey: 'id', label: 'ID' },
    { dataKey: 'name', label: 'Name' },
    { dataKey: 'description', label: 'Description' },
    // Add more headers as needed
  ];

  sampleCols = ['id', 'name', 'description'];
}
