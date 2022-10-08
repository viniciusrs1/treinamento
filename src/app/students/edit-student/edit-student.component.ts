import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
import Swal from 'sweetalert2';
import { Student } from 'src/app/shared/interfaces/student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  disabledForm: boolean | null = null;
  item: Student | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.disabledForm =
      this.route.snapshot.params['action'] === 'edit'
        ? false
        : this.route.snapshot.params['action'] === 'view'
        ? true
        : null;

    this.getStudentById();
  }

  getStudentById(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.studentsService.getStudentById(id).subscribe({
        next: (res) => {
          this.item = res?.response?.length > 0 ? res.response[0] : null;
        },
        error: (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    }
  }
}
