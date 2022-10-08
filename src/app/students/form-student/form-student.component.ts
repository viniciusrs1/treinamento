import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
import Swal from 'sweetalert2';
import { Student } from 'src/app/shared/interfaces/student';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css'],
})
export class FormStudentComponent implements OnInit, OnChanges {
  @Input() item: Student | null = null;
  @Input() disabled: boolean | null = false;

  addStudentForm: FormGroup = Object.create(null);
  loading: boolean = false;

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(): void {
    if (this.addStudentForm && this.item) {
      this.populateForm();
    }
  }

  backPage(): void {
    this.router.navigateByUrl('/students/list');
  }

  createForm(): void {
    this.addStudentForm = new FormGroup({
      nome: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
      idade: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
      data_matricula: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
      curso: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
    });
  }

  populateForm(): void {
    this.addStudentForm.setValue({
      nome: this.item?.nome,
      idade: this.item?.idade,
      data_matricula: this.item?.data_matricula
        ? this.item.data_matricula.split('T')[0]
        : null,
      curso: this.item?.curso,
    });
  }

  onSubmit(): void {
    if (this.addStudentForm.valid) {
      this.loading = true;
      const data: Student = { ...this.addStudentForm.value };

      if (this.route.snapshot.params['id']) {
        data.id = this.route.snapshot.params['id'];
        this.editStudent(data);
      } else {
        this.addStudent(data);
      }
    } else {
      this.addStudentForm.markAllAsTouched();
    }
  }

  addStudent(data: Student) {
    this.studentsService.addStudent(data).subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Aluno cadastrado com sucesso',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/students/list']);
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

  editStudent(data: Student): void {
    this.studentsService.updateStudent(data).subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Aluno editado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.navigate(['/students/list']);
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
