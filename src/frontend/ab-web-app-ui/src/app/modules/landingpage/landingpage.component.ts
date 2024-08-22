import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LayoutService} from "../../layout/service/app.layout.service";
import {TagModule} from "primeng/tag";
import {CurrencyPipe, NgClass} from "@angular/common";
import {TableModule} from "primeng/table";
import {InputNumberModule} from "primeng/inputnumber";
import {User} from "../../core/models/user";
import {AuthService} from "../../core/service/auth.service";
import {AppConfigComponent} from "../../layout/config/app.config.component";
import {Router} from "@angular/router";
import {StyleClassModule} from "primeng/styleclass";
import {AnimateenterDirective} from "../../shared/directives/animateenter.directive";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SessionService} from "../../core/service/session.service";
import {TeacherService} from "../../core/service/teacher.service";
import {SubjectService} from "../../core/service/subject.service";
import {Subject} from "../../core/models/subject";
import {Teacher} from "../../core/models/teacher";
import {EventInput} from "@fullcalendar/core";
import {SessionBookLandingService} from "../../core/service/session-book-landing.service";
interface MonthlyPayment {
  name?: string;
  amount?: number;
  paid?: boolean;
  date?: string;
}

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [
    TagModule,
    CurrencyPipe,
    TableModule,
    InputNumberModule,
    AppConfigComponent,
    StyleClassModule,
    AnimateenterDirective,
    ButtonDirective,
    Ripple,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent  implements OnDestroy ,OnInit{
  subscription: Subscription;
  sessionForm!: FormGroup;
  subjects: { label: string, value: Subject }[] = [];
  teachers: { label: string, value: Teacher }[] = [];
  darkMode: boolean = false;
  events: EventInput[] = [];
  constructor(private sessionBook:SessionBookLandingService,private fb: FormBuilder, private sessionService: SessionService,
              private teacherService: TeacherService,
              private subjectService: SubjectService,public router: Router, private layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$.subscribe(config => {
      this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
    });
  }
  private initializeForm() {
    this.sessionForm = this.fb.group({
      startDateTime: ['', Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadTeachers();
    this.loadSubjects();
  }


  private loadTeachers() {
    this.teacherService.getALL().subscribe(result => {
      this.teachers = result.map(u => ({
        label: `${u.firstName} ${u.lastName}`,
        value: u
      }));
    });
  }

  private loadSubjects() {
    this.subjectService.getALL().subscribe(result => {
      this.subjects = result.map(u => ({
        label: u.name,
        value: u
      }));
    });
  }
  fieldHasError(fieldName: string): boolean {
    const control = this.sessionForm.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }
  handleSave() {
    if (this.sessionForm.invalid) {
      return;
    }
    this.sessionBook.changeMessage(this.sessionForm.value,false)
    this.router.navigate(['/auth/login'])
  }
}
