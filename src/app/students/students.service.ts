import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../shared/interfaces/student';
import { ResponseGet } from '../shared/interfaces/response-get';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}

  addStudent(student: Student): Observable<void> {
    return this.httpClient.post<void>(
      'http://localhost:8100/api/alunos',
      student
    );
  }

  getStudents(): Observable<ResponseGet<Student>> {
    return this.httpClient.get<ResponseGet<Student>>(
      'http://localhost:8100/api/alunos'
    );
  }

  getStudentById(id: number): Observable<ResponseGet<Student>> {
    return this.httpClient.get<ResponseGet<Student>>(
      `http://localhost:8100/api/alunos/${id}`
    );
  }

  updateStudent(student: Student): Observable<void> {
    return this.httpClient.put<void>(
      'http://localhost:8100/api/alunos',
      student
    );
  }

  deleteStudent(student: { id: number }): Observable<any> {
    const studentToDelete: any = { body: student };
    return this.httpClient.delete<any>(
      'http://localhost:8100/api/alunos',
      studentToDelete
    );
  }
}
