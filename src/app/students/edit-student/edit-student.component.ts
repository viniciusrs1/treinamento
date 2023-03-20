import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  item: any = null;
  disabledForm: boolean | null = null;

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

    this.getStudentByID();
  }

  getStudentByID(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.studentsService.getStudentById(id).subscribe({
        next: (res) => {
          this.item = res?.response.length > 0 ? res.response[0] : null;
          console.log('item', this.item);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
