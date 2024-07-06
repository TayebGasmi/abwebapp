import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableEntityComponent } from './components/table-entity/table-entity.component';
import {TableModule} from "primeng/table";
import {ProgressBarModule} from "primeng/progressbar";
import {MultiSelectModule} from "primeng/multiselect";
import {SliderModule} from "primeng/slider";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
    exports: [
        TableEntityComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        ProgressBarModule,
        MultiSelectModule,
        SliderModule,
        DropdownModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        ToggleButtonModule,
        TableEntityComponent,
    ]
})
export class SharedModule { }
