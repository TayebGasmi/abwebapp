import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {Button} from "primeng/button";
import {Teacher} from "../../core/models/teacher";
import {TeacherService} from "../../core/service/teacher.service";
import {DialogModule} from "primeng/dialog";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import {Ripple} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import {Router} from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {PdfViewerModule} from "ng2-pdf-viewer";
@Component({
  selector: 'app-landing-teacher',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule,
    Button,
    DialogModule,
    GoogleSigninButtonModule,
    Ripple,
    StyleClassModule,
    PdfViewerModule
  ],
  templateUrl: './landing-teacher.component.html',
  styleUrl: './landing-teacher.component.scss'
})
export class LandingTeacherComponent implements OnInit{
      teachers: Teacher[]= [] ;
      responsiveOptions: any[] | undefined;
      show:boolean=false;
      selectedTeacher: Teacher | undefined ;

  constructor(public router:Router,private teacherService:TeacherService) {
      }
      getAllTeachers(){
        this.teacherService.getALL().subscribe(teachers=>{
          this.teachers=teachers;
        })
      }

  ngOnInit(): void {
    this.getAllTeachers();
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible:5,
        numScroll: 1
      }
    ];
  }
  showDialog(teacherId:number){
    this.show=true;
    this.teacherService.findById(teacherId).subscribe(teacher=>{
      this.selectedTeacher=teacher;
    })
  }
}
