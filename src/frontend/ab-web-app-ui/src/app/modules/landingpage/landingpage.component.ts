import {Component, OnInit} from '@angular/core';
import {TagModule} from "primeng/tag";
import {CurrencyPipe, NgClass} from "@angular/common";
import {TableModule} from "primeng/table";
import {InputNumberModule} from "primeng/inputnumber";
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
import {TeacherService} from "../../core/service/teacher.service";
import {SubjectService} from "../../core/service/subject.service";
import {Subject} from "../../core/models/subject";
import {Teacher} from "../../core/models/teacher";
import {SessionBookLandingService} from "../../core/service/session-book-landing.service";
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {distinctUntilChanged, map, of, switchMap} from "rxjs";
import {MenuItem} from "primeng/api";
import {StepsModule} from "primeng/steps";
import {NotificationService} from "../../core/service/notification.service";
import {filter} from "rxjs/operators";
import {SchoolService} from "../../core/service/school.service";
import {SchoolYear} from "../../core/models/school-year";
import {SchoolYearService} from "../../core/service/school-year.service";
import {SchoolType} from "../../core/models/school-type";
import {DialogModule} from "primeng/dialog";

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
    NgClass,
    GoogleSigninButtonModule,
    StepsModule,
    DialogModule
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {
  sessionForm!: FormGroup;
  subjects: { label: string, value: Subject }[] = [];
  teachers: { label: string, value: Teacher }[] = [];
  schoolYears: { label: string, value: SchoolYear }[] = [];
  schoolTypes: { label: string, value: SchoolType }[] = [];
  sessionSteps: MenuItem[] = [];
  activeStep = 0;
  popupVisible:boolean=false;
  constructor(private notificationService:NotificationService,private sessionBook: SessionBookLandingService, private fb: FormBuilder,
              private socialAuthService: SocialAuthService,
              private teacherService: TeacherService,
              private authService: AuthService,
              private schooltypeService:SchoolService,
              private schoolyearService:SchoolYearService,
              private subjectService: SubjectService, public router: Router) {
  }
  private initializeSteps() {
    this.sessionSteps = [
      {label:'School info' },
      {label: 'Session Info'},
      {label: 'Choose Teacher'}
    ];
  }
  prevStep() {
    this.activeStep--;
  }
  nextStep() {
    if (this.activeStep === 0 && this.isFirstStepInvalid()) {
      return;
    }
    if (this.activeStep === 1 && this.isSecondStepInvalid()) {
      return;
    }
    this.activeStep++;
    this.loadSubjects()
  }
  private isSecondStepInvalid(): boolean {
    if (this.sessionForm.get('subject')?.invalid) {
      this.notificationService.showError("Please choose a subject.");
      return true;
    }
    if (this.sessionForm.get('startDateTime')?.invalid) {
      this.notificationService.showError("Please select a start time.");
      return true;
    }
    return false;
  }
  private isFirstStepInvalid(): boolean {
    if (this.sessionForm.get('schoolYear')?.invalid) {
      this.notificationService.showError("Please choose a School Year.");
      return true;
    }
    if (this.sessionForm.get('schoolType')?.invalid) {
      this.notificationService.showError("Please select a School type.");
      return true;
    }
    return false;
  }
  isLastStep(): boolean {
    return this.activeStep === this.sessionSteps.length - 1;
  }
  get sessionSubject() {
    return this.sessionForm.get("subject")
  }
  get sessionStartDateTime() {
    return this.sessionForm.get("startDateTime")
  }
  get sessionSchoolYear() {
    return this.sessionForm.get("schoolYear")
  }
  get sessionSchoolType() {
    return this.sessionForm.get("schoolType")
  }
  private initializeForm() {
    this.sessionForm = this.fb.group({
      startDateTime: ['', Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required],
      schoolYear:[null,Validators.required],
      schoolType:[null,Validators.required]
    });
  }


  ngOnInit(): void {
    this.socialAuthService.authState.pipe(
      map((user) => ({
          oauthProvider: user.provider,
          idToken: user.idToken,
        })
      ),
      switchMap(user => this.authService.socialLogin(user))
    ).subscribe({
      next: response => {
        this.authService.addToken(response.accessToken);
        this.authService.addUser(response.user);
        this.router.navigate(['/profile/details']);
        this.authService.addRoles(response.roles);
      }
    });
    this.initializeForm();
    this.loadSchoolyear();
    this.loadSchooTypes();
    this.loadTeachers();
    this.initializeSteps();
  }
  public resetEvent(){
    this.popupVisible=false
  }

  private loadTeachers() {
    this.sessionForm.get('subject')?.valueChanges
      .pipe(
        filter(subject => !!subject),
        map(subject => subject.name),
        distinctUntilChanged(),
        switchMap(subjectName => subjectName ? this.teacherService.getTeachersBySubjectName(subjectName) : of([]))
      )
      .subscribe(teachers => {
        this.teachers = teachers.map(teacher => ({
          label: `${teacher.firstName} ${teacher.lastName}`,
          value: teacher
        }));
      });
  }
  private loadSchoolyear(){
    this.schoolyearService.getALL().subscribe(schoolYears =>{
      this.schoolYears=schoolYears.map(schoolYear=>({
        label:schoolYear.name,
        value:schoolYear
      }));
    });
  }
  private loadSchooTypes(){
    this.schooltypeService.getALL().subscribe(schoolTypes =>{
      this.schoolTypes=schoolTypes.map(schoolType=>({
        label:schoolType.name,
        value:schoolType
      }));
    });
  }

  private loadSubjects() {
    const selectedSchoolYear = this.sessionForm.get('schoolYear')?.value;
    const selectedSchoolType = this.sessionForm.get('schoolType')?.value;
    this.subjectService.getALL().subscribe(subjects => {
      this.subjects = subjects.filter(subject =>
        subject.schoolYears?.some(schoolYear => schoolYear.id === selectedSchoolYear.id ) &&
        subject.schoolTypes?.some(schoolType => schoolType.id === selectedSchoolType.id)
      ).map(subject => ({
        label: subject.name,
        value: subject
      }))
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
    this.sessionBook.changeMessage(this.sessionForm.value, false)
    this.popupVisible=true;

  }
}
