import {Component, OnInit} from '@angular/core';
import {StepperModule} from "primeng/stepper";
import {Button, ButtonDirective} from "primeng/button";
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {InputIconModule} from "primeng/inputicon";
import {IconFieldModule} from "primeng/iconfield";
import {ToggleButtonModule} from "primeng/togglebutton";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";
import {DropdownModule} from "primeng/dropdown";
import {SchoolType} from "../../../core/models/school-type";
import {Role, RoleName} from "../../../core/models/role";
import {User} from "../../../core/models/user";
import {SchoolYear} from "../../../core/models/school-year";
import {Subject} from "../../../core/models/subject"
import {TeacherService} from "../../../core/service/teacher.service";
import {SubjectService} from "../../../core/service/subject.service";
import {BrowserStorageService} from "../../../core/service/browser-storage.service";
import {Router} from "@angular/router";
import {SchoolService} from "../../../core/service/school.service";
import {AuthService} from "../../../core/service/auth.service";
import {StudentService} from "../../../core/service/student.service";
import {MultiSelectModule} from "primeng/multiselect";
import {InputSwitchModule} from "primeng/inputswitch";
import {SchoolYearService} from "../../../core/service/school-year.service";
import {SessionBookLandingService} from "../../../core/service/session-book-landing.service";
import {SessionDto} from "../../../core/models/session";
import {NotificationService} from "../../../core/service/notification.service";
import {SessionService} from "../../../core/service/session.service";
import {EMPTY, switchMap} from "rxjs";


