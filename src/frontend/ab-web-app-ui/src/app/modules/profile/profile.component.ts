import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isEditing = false;
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    city: 'Los Angeles',
    state: { name: 'California', code: 'CA' },
    zip: '90001'
  };

  states = [
    { name: 'Arizona', code: 'AZ' },
    { name: 'California', code: 'CA' },
    { name: 'Florida', code: 'FL' },
    { name: 'Ohio', code: 'OH' },
    { name: 'Washington', code: 'WA' }
  ];

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
