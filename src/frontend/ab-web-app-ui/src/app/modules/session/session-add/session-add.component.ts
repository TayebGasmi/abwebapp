import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {combineLatest, distinctUntilChanged, map, of, switchMap} from 'rxjs';
import {filter} from 'rxjs/operators';
import {SessionDto} from "../../../core/models/session";
import {Teacher} from "../../../core/models/teacher";
import {TeacherService} from "../../../core/service/teacher.service";
import {SubjectService} from "../../../core/service/subject.service";
import {Subject} from "../../../core/models/subject";
import {DropdownModule} from "primeng/dropdown";
import {NgClass} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {PaymentComponent} from "../../payment/payment.component";
import {MenuItem} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {StepsModule} from "primeng/steps";
import {ConfigService} from "../../../core/service/config.service";

@Component({
    selector: 'app-session-add',
    templateUrl: './session-add.component.html',
    styleUrls: ['./session-add.component.scss'],
    imports: [
        ReactiveFormsModule,
        DropdownModule,
        NgClass,
        CalendarModule,
        PaymentComponent,
        Ripple,
        StepsModule
    ],
    standalone: true
})
export class SessionAddComponent implements OnInit {
    @Input() session!: SessionDto | null;
    @Output() sessionPayed = new EventEmitter<void>();
    sessionForm!: FormGroup;
    teachers: { label: string, value: Teacher }[] = [];
    subjects: { label: string, value: Subject }[] = [];
    sessionSteps: MenuItem[] = [];
    sessionEditStartTime = new FormControl<any>(null, Validators.required);
    activeStep = 0;
    @Input()
    currentDate = new Date()
    @ViewChild(PaymentComponent)
    paymentComponent!: PaymentComponent;
    sessionPrice: number = 0;

    constructor(
        private fb: FormBuilder,
        private teacherService: TeacherService,
        private subjectService: SubjectService,
        private configService: ConfigService
    ) {
    }

    get subject() {
        return this.sessionForm.get('subject');
    }

    get sessionSubject() {
        return this.sessionForm.get("subject")
    }

    get sessionStartDateTime() {
        return this.sessionForm.get("startDateTime")
    }

    ngOnInit(): void {
        this.configService.getSessionPrice().subscribe(price => this.sessionPrice = price);
        this.initializeForm();
        this.loadInitialData();
        this.initializeSteps();
        if (this.session) {
            this.patchFormWithSessionData(this.session);
        }
    }

    initializeForm() {
        this.sessionForm = this.fb.group({
            startDateTime: [null, Validators.required],
            teacher: [null, Validators.required],
            subject: [null, Validators.required]
        });
    }

    loadInitialData() {
        this.loadTeachers();
        this.loadSubjects();
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

    loadSubjects() {
        this.subjectService.getCurrentUserSubject().subscribe(subjects => {
            this.subjects = subjects.map(subject => ({
                label: subject.name,
                value: subject
            }));
        });
    }

    patchFormWithSessionData(session: SessionDto) {
        this.sessionForm.patchValue({
            startDateTime: session.startDateTime,
            teacher: session.teacher,
            subject: session.subject
        });
        this.sessionEditStartTime.patchValue(session.startDateTime);
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

    paySession() {
        if (this.sessionForm.invalid)
            return;
        this.paymentComponent.pay(this.sessionForm.value)
    }

    onPaymentCompleted() {
        this.sessionForm.reset()
        this.activeStep = 0
        this.sessionPayed.emit()
    }

    private initializeSteps() {
        this.sessionSteps = [
            {label: 'Choose Subject & Time'},
            {label: 'Choose Teacher'},
            {
                label: "Confirm Payment "
            }
        ];
    }
}
