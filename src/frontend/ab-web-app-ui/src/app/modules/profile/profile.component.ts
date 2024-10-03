import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {forkJoin, Subscription} from 'rxjs';
import {User} from '../../core/models/user';
import {SchoolType} from '../../core/models/school-type';
import {SchoolYear} from '../../core/models/school-year';
import {Subject} from '../../core/models/subject';
import {Teacher} from '../../core/models/teacher';
import {Student} from '../../core/models/student';
import {Role, RoleName} from '../../core/models/role';
import {AuthService} from '../../core/service/auth.service';
import {BrowserStorageService} from '../../core/service/browser-storage.service';
import {TeacherService} from '../../core/service/teacher.service';
import {StudentService} from '../../core/service/student.service';
import {NotificationService} from '../../core/service/notification.service';
import {RoleService} from '../../core/service/role.service';
import {SchoolService} from '../../core/service/school.service';
import {SchoolYearService} from '../../core/service/school-year.service';
import {SubjectService} from '../../core/service/subject.service';
import {MultiSelectModule} from 'primeng/multiselect';
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
import {FileService} from "../../core/service/file.service";
import {FileDto} from "../../core/models/file";
import {FileUploadModule} from "primeng/fileupload";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgClass,
    Button,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    ReactiveFormsModule,
    ButtonDirective,
    InputSwitchModule,
    FileUploadModule,
    PdfViewerModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  profileForm: FormGroup = new FormGroup({});
  user!: User;
  roles: { name: string, value: Role }[] = [];
  schoolTypes: { name: string, value: SchoolType }[] = [];
  schoolYears: { name: string, value: SchoolYear }[] = [];
  subjects: { label: string, value: Subject }[] = [];
  selectedRole!: RoleName;
  teacher!: Teacher;
  student!: Student;
  selectedFile: File | null = null;
  fileMetadata: FileDto | null = null;
  userFileCv:string="";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private browserStorage: BrowserStorageService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private notificationService: NotificationService,
    private roleService: RoleService,
    private schoolService: SchoolService,
    private schoolYearService: SchoolYearService,
    private subjectService: SubjectService,
    private fileService:FileService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
    this.loadStaticData();
  }

  initForm(): void {

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      role: [{value: '', disabled: true}, Validators.required]
    });
  }

  loadUserData(): void {
    const user = this.authService.getUser();
    if (user === null) return;

    this.user = user;
    this.selectedRole = JSON.parse(this.browserStorage.getItem('roles')!)[0];


    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      role: this.selectedRole,
    });


    if (this.selectedRole === RoleName.TEACHER) {
      this.addTeacherFields();
      this.loadTeacherData();
    } else if (this.selectedRole === RoleName.STUDENT) {
      this.addStudentFields();
      this.loadStudentData();
    }
  }

  addTeacherFields(): void {

    this.profileForm.addControl('subject', this.fb.control<{ label: string, value: Subject }[]>([], Validators.required));
  }

  addStudentFields(): void {

    this.profileForm.addControl('schoolYear', this.fb.control('', Validators.required));
    this.profileForm.addControl('schoolType', this.fb.control('', Validators.required));
  }

  loadTeacherData(): void {
    forkJoin({
      subjects: this.subjectService.getALL(),
      teacher: this.teacherService.findById(this.user?.id)
    }).subscribe(({subjects, teacher}) => {
      this.subjects = subjects.map((subject) => ({
        label: subject.name,
        value: subject,
      }));

      this.teacher = teacher;
      if (teacher.subjects) {
        const selectedSubjects = teacher.subjects.map((subject) => ({
          label: subject.name,
          value: subject,
        }));

        this.profileForm.patchValue({subject: selectedSubjects});

      }

    });
  }

  loadStudentData(): void {
    this.subscriptions.push(
      this.studentService.findById(this.user?.id).subscribe((student) => {
        this.student = student;
        this.profileForm.patchValue({
          schoolYear: student?.schoolYear,
          schoolType: student?.schoolType,
        });
      })
    );
  }


  loadStaticData(): void {
    this.subscriptions.push(
      this.roleService.getALL().subscribe((roles) => {
        this.roles = roles.map((role) => ({name: role.name, value: role}));
      })
    );
    this.subscriptions.push(
      this.schoolService.getALL().subscribe((schoolTypes) => {
        this.schoolTypes = schoolTypes.map((type) => ({
          name: type.name,
          value: type,
        }));
      })
    );
    this.subscriptions.push(
      this.schoolYearService.getALL().subscribe((schoolYears) => {
        this.schoolYears = schoolYears.map((year) => ({
          name: year.name,
          value: year,
        }));
      })
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.profileForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      if (this.selectedRole === RoleName.TEACHER) {
        this.updateTeacher(formValue);
      } else if (this.selectedRole === RoleName.STUDENT) {
        this.updateStudent(formValue);
      }
    }
  }

  updateTeacher(formValue: any): void {

    const updatedTeacher = {
      ...this.teacher,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      subjects: formValue.subject.map((s: { label:string, value: any; })=>s.value),
    };
    this.subscriptions.push(
      this.teacherService.update(updatedTeacher).subscribe(() => {
        this.notificationService.showSuccess('Teacher profile updated!');
      })
    );
  }

  updateStudent(formValue: any): void {
    const updatedStudent = {
      ...this.student,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      schoolYear: formValue.schoolYear,
      schoolType: formValue.schoolType,
    };
    this.subscriptions.push(
      this.studentService.update(updatedStudent).subscribe(() => {
        this.notificationService.showSuccess('Student profile updated!');
      })
    );
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileService.uploadFile(<number>this.user?.id, this.selectedFile).subscribe({
        next: (data: FileDto) => {
          this.fileMetadata = data;
        },
        error: (err) => {
          this.notificationService.showError('File upload failed')
        },
      });
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  protected readonly RoleName = RoleName;
}

