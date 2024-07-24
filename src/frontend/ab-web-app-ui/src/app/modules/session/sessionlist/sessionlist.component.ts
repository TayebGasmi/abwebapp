import { Component } from '@angular/core';
import {SessionDto} from "../../../core/models/session";
import { DatePipe } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {ButtonModule} from "primeng/button";
import {SliderModule} from "primeng/slider";
import {InputTextModule} from "primeng/inputtext";
import {ToggleButtonModule} from "primeng/togglebutton";
import {RippleModule} from "primeng/ripple";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";
import {PaginationRequest} from "../../../core/models/pagination-request.model";
import {SessionService} from "../../../core/service/session.service";
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-sessionlist',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule
],
  templateUrl: './sessionlist.component.html',
  styleUrl: './sessionlist.component.scss'
})
export class SessionlistComponent {
  sessions: SessionDto[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  sortProperty: string = 'title';
  sortOrder: number = 1; // 1 for ascending, -1 for descending
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  filters: any = {};
  globalFilter: any = {};

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.loadSessions({ first: 0, rows: this.pageSize });
  }

  loadSessions(event: LazyLoadEvent): void {
    const first = event.first ?? 0; // Default to 0 if undefined
    const rows = event.rows ?? this.pageSize; // Default to pageSize if undefined

    const paginationRequest: PaginationRequest = {
      page: Math.floor(first / rows),
      pageSize: this.pageSize,
      sortProperty: this.sortProperty,
      sortOrder: this.sortOrder === 1 ? 'ASC' : 'DESC',
      timeZone: this.timeZone,
    };
    this.sessionService.getSessions(paginationRequest)
      .subscribe(response => {
        this.sessions = response.data;
        this.totalItems = response.totalElements;
      });
  }

  onSortChange(event: any): void {
    this.sortProperty = event.sortField;
    this.sortOrder = event.sortOrder;
    this.loadSessions({ first: 0, rows: this.pageSize });
  }

  onPageChange(event: TableLazyLoadEvent): void {
    this.loadSessions(<LazyLoadEvent>event);
  }
}
