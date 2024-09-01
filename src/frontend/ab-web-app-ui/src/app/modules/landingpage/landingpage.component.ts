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
import {map, switchMap} from "rxjs";

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
    GoogleSigninButtonModule
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {
  sessionForm!: FormGroup;
  subjects: { label: string, value: Subject }[] = [];
  teachers: { label: string, value: Teacher }[] = [];


  constructor(private sessionBook: SessionBookLandingService, private fb: FormBuilder,
              private socialAuthService: SocialAuthService,
              private teacherService: TeacherService,
              private authService: AuthService,
              private subjectService: SubjectService, public router: Router) {
  }

  private initializeForm() {
    this.sessionForm = this.fb.group({
      startDateTime: ['', Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required]
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
    this.sessionBook.changeMessage(this.sessionForm.value, false)

  }
}
