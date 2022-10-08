import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Student } from 'src/app/shared/interfaces/student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent implements OnInit {
  rows: Student[] | null = null;
  loading: boolean = false;
  filter: string = '';
  temp: Student[] = [];

  constructor(
    private router: Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  updateFilter(event: any): void {
    const val = event.toLowerCase();

    if (this.temp?.length > 0) {
      const filter = this.temp.filter(
        (item: Student) => item.nome.toLowerCase().indexOf(val) !== -1 || !val
      );

      this.rows = filter;
    }
  }

  addStudent(): void {
    this.router.navigateByUrl('/students/form/add');
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (res) => {
        console.log(res);
        res?.response?.map((item: Student) => {
          item.dateFormatted = moment(item.data_matricula)
            .utc()
            .format('DD/MM/yyyy');

          return item;
        });

        this.rows = res?.response ? res.response : [];
        this.temp = this.rows ? [...this.rows] : [];
        this.loading = false;
      },
      error: (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error,
          showConfirmButton: false,
          timer: 1500,
        });
        this.loading = false;
      },
    });
  }

  editStudent(id: number): void {
    this.router.navigate(['/students/form', 'edit', id]);
  }

  viewStudent(id: number): void {
    this.router.navigate(['/students/form', 'view', id]);
  }

  confirmDeleteStudent(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não poderá ser revertida.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStudent(id);
      }
    });
  }

  deleteStudent(id: number): void {
    this.loading = true;
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
        this.loading = false;
      },
    });
  }
}
