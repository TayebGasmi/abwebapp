import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {DropdownModule} from "primeng/dropdown";
import {NgClass} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {MenuItem} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {StepsModule} from "primeng/steps";
import {SessionDto} from "../../../../core/models/session";
import {Teacher} from "../../../../core/models/teacher";
import {Subject} from "../../../../core/models/subject";
import {TeacherService} from "../../../../core/service/teacher.service";
import {SubjectService} from "../../../../core/service/subject.service";
import {StudentService} from "../../../../core/service/student.service";
import {Student} from "../../../../core/models/student";
import {filter, switchMap} from "rxjs/operators";
import {combineLatest, distinctUntilChanged, map, of} from "rxjs";
import {SessionService} from "../../../../core/service/session.service";
import {NotificationService} from "../../../../core/service/notification.service";

@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.component.html',
  styleUrls: ['./session-add.component.scss'],
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    NgClass,
    CalendarModule,
    Ripple,
    StepsModule
  ],
  standalone: true
})
export class SessionAddComponent implements OnInit {
  @Input() session!: SessionDto | null;
  sessionForm!: FormGroup;
  teachers: { label: string, value: Teacher }[] = [];
  subjects: { label: string, value: Subject }[] = [];
  students: { label: string, value: Student }[] = [];
  sessionSteps: MenuItem[] = [];
  activeStep = 0;
  @Input() mintDate = new Date();
  @Input() startDateTime!: Date;
  @Output() sessionAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private sessionService: SessionService,
    private notificationService: NotificationService
  ) {
  }

  get student() {
    return this.sessionForm.get('student');
  }

  get subject() {
    return this.sessionForm.get('subject');
  }

  get teacher() {
    return this.sessionForm.get('teacher');
  }

  get sessionStartDateTime() {
    return this.sessionForm.get("startDateTime");
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
    this.initializeSteps();
    if (this.session) {
      this.patchFormWithSessionData(this.session);
    }
  }

  initializeForm() {
    this.sessionForm = this.fb.group({
      student: [null, Validators.required],
      startDateTime: [this.startDateTime, Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }

  loadInitialData() {
    this.loadStudents();
    this.loadSubjects();
    this.loadTeachers();

  }

  loadStudents() {
    this.studentService.getALL().subscribe(students => {
      this.students = students.map(student => ({
        label: `${student.firstName} ${student.lastName}`,
        value: student
      }));
    });
  }

  loadSubjects() {
    this.student?.valueChanges.pipe(
      filter(student => !!student),
      distinctUntilChanged(),
      switchMap((student: Student) => this.subjectService.getBySchool(student.schoolType?.name, student.schoolYear?.name))
    ).subscribe(subjects => {

      this.subjects = subjects.map(subject => ({
        label: `${subject.name}`,
        value: subject
      }));
    });

  }

  patchFormWithSessionData(session: SessionDto) {
    this.sessionForm.patchValue({
      student: session.student,
      startDateTime: session.startDateTime,
      teacher: session.teacher,
      subject: session.subject
    });
  }

  fieldHasError(fieldName: string): boolean {
    const control = this.sessionForm.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  nextStep() {
    this.activeStep++;
  }

  prevStep() {
    this.activeStep--;
  }

  loadTeachers() {
    const subjectChanges$ = this.subject?.valueChanges.pipe(
      filter(subject => !!subject),
      map(subject => subject.name),
      distinctUntilChanged()
    ) || of(null);

    const startTimeChanges$ = this.sessionStartDateTime?.valueChanges.pipe(
      filter(start => !!start),
      distinctUntilChanged(),
      map(start => start.toISOString())
    ) || of(null);

    combineLatest([subjectChanges$, startTimeChanges$])
    .pipe(
      map(([subjectName, startTime]) => ({
        subjectName,
        startTime
      })),
      filter(({subjectName, startTime}) => !!subjectName && !!startTime),
      switchMap(({subjectName, startTime}) =>
        this.teacherService.getAvailableTeachers(subjectName, startTime)
      )
    )
    .subscribe(teachers => {

      this.teachers = teachers.map(teacher => ({
        label: `${teacher.firstName} ${teacher.lastName}`,
        value: teacher
      }));
    });
  }

  private initializeSteps() {
    this.sessionSteps = [
      {label: 'Student'},
      {label: 'Subject & Time'},
      {label: 'Teacher'},
    ];
  }

  addSession() {
    if (this.sessionForm.invalid)
      return;
    this.sessionService.save(this.sessionForm.value).subscribe(
      () => {
        this.notificationService.showSuccess('new session added')
        this.activeStep = 0;
        this.sessionForm.reset()
        this.sessionAdded.emit()
      }
    )

  }

}
