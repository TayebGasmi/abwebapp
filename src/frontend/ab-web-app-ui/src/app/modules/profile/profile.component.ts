import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';
import {InputSwitchModule} from "primeng/inputswitch";
import {User} from "../../core/models/user";
import {SchoolType} from "../../core/models/school-type";
import {SchoolYear} from "../../core/models/school-year";
import {BrowserStorageService} from "../../core/service/browser-storage.service";
import {StudentService} from "../../core/service/student.service";
import {AuthService} from "../../core/service/auth.service";
import {SchoolService} from "../../core/service/school.service";
import {Role} from "../../core/models/role";
import {SchoolYearService} from "../../core/service/school-year.service";
import {NgClass} from "@angular/common";
import {StepperModule} from "primeng/stepper";
import {PasswordModule} from "primeng/password";
import {InputIconModule} from "primeng/inputicon";
import {IconFieldModule} from "primeng/iconfield";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";
import {MultiSelectModule} from "primeng/multiselect";
import {Subject} from "../../core/models/subject";
import {TeacherService} from "../../core/service/teacher.service";
import {SubjectService} from "../../core/service/subject.service";
import {RoleService} from "../../core/service/role.service";
import {Teacher} from "../../core/models/teacher";
import {Student} from "../../core/models/student";
import {NotificationService} from "../../core/service/notification.service";
import {SessionBookLandingService} from "../../core/service/session-book-landing.service";
import {SessionService} from "../../core/service/session.service";
import {SessionDto} from "../../core/models/session";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
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
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  isEditing = true;
  profileForm: FormGroup = new FormGroup({}, {updateOn: 'blur'});
  user!: null | User;
  switch: boolean = false;
  roles!: { name: string, value: Role }[];
  schoolTypes!: { name: string, value: SchoolType }[];
  schoolYears!: { name: string, value: SchoolYear }[];
  subjects!: { label: string, value: Subject }[];
  checked: boolean = true;
  selectedRole: any = null;
  teacher!: null | Teacher;
  student!: null | Student;
  sessionDto!: SessionDto;
  isComplete!: boolean;

  constructor(private sessionService: SessionService,
              private sessionLanding: SessionBookLandingService,
              private notificationService: NotificationService,
              private teacherService: TeacherService,
              private subjectService: SubjectService,
              private roleService: RoleService,
              private browserStorage: BrowserStorageService,
              private studentService: StudentService,
              private fb: FormBuilder,
              private authService: AuthService,
              private schoolTypeService: SchoolService,
              private schoolYearService: SchoolYearService) {
  }

  isFieldInvalid(field: string): undefined | false | true {
    const control = this.profileForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value)
      const schoolTypeControl = this.profileForm.get("schoolType");
      const schoolYearControl = this.profileForm.get("schoolYear");
      const subjectControl = this.profileForm.get("subject");
      if (subjectControl && this.user != null && this.selectedRole == "TEACHER") {
        this.user.firstName = this.profileForm.get("firstName")?.value;
        this.user.lastName = this.profileForm.get("lastName")?.value;
        console.log(this.user);
        this.subscriptions.push(
          this.teacherService.update({...this.user, subjects: this.selectedSubjects, payRate: 0})
          .subscribe(user => {
            this.notificationService.showSuccess("Teacher Updated successfully!");
            this.browserStorage.setItem("user", JSON.stringify(this.user));
            console.log("Teacher saved successfully", user);
          })
        );
      }
      if (schoolTypeControl && schoolYearControl && this.user != null && this.selectedRole == "STUDENT") {
        this.user.firstName = this.profileForm.get("firstName")?.value;
        this.user.lastName = this.profileForm.get("lastName")?.value;
        this.subscriptions.push(
          this.studentService.update({...this.user, schoolType: schoolTypeControl.value['value'], schoolYear: schoolYearControl.value['value']})
          .subscribe(user => {
            this.notificationService.showSuccess("Student Updated successfully!");
            this.browserStorage.setItem("user", JSON.stringify(this.user));
            console.log("Student saved successfully", user);
          })
        );
      }
    }
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      firstName: [{value: this.user?.firstName, disabled: !this.isEditing}, Validators.required],
      lastName: [{value: this.user?.lastName, disabled: !this.isEditing}, Validators.required],
      role: [{value: this.selectedRole, disabled: !this.isEditing}, Validators.required],
      email: [{value: this.user?.email, disabled: true}, Validators.required],
      schoolYear: [{value: '', disabled: !this.isEditing}, Validators.required],
      schoolType: [{value: '', disabled: !this.isEditing}, Validators.required],
      subject: [{
        value: '',
        disabled: !this.isEditing
      }, Validators.required]
    });
    console.log(this.teacher);
  }

  selectedSubjects: undefined | Array<Subject>;

  ngOnInit(): void {
    this.subscriptions.push(
      this.sessionLanding.completed.subscribe(complete => this.isComplete = complete)
    );

    if (this.isComplete) {
      this.subscriptions.push(
        this.sessionLanding.currentMessage.subscribe(session => this.sessionDto = session)
      );
      this.subscriptions.push(
        this.sessionService.save(this.sessionDto).subscribe(() => {
          this.notificationService.showSuccess("You have successfully booked a session");
        })
      );
      this.sessionLanding.changeMessage("", false);
    }

    this.subscriptions.push(
      this.schoolTypeService.getALL().subscribe(schoolTypes => {
        this.schoolTypes = schoolTypes.map(schoolType => ({name: schoolType.name, value: schoolType}));
      })
    );

    this.subscriptions.push(
      this.schoolYearService.getALL().subscribe(schoolYears => {
        this.schoolYears = schoolYears.map(schoolYear => ({name: schoolYear.name, value: schoolYear}));
      })
    );

    this.subscriptions.push(
      this.roleService.getALL().subscribe(roles => {
        roles = roles.filter(role => role.id !== 1);
        this.roles = roles.map(role => ({name: role.name, value: role}));
      })
    );

    this.subscriptions.push(
      this.subjectService.getALL().subscribe(subjects => {
        this.subjects = subjects.map(subject => ({label: subject.name, value: subject}));
      })
    );

    this.user = this.authService.getUser();
    this.selectedRole = JSON.parse(<string>this.browserStorage?.getItem('roles'))[0];
    this.initForm();

    const schoolYearControl = this.profileForm.get('schoolYear');
    const schoolTypeControl = this.profileForm.get('schoolType');
    const subjectControl = this.profileForm.get('subject');

    if (this.selectedRole == "TEACHER") {
      this.subscriptions.push(
        this.teacherService.findById(<number>this.user?.id).subscribe(teacher => {
          this.teacher = teacher;
          this.selectedSubjects = this.teacher?.subjects;
          this.profileForm.patchValue({subject: this.selectedSubjects});
          schoolYearControl?.disable();
          schoolTypeControl?.disable();
          subjectControl?.enable();
        })
      );
    }

    if (this.selectedRole == "STUDENT") {
      this.subscriptions.push(
        this.studentService.findById(<number>this.user?.id).subscribe(student => {
          this.student = student;
          this.profileForm.patchValue({schoolYear: student.schoolYear, schoolType: student.schoolType});
          schoolYearControl?.enable();
          schoolTypeControl?.enable();
          subjectControl?.disable();
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
