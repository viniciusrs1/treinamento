import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStudentsComponent } from './list-students/list-students.component';
import { RouterModule } from '@angular/router';
import { StudentsRoutes } from './students.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormStudentComponent } from './form-student/form-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListStudentsComponent,
    FormStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StudentsRoutes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StudentsModule {}
