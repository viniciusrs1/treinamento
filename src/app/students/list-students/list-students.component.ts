import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent implements OnInit {
  rows: any = null;

  constructor(
    private route: Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  addStudent() {
    this.route.navigateByUrl('students/form/add');
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (res: any) => {
        this.rows = res?.response ? res.response : [];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editStudent(id: number): void {
    this.route.navigate(['/students/form/', 'edit', id]);
  }

  confirmDeleteStudent(id: number) {
    Swal.fire({
      title: 'Voce tem certeza?',
      text: 'Esta ação não poderá ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStudent(id);
      }
    });
  }

  deleteStudent(id: number): void {
    this.studentsService.deleteStudent({ id }).subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Aluno deletado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });

        this.getStudents();
      },
      error: (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocorreu um erro!',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }

  viewStudent(id: number): void {
    this.route.navigate(['/students/form/', 'view', id]);
  }
}
