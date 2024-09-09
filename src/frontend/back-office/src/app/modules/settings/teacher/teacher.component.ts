import { Component } from '@angular/core';
import {Subject} from "../../../core/models/subject";
import {PageLink} from "../../../core/models/page-link";
import {TableColumn} from "../../../core/models/table-cloumn";
import {Teacher} from "../../../core/models/teacher";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {TeacherService} from "../../../core/service/teacher.service";
import {TableComponent} from "../../../shared/components/table/table.component";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {UserService} from "../../../core/service/user.service";
import {NotificationService} from "../../../core/service/notification.service";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    TableComponent,
    ButtonDirective,
    Ripple,
    InputSwitchModule,
    FormsModule
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent {
  data: Teacher[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  columns: TableColumn[] = [
    {field: 'firstName', header: 'Name', type: 'text', sortable: true, filterable: true},
    {field: 'lastName', header: 'Last name', type: 'text', sortable: true, filterable: true},
    {field: 'email', header: 'Email', type: 'text', sortable: true, filterable: true},
    {field: 'isConfirmedByAdmin', header: 'Status', type: 'text', sortable: true, filterable: true},
  ];
  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  constructor(private notificationService:NotificationService,private userService:UserService,private teacherService:TeacherService) {
  }
  loadTeachers(): void {
    this.teacherService.findAll(this.pageLink).subscribe(pageData => {
      this.data = pageData.data;
      this.totalRecords = pageData.totalElements;
    });
  }
  onLazyLoad(event: any): void {
    this.pageLink.page = event.first! / event.rows!;
    this.pageLink.pageSize = event.rows!;
    if (event.sortField) {
      this.pageLink.sortProperty = event.sortField;
      this.pageLink.sortOrder = event.sortOrder === 1 ? SortOrder.ASC : SortOrder.DESC;
    }
    if (event.filters) {
      this.pageLink.filters = event.filters;
    }

    if (event.globalFilter) {
      this.pageLink.globalFilter = {keys: ['name', 'description'], value: event.globalFilter};
    }
    this.loadTeachers();
  }
  onGlobalFilter(value: string) {
    this.pageLink.globalFilter = {keys: ['name', 'description'], value};
    this.loadTeachers();
  }
  confirmTeacher(teacher:Teacher){
    console.log(teacher.confirmedByAdmin)
    if(!teacher.confirmedByAdmin){
      this.userService.confirmTeacher(teacher).subscribe(teacher=>{
        this.notificationService.showSuccess("Teacher confirmed Successfully !")
      })
    }else{
      this.notificationService.showInfo(teacher.firstName +" is already confirmed !")
    }
  }
}
