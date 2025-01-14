import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CarouselModule} from "primeng/carousel";
import {DialogModule} from "primeng/dialog";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import {SubjectService} from "../../core/service/subject.service";
import {Subject} from "../../core/models/subject";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-landing-subject',
  standalone: true,
    imports: [
        Button,
        CarouselModule,
        DialogModule,
        GoogleSigninButtonModule,
        PdfViewerModule,
        PrimeTemplate,
        Ripple,
        StyleClassModule
    ],
  templateUrl: './landing-subject.component.html',
  styleUrl: './landing-subject.component.scss'
})
export class LandingSubjectComponent implements OnInit{
  subjects:Subject[] =[];
  constructor(public router:Router,private subjectService:SubjectService) {
  }
  ngOnInit(): void {
    this.subjectService.getALL().subscribe((subjects)=>this.subjects=subjects
    )
  }

}
