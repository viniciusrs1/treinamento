import { Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';

export const StudentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListStudentsComponent,
      },
      {
        path: 'form/add',
        component: AddStudentComponent,
      },
      {
        path: 'form/:action/:id',
        component: EditStudentComponent,
      },
    ],
  },
];
