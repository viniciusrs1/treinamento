import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}

  addStudent(student: any): Observable<void> {
    return this.httpClient.post<void>(
      'http://localhost:8100/api/alunos',
      student
    );
  }

  getStudents(): Observable<void> {
    return this.httpClient.get<void>('http://localhost:8100/api/alunos');
  }

  getStudentById(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8100/api/alunos/${id}`);
  }

  updateStudent(student: any): Observable<void> {
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
