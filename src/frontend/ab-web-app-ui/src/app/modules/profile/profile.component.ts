import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';
import {InputSwitchChangeEvent, InputSwitchModule} from "primeng/inputswitch";
import {User} from "../../core/models/user";
import {SchoolType} from "../../core/models/school-type";
import {SchoolYear} from "../../core/models/school-year";
import {BrowserStorageService} from "../../core/service/browser-storage.service";
import {Router} from "@angular/router";
import {StudentService} from "../../core/service/student.service";
import {UserService} from "../../core/service/user.service";
import {AuthService} from "../../core/service/auth.service";
import {SchoolService} from "../../core/service/school.service";
import {Role, RoleName} from "../../core/models/role";
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
import {SelectItem} from "primeng/api";
import {NotificationService} from "../../core/service/notification.service";
import {SessionBookLandingService} from "../../core/service/session-book-landing.service";
import {SessionService} from "../../core/service/session.service";
import {SessionDto} from "../../core/models/session";
import {Subscription} from "rxjs";

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
export class ProfileComponent implements OnInit{
  isEditing = true;
  profileForm: FormGroup =new FormGroup({}, {updateOn: 'blur'});
  user!:null | User;
  switch:boolean=false;
  roles!:{name:string,value:Role}[];
  schoolTypes!: { name: string, value: SchoolType }[];
  schoolYears!: { name: string, value: SchoolYear }[];
  subjects!:{ label: string, value: Subject }[];
  checked: boolean = true;
  selectedRole: any = null;
  teacher!:null | Teacher;
  student!:null | Student;
  sessionDto!:SessionDto;
  iscomplete!:boolean;
  constructor(private sessionService:SessionService,private sessionLanding:SessionBookLandingService,private notificationService:NotificationService,private teacherService:TeacherService,private subjectService:SubjectService,private roleService:RoleService,private browserStorage:BrowserStorageService,private router:Router,private studentService:StudentService,private fb: FormBuilder,private userService:UserService,private authService:AuthService ,private schoolTypeService: SchoolService, private SchoolYearService: SchoolYearService) {

  }
  toggleEdit() {
    this.isEditing = !this.isEditing;
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
      if(subjectControl && this.user!=null && this.selectedRole=="TEACHER"){
        this.user.firstName=this.profileForm.get("firstName")?.value
        this.user.lastName=this.profileForm.get("lastName")?.value
        console.log(this.user)
        this.teacherService.update({...this.user as User,subjects:this.selectedSubjects,payRate:0}).subscribe(user => {
          this.notificationService.showSuccess("Teacher Updated successfully !")
          this.browserStorage.setItem("user",JSON.stringify(this.user))
          console.log("Teacher saved successfully", user);
        });
      }
      if (schoolTypeControl && schoolYearControl && this.user !=null && this.selectedRole=="STUDENT") {
        this.user.firstName=this.profileForm.get("firstName")?.value
        this.user.lastName=this.profileForm.get("lastName")?.value
        this.studentService.update({...this.user as User,schoolType:schoolTypeControl.value['value'],schoolYear:schoolYearControl.value['value']}).subscribe(user => {
          this.notificationService.showSuccess("Student Updated successfully !")
          this.browserStorage.setItem("user",JSON.stringify(this.user))
          console.log("Student saved successfully", user);
        });
      }
    }
  }
  private initForm(): void {
    this.profileForm = this.fb.group({
      firstName: [{ value: this.user?.firstName, disabled: !this.isEditing }, Validators.required],
      lastName: [{ value: this.user?.lastName, disabled: !this.isEditing }, Validators.required],
      role: [{ value: this.selectedRole, disabled: !this.isEditing }, Validators.required],
      email: [{ value: this.user?.email, disabled: true }, Validators.required],
      schoolYear: [{ value: '', disabled: !this.isEditing }, Validators.required],
      schoolType: [{ value: '', disabled: !this.isEditing }, Validators.required],
      subject: [{
        value: '',
        disabled: !this.isEditing
      }, Validators.required]
    });
    console.log(this.teacher)
  }
  subjectsList: any[] = [
    { label: 'Math', value: 'math' },
    { label: 'Science', value: 'science' },
    { label: 'History', value: 'history' },
    { label: 'Art', value: 'art' },
  ];
 selectedSubjects: undefined | Array<Subject>;
  ngOnInit(): void {
    this.sessionLanding.completed.subscribe(complete=>this.iscomplete=complete)
    if(this.iscomplete){
      this.sessionLanding.currentMessage.subscribe(session=>this.sessionDto=session)
      console.log("###",this.sessionDto)
      this.sessionService.save(this.sessionDto).subscribe(response=>{
        this.notificationService.showSuccess("you have successfully booked a session")
      })
      this.sessionLanding.changeMessage("",false)
    }
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

    this.user=this.authService.getUser();
    this.selectedRole=JSON.parse(<string>this.browserStorage?.getItem('roles'))[0];
    this.initForm()
    const schoolYearControl = this.profileForm.get('schoolYear');
    const schoolTypeControl = this.profileForm.get('schoolType');
    const subjectControl = this.profileForm.get('subject');
    if(this.selectedRole=="TEACHER"){
      this.teacherService.findById(<number>this.user?.id).subscribe(teacher=>{
        this.teacher=teacher;
       this.selectedSubjects=this.teacher?.subjects
        this.profileForm.patchValue({subject:this.selectedSubjects})
       // this.profileForm.patchValue({subject:this.subjectsList})
        console.log(this.profileForm.get("subject")?.value)
        schoolYearControl?.disable();
        schoolTypeControl?.disable();
        subjectControl?.enable();
      });
    }
    if(this.selectedRole=="STUDENT"){
      this.studentService.findById(<number>this.user?.id).subscribe(student=>{
        this.student=student;
        this.profileForm.patchValue({schoolYear: { name: this.student.schoolYear?.name, value: this.student.schoolYear }})
        console.log(this.profileForm.get("subject")?.value)
        this.profileForm.patchValue({schoolType: { name: this.student.schoolType?.name, value: this.student.schoolType }})
        console.log(this.profileForm.get("subject")?.value)
        schoolYearControl?.enable();
        schoolTypeControl?.enable();
        subjectControl?.disable();
      });
    }
  }
}
