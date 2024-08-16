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
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {User} from "../../../core/models/user";
import {Role, RoleName} from "../../../core/models/role";
import {SchoolType} from "../../../core/models/school-type";
import {SchoolYear} from "../../../core/models/school-year";
import {TeacherService} from "../../../core/service/teacher.service";
import {SubjectService} from "../../../core/service/subject.service";
import {Subject} from "../../../core/models/subject";
import {InputSwitchChangeEvent} from "primeng/inputswitch";
import {BrowserStorageService} from '../../../core/service/browser-storage.service';
import {Router} from "@angular/router";
import {StudentService} from "../../../core/service/student.service";
import {UserService} from "../../../core/service/user.service";
import {AuthService} from "../../../core/service/auth.service";
import {SchoolService} from "../../../core/service/school.service";
import {RoleService} from "../../../core/service/role.service";
import {SchoolYearService} from "../../../core/service/school-year.service";
import {MultiSelectModule} from "primeng/multiselect";


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
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  templateUrl: './complete-profile.component.html',
  styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent implements OnInit {
  isEditing = true;
  profileForm: FormGroup = new FormGroup({}, {updateOn: 'blur'});
  user!: null | User;
  switch: boolean = false;
  roles!: { name: string, value: Role }[];
  schoolTypes!: { name: string, value: SchoolType }[];
  schoolYears!: { name: string, value: SchoolYear }[];
  subjects!: { label: string, value: Subject }[];
  checked: boolean = true;
  selectedRole: number | null = null;

  constructor(private teacherService: TeacherService, private subjectService: SubjectService, private roleService: RoleService, private browserStorage: BrowserStorageService, private router: Router, private studentService: StudentService, private fb: FormBuilder, private userService: UserService, private authService: AuthService, private schoolTypeService: SchoolService, private SchoolYearService: SchoolYearService) {
    this.schoolTypeService.getALL().subscribe(schoolTypes => {
        this.schoolTypes = schoolTypes.map(schoolType => ({name: schoolType.name, value: schoolType}));
      }
    );
    this.SchoolYearService.getALL().subscribe(schoolYears => {
        this.schoolYears = schoolYears.map(schoolYear => ({name: schoolYear.name, value: schoolYear}));
      }
    );
    this.roleService.getALL().subscribe(roles => {
        roles = roles.filter(role => role.id !== 1)
        this.roles = roles.map(role => ({name: role.name, value: role}));
      }
    );
    this.subjectService.getALL().subscribe(subjects => {
      this.subjects = subjects.map(subject => ({label: subject.name, value: subject}))
    });

    this.user = authService.getUser();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      firstName: [{value: this.user?.firstName, disabled: !this.isEditing}, Validators.required],
      lastName: [{value: this.user?.lastName, disabled: !this.isEditing}, Validators.required],
      role: [{value: ''}, Validators.required],
      email: [{value: this.user?.email, disabled: true}, Validators.required],
      schoolYear: [{value: '', disabled: !this.isEditing}, Validators.required],
      schoolType: [{value: '', disabled: !this.isEditing}, Validators.required],
      subject: [{value: '', disabled: !this.isEditing}, Validators.required]
    });
  }

  isFieldInvalid(field: string): undefined | false | true {
    const control = this.profileForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  handleChange(e: InputSwitchChangeEvent) {
    console.log(this.checked)
    if (e.checked) {
      this.user?.roles.push({id: 3, name: RoleName.TEACHER})
      console.log(this.user)
      if (this.user != null) {
        this.userService.update(this.user).subscribe(user => {
          this.authService.addUser(user)
        })
      }
      this.switch = true;
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value)
      const schoolTypeControl = this.profileForm.get("schoolType");
      const schoolYearControl = this.profileForm.get("schoolYear");
      const subjectControl = this.profileForm.get("subject");
      const roleControl = this.profileForm.get("role");
      if (subjectControl && this.user != null && this.selectedRole == 3) {
        this.user.isCompleted = true;

        this.user.roles = [roleControl?.value['value']]
        console.log(subjectControl.value)
        this.userService.deleteById(this.user.id).subscribe(response => {
          this.browserStorage.setItem('user', JSON.stringify(this.user))
        })
        this.user.id = 0;
        this.teacherService.save({...this.user as User, subjects: subjectControl.value, payRate: 0}).subscribe(user => {
          this.browserStorage.setItem('user', JSON.stringify(user))
          this.browserStorage.setItem('roles', JSON.stringify(user.roles.map(role => role.name)))
          this.router.navigate(['/']);
          console.log("Student saved successfully", user);
        });
      }
      if (schoolTypeControl && schoolYearControl && this.user != null && this.selectedRole == 2) {
        this.user.isCompleted = true;
        this.user.roles = [roleControl?.value['value']]
        this.userService.deleteById(this.user.id).subscribe(response => {
          this.browserStorage.setItem('user', JSON.stringify(this.user))
        })
        this.studentService.save({
          ...this.user as User,
          schoolType: schoolTypeControl.value['value'],
          schoolYear: schoolYearControl.value['value']
        }).subscribe(user => {
          this.browserStorage.setItem('user', JSON.stringify(user))
          this.browserStorage.setItem('roles', JSON.stringify(user.roles.map(role => role.name)))
          this.router.navigate(['/']);
          console.log("Student saved successfully", user);
        });
      }
    }
  }


  onChange(event: DropdownChangeEvent) {
    this.selectedRole = event.value['value']['id'];
    const schoolYearControl = this.profileForm.get('schoolYear');
    const schoolTypeControl = this.profileForm.get('schoolType');
    const subjectControl = this.profileForm.get('subject');
    if (this.selectedRole == 3) {
      schoolYearControl?.disable();
      schoolTypeControl?.disable();
      subjectControl?.enable();
    } else {
      schoolYearControl?.enable();
      schoolTypeControl?.enable();
      subjectControl?.disable();
    }
  }
}
