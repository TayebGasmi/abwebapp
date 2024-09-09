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
import {SchoolType} from "../../../core/models/school-type";
import {Role} from "../../../core/models/role";
import {User} from "../../../core/models/user";
import {SchoolYear} from "../../../core/models/school-year";
import {Subject} from "../../../core/models/subject"
import {TeacherService} from "../../../core/service/teacher.service";
import {SubjectService} from "../../../core/service/subject.service";
import {RoleService} from "../../../core/service/role.service";
import {BrowserStorageService} from "../../../core/service/browser-storage.service";
import {Router} from "@angular/router";
import {SchoolService} from "../../../core/service/school.service";
import {AuthService} from "../../../core/service/auth.service";
import {StudentService} from "../../../core/service/student.service";
import {UserService} from "../../../core/service/user.service";
import {MultiSelectModule} from "primeng/multiselect";
import {InputSwitchModule} from "primeng/inputswitch";
import {SchoolYearService} from "../../../core/service/school-year.service";
import {SessionBookLandingService} from "../../../core/service/session-book-landing.service";
import {SessionDto} from "../../../core/models/session";


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
export class CompleteProfileComponent implements OnInit{
  isEditing = true;
  profileForm: FormGroup =new FormGroup({}, {updateOn: 'blur'});
  user!:null | User;
  switch:boolean=false;
  roles!:{name:string,value:Role}[];
  schoolTypes!: { name: string, value: SchoolType }[];
  schoolYears!: { name: string, value: SchoolYear }[];
  subjects!:{ label: string, value: Subject }[];
  checked: boolean = true;
  sessionDto!:SessionDto;
  selectedRole: number | null = null;
  constructor(private sessionBookingLanding:SessionBookLandingService,private teacherService:TeacherService,private subjectService:SubjectService,private roleService:RoleService,private browserStorage:BrowserStorageService,private router:Router,private studentService:StudentService,private fb: FormBuilder,private userService:UserService,private authService:AuthService ,private schoolTypeService: SchoolService, private SchoolYearService: SchoolYearService) {
    this.schoolTypeService.getALL().subscribe(schoolTypes => {
        this.schoolTypes = schoolTypes.map(schoolType => ({name: schoolType.name, value: schoolType}));
      }
    );
    this.SchoolYearService.getALL().subscribe(schoolYears => {
        this.schoolYears = schoolYears.map(schoolYear => ({name: schoolYear.name, value: schoolYear}));
      }
    );
    this.roleService.getALL().subscribe(roles => {
        roles=roles.filter(role=>role.id!==1)
        this.roles = roles.map(role => ({name: role.name, value: role}));
      }
    );
    this.subjectService.getALL().subscribe(subjects=>{
      this.subjects = subjects.map(subject=>({label:subject.name,value:subject}))
    });

    this.user=authService.getUser();
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      firstName: [{ value: this.user?.firstName, disabled: !this.isEditing }, Validators.required],
      lastName: [{ value: this.user?.lastName, disabled: !this.isEditing }, Validators.required],
      role:[{value:''},Validators.required],
      email: [{ value: this.user?.email, disabled: true }, Validators.required],
      schoolYear: [{ value: '', disabled: !this.isEditing }, Validators.required],
      schoolType: [{ value: '', disabled: !this.isEditing }, Validators.required],
      subject: [{ value: '', disabled: !this.isEditing }, Validators.required]
    });
    this.sessionBookingLanding.currentMessage.subscribe(session=>this.sessionDto=session)
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
      const roleControl = this.profileForm.get("role");
      if(subjectControl && this.user!=null && this.selectedRole==3){
        this.user.isCompleted=true;

        this.user.roles=[roleControl?.value['value']]
        this.teacherService.save({...this.user, subjects: subjectControl.value, payRate: 0}).subscribe(user => {
          this.browserStorage.setItem('user', JSON.stringify(user))
          this.browserStorage.setItem('roles',JSON.stringify(user.roles.map(role=>role.name)))
          this.router.navigate(['/profile/details']);
        });
      }
      if (schoolTypeControl && schoolYearControl && this.user !=null && this.selectedRole==2) {
        this.user.isCompleted=true;
        this.user.roles=[roleControl?.value['value']]

        this.studentService.save({...this.user, schoolType: schoolTypeControl.value['value'], schoolYear: schoolYearControl.value['value']}).subscribe(user => {
          this.browserStorage.setItem('user', JSON.stringify(user))
          this.browserStorage.setItem('roles',JSON.stringify(user.roles.map(role=>role.name)))
          this.sessionBookingLanding.changeMessage(this.sessionDto,true);
          console.log(this.sessionDto)
          this.router.navigate(['/profile/details']);
        });
      }
    }
  }


  onChange(event: DropdownChangeEvent) {
    this.selectedRole =event.value['value']['id'];
    const schoolYearControl = this.profileForm.get('schoolYear');
    const schoolTypeControl = this.profileForm.get('schoolType');
    const subjectControl = this.profileForm.get('subject');
    if(this.selectedRole==3){
      schoolYearControl?.disable();
      schoolTypeControl?.disable();
      subjectControl?.enable();
    }else{
      schoolYearControl?.enable();
      schoolTypeControl?.enable();
      subjectControl?.disable();
    }
  }
}
