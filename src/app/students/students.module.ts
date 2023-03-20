import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStudentsComponent } from './list-students/list-students.component';
import { StudentsRoutes } from './students.routing';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddStudentComponent } from './add-student/add-student.component';
import { FormStudentComponent } from './form-student/form-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListStudentsComponent,
    AddStudentComponent,
    FormStudentComponent,
    EditStudentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StudentsRoutes),
    NgxDatatableModule,
    ReactiveFormsModule,
  ],
})
export class StudentsModule {}
