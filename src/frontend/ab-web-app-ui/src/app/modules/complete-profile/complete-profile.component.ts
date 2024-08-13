import {Component, OnInit, WritableSignal} from '@angular/core';
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
import {MenuItem} from "primeng/api";
import {DropdownModule} from "primeng/dropdown";
import {SchoolType} from "../../core/models/SchoolType";
import {SchoolYear} from "../../core/models/SchoolYear";
import {SchoolService} from "../../core/service/school.service";
import {SchoolYearService} from "../../core/service/school-year.service";
import {MultiSelectModule} from "primeng/multiselect";
import {User} from "../../core/models/User";
import {AuthService} from "../../core/service/auth.service";
import {InputSwitchChangeEvent, InputSwitchModule} from "primeng/inputswitch";
import {UserService} from "../../core/service/user.service";
import {RoleName} from "../../core/models/Role";

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
  schoolTypes!: { name: string, value: SchoolType }[];
  schoolYears!: { name: string, value: SchoolYear }[]
  checked: boolean =false;
  constructor(private fb: FormBuilder,private userService:UserService,private authService:AuthService ,private schoolTypeService: SchoolService, private SchoolYearService: SchoolYearService) {
    this.schoolTypeService.getALL().subscribe(schoolTypes => {
        this.schoolTypes = schoolTypes.map(schoolType => ({name: schoolType.name, value: schoolType}));
      }
    );
    this.SchoolYearService.getALL().subscribe(schoolYears => {
        this.schoolYears = schoolYears.map(schoolYear => ({name: schoolYear.name, value: schoolYear}));
      }
    );
    this.user=authService.getUser();
  }
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: [{ value: '', disabled: !this.isEditing }, Validators.required],
      lastName: [{ value: '', disabled: !this.isEditing }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      schoolYear: [{ value: '', disabled: !this.isEditing }, Validators.required],
      schoolType: [{ value: '', disabled: !this.isEditing }, Validators.required]
    });
  }
  isFieldInvalid(field: string): undefined | false | true {
    const control = this.profileForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }
  handleChange(e: InputSwitchChangeEvent)
  {
    if(e.checked){
    this.user?.roles.push({id:3,name:RoleName.TEACHER})
      console.log(this.user)
    if(this.user!=null){
      this.userService.save(this.user).subscribe(user=>{
        this.authService.addUser(user)
      })
    }
    }else{
      if(this.user!=null){
        this.userService.save(this.removeRoleById(this.user,3)).subscribe(user=>{
          this.authService.addUser(user)
        })
    }
  }
  }
   removeRoleById(user: User, roleId: number): User {
    return {
      ...user, // Copy other properties of the user
      roles: user.roles.filter(role => role.id !== roleId) // Filter out the role with the specified roleId
    };
  }
  onSubmit(): void {
    if (this.profileForm.valid) {

      // Submit the form data
    }
  }
}
