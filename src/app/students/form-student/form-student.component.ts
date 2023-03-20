import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css'],
})
export class FormStudentComponent implements OnInit, OnChanges {
  @Input() item: any = null;
  @Input() disabled: any = null;
  addStudentForm: FormGroup = Object.create(null);

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
    const data: any = { ...this.addStudentForm.value };

    if (this.addStudentForm.valid) {
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

  addStudent(data: any): void {
    this.studentsService.addStudent(data).subscribe({
      next: () => {
        alert('cadastrado com sucesso');
        this.router.navigate(['/students/list']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  editStudent(data: any): void {
    this.studentsService.updateStudent(data).subscribe({
      next: () => {
        alert('editado com sucesso');
        this.router.navigate(['/students/list']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