@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [
    StepperModule,
    Button,
    NgClass,
    FormsModule,
    PasswordModule,
    InputIconModule,
    IconFieldModule,
    ToggleButtonModule,
    InputTextModule,
    ToastModule,
    StepsModule,
    ButtonDirective,
    DropdownModule,
    MultiSelectModule,
    ReactiveFormsModule,
    InputSwitchModule
  ],
  templateUrl: './complete-profile.component.html',
  styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  user!: User | null;
  roles: { label: string, value: Role }[] = [
    {label: 'Student', value: {id: 2, name: RoleName.STUDENT}},
    {label: 'Teacher', value: {id: 3, name: RoleName.TEACHER}}
  ];
  schoolYear!: SchoolYear
  schoolType!: SchoolYear
  schoolTypes!: { label: string, value: SchoolType }[];
  schoolYears!: { label: string, value: SchoolYear }[];
  subjects!: { label: string, value: Subject }[];
  sessionDto: SessionDto | null = null;
  protected readonly RoleName = RoleName;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private browserStorage: BrowserStorageService,
    private sessionBookingLanding: SessionBookLandingService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private schoolTypeService: SchoolService,
    private schoolYearService: SchoolYearService,
    private notificationService: NotificationService,
    private sessionService: SessionService
  ) {
    this.user = this.authService.getUser();
    this.loadSessionData();
  }

  get selectedRole() {
    return this.profileForm.get("role")?.value["name"];
  }


  private get selectedRoleField() {
    return this.profileForm.get("role")
  }

  ngOnInit(): void {
    this.initForm()
    this.loadUserData()
    this.loadProfileData()
  }

  isFieldInvalid(field: string): boolean {
    const control = this.profileForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  initForm(): void {

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      role: [{value: ''}, Validators.required]
    });
  }

  loadUserData(): void {
    const user = this.authService.getUser();
    if (user === null) return;
    this.user = user;
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      role: ""
    });

  }

  addTeacherFields(): void {
    this.profileForm.addControl('subjects', this.fb.control<{ label: string, value: Subject }[]>([], Validators.required));
    this.removeControlIfExists('schoolYear');
    this.removeControlIfExists('schoolType');
  }

  addStudentFields(): void {
    this.profileForm.addControl('schoolYear', this.fb.control('', Validators.required));
    this.profileForm.addControl('schoolType', this.fb.control('', Validators.required));
    this.removeControlIfExists('subjects');

  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
    if (!this.user) return;
    const commonData = {

      ...this.user,
      firstName: this.profileForm.value["firstName"],
      lastName: this.profileForm.value["lastName"],
      roles: [this.selectedRoleField?.value],
      isCompleted: true,
    };
    if (this.selectedRole === RoleName.STUDENT) {
      if (this.sessionDto) {
        this.studentService.save({
          ...commonData,
          schoolYear: this.schoolYear,
          schoolType: this.schoolType,
        }).pipe(
          switchMap((user) => {
            this.onSaveSuccess(user);
            if (this.sessionDto) {
              return this.sessionService.save(this.sessionDto)
            } else {
              return EMPTY;
            }
          })
        ).subscribe(() => {
          this.notificationService.showSuccess("You have successfully booked a session")
          this.router.navigate(["/session-settings"]).then()
        });
      } else {
        this.studentService.save({
          ...commonData,
          schoolYear: this.profileForm.get("schoolYear")?.value,
          schoolType: this.profileForm.get("schoolType")?.value,
        }).subscribe(() => {
          this.router.navigate(["/profile/details"]).then()
        });
      }
    }


    if (this.selectedRole === RoleName.TEACHER) {
      console.log(this.profileForm.value["subjects"])
      this.teacherService.save({
        ...commonData,
        subjects: this.profileForm.value["subjects"],
        payRate: 0,
      }).subscribe((user) => {
        this.onSaveSuccess(user)
        this.router.navigate(["/profile/details"]).then()
      });
    }
  }

  private removeControlIfExists(controlName: string): void {
    if (this.profileForm.contains(controlName)) {
      this.profileForm.removeControl(controlName);
    }
  }

  private onSaveSuccess(user: User): void {
    this.browserStorage.setItem('user', JSON.stringify(user));
    this.browserStorage.setItem('roles', JSON.stringify(user.roles.map(role => role.name)));
  }

  private loadProfileData() {
    if (!this.sessionDto) {
      this.selectedRoleField?.valueChanges.subscribe(role => this.loadRoleBasedData(role))
    } else {
      this.lodProfileDataFromSession()
    }
  }

  private lodProfileDataFromSession() {
    const schoolYear = this.schoolYear;
    const schoolType = this.schoolType;

    this.schoolYears = [{label: schoolYear.name, value: schoolYear}];
    this.schoolTypes = [{label: schoolType.name, value: schoolType}];
    const studentRole = {id: 2, name: RoleName.STUDENT};

    this.profileForm.addControl('schoolYear', this.fb.control({value: schoolYear, disabled: true}, Validators.required));
    this.profileForm.addControl('schoolType', this.fb.control({value: schoolType, disabled: true}, Validators.required));
    this.selectedRoleField?.patchValue(studentRole)
    this.selectedRoleField?.disable()
  }

  private loadRoleBasedData(role: Role) {
    if (role?.name == RoleName.STUDENT) {
      this.addStudentFields()
      this.loadStudentData()
    }
    if (role?.name == RoleName.TEACHER) {
      this.addTeacherFields()
      this.loadTeacherData()
    }
  }

  private loadSessionData(): void {
    this.sessionBookingLanding.currentMessage.subscribe(session => {
      if (session) {
        const {schoolYear, schoolType, ...sessionInfo} = session;
        this.sessionDto = sessionInfo
        this.schoolYear = schoolYear
        this.schoolType = schoolType
      }

    });
  }

  private loadTeacherData(): void {
    this.subjectService.getALL().subscribe(subjects => {
        this.subjects = subjects.map((subject) => ({
          label: subject.name,
          value: subject,
        }));
      }
    )
  }

  private loadStudentData(): void {
    this.schoolTypeService.getALL().subscribe((schoolTypes) => {
      this.schoolTypes = schoolTypes.map((type) => ({
        label: type.name,
        value: type,
      }));
    })

    this.schoolYearService.getALL().subscribe((schoolYears) => {
      this.schoolYears = schoolYears.map((year) => ({
        label: year.name,
        value: year,
      }));
    });
  }
}
