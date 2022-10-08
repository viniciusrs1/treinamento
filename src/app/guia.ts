Entrar na pasta Projetos

git bash
-ng new treinamento-angular (falar pra eles acompanharem ou so assistirem e depois replicar, esta gravando)
-cd treinamento-angular
-code .
explicar alguns arquivos

-ng s
alterar arquivo app.componente.html
	<p>Treinamento Angular</p>


criar o modulo

-ng g module students  
-ng g c students/list-students 

explicar que pra acessar precisa de criar rotas

criar o arquivo de rotas global

criar app-routing.module.ts

	import { Routes } from '@angular/router';

	export const Approutes: Routes = [
 	 {
   		path: 'students',
    		loadChildren: () =>
      		 import('./students/students.module').then((m) => m.StudentsModule),
  	 },
	];

importar no app module

    import { RouterModule } from '@angular/router';

	RouterModule.forRoot(Approutes),

arrumar no app.component.html

	<router-outlet> </router-outlet>


criar rotas para students
criar o arquivo students.routing.ts

    import { Routes } from '@angular/router';
    import { ListStudentsComponent } from './list-students/list-students.component';

    export const StudentsRoutes: Routes = [
    {
        path: '',
        children: [
        {
            path: 'list',
            component: ListStudentsComponent,

        },
        ],
    },
    ];

importa no student.module.ts

    import { RouterModule } from '@angular/router';

    RouterModule.forChild(StudentsRoutes)


mostrar localhost/students/list


instalar bootstrap

npm install bootstrap --save

incluir bootstrap noangular json

"node_modules/bootstrap/dist/css/bootstrap.min.css",

"node_modules/bootstrap/dist/js/bootstrap.min.js"

-ng g c shared/header
-ng g c shared/footer

ng s

colocar no app.component

<app-header></app-header>
<router-outlet></router-outlet>
<app-footer></app-footer>

-ng g module dashboards
-ng g c dashboards/home

criar o dashboard.routing.ts

    import { Routes } from '@angular/router';
    import { HomeComponent } from './home/home.component';

    export const DashboardRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        
    },
    ];

arrumar no dashboard module o import

    import { RouterModule } from '@angular/router';

    RouterModule.forChild(DashboardRoutes)

arrumar a rota global

    {
        path: '',
        loadChildren: () =>
            import('./dashboards/dashboards.module').then((m) => m.DashboardsModule),
    },



vamos arrumar o header html

    <header>
    <div class="container">
        <div class="row">
        <div class="col-12">
            <div>
            <img
                src="../../../assets/images/Logo bugWare com nome abaixo - versão verde e sem fundo.png"
                alt=""
            />
            </div>
        </div>
        </div>
    </div>
    </header>

entra no drive da bug e baixa a logo verde

copia e cola na pasta do projeto /assets/images

arruma css

    header {
    background: #5b0768;
    }

    img {
    width: 150px;
    }


arrumar o home

    <div class="container">
    <div class="row">
        <div class="col-12 wrapper-title-button">
        <h1>Treinamento de Angular</h1>
        <a routerLink="./students/list">Acessar Estudantes!</a>
        </div>
    </div>
    </div>

    css

    .wrapper-title-button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 280px;
    }

    h1 {
    text-transform: uppercase;
    font-size: 54px;
    margin-bottom: 34px;
    }

    a {
    border: none;
    background: #73fbd2;
    border-radius: 5px;
    padding: 10px 30px;
    color: #5b0768;
    font-size: 22px;
    font-weight: 600;
    text-decoration: none;
    }

arrumando o footer

    <footer>
    <div class="container">
        <div class="row">
        <div class="col-12 footer-content">
            <p>Desenvolvido por bugWare</p>
        </div>
        </div>
    </div>
    </footer>

css

    .footer-content {
    display: flex;
    justify-content: center;
    }

    p {
    position: absolute;
    bottom: 0;
    }


agr vamos arrumar o list student html

    <div class="container">
    <div class="row">
        <div class="col-12"><h2>Lista de alunos</h2></div>
    </div>

    <div class="row">
        <div class="col-4">
        <form>
            <input
            type="text"
            name="filter"
            class="form-control"
            placeholder="Buscar"
            />
        </form>
        </div>

        <div class="col-8 wrapper-button">
        <button class="btn btn-lg btn-cyan">Adicionar Aluno</button>
        </div>
    </div>
    </div>

css

    h2 {
    margin: 34px 0;
    }

    input {
    height: 45px;
    }

    .wrapper-button {
    display: flex;
    justify-content: end;
    margin-bottom: 50px;
    }

    button {
    background: #73fbd2;
    color: #5b0768;
    height: 45px;
    }

    button:hover  {
        background: #5b0768;
    color: #73fbd2;
    }


colocar font roboto pegar link e colocar no index.html
importar o css no styles.css com *


instalar o ngx data table

npm i @swimlane/ngx-datatable --save  

ver q vai dar erro e incluir o --force

importar no student module

    NgxDatatableModule

    import { NgxDatatableModule } from '@swimlane/ngx-datatable';



colocar o datatable

<div class="col-12">
  <ngx-datatable
    class="material container striped"
    [rows]="rows"
    [columnMode]="'flex'"
    [headerHeight]="50"
    [footerHeight]="50"
    [rowHeight]="50"
    rowHeight="auto"
    [limit]="5"
  >
    <ngx-datatable-column
      name="Nome"
      prop="name"
      [flexGrow]="0.33"
    ></ngx-datatable-column>
    <ngx-datatable-column
      name="Idade"
      prop="age"
      [flexGrow]="0.14"
    ></ngx-datatable-column>
    <ngx-datatable-column
      name="Curso"
      prop="course"
      [flexGrow]="0.33"
    ></ngx-datatable-column>

    <ngx-datatable-column name="Ações" prop="" [flexGrow]="0.1">
      <ng-template ngx-datatable-cell-template let-value="value">
        <a
          class="link mr-2"
        >
          <i class="fas fa-eye fa-lg"></i>
        </a>
        <a
          class="link mr-2"
        >
          <i class="fas fa-edit fa-lg"></i>
        </a>
        <a
          class="link"
        >
          <i class="fas fa-trash text-danger fa-lg"></i>
        </a>
      </ng-template>
    </ngx-datatable-column>
  </ngx-datatable>
</div>

colocar no ts para testar

  rows = [
     {
       name: 'Vinicius Rodrigues de Sousa',
       age: 10,
       course: 'Engenharia da Computação',
     },
     {
       name: 'Lindovaldo Leao',
       age: 40,
       course: 'Engenharia da Computação',
     },
     {
       name: 'Caio Freitas da Silva',
       age: 41,
       course: 'Análise e Desenvolvimento de Sistemas',
     },
  ];


colocar no angular.json no style

"./node_modules/@swimlane/ngx-datatable/index.css",
"./node_modules/@swimlane/ngx-datatable/themes/material.scss",
"./node_modules/@swimlane/ngx-datatable/themes/dark.scss",
"./node_modules/@swimlane/ngx-datatable/themes/bootstrap.scss",
"./node_modules/@swimlane/ngx-datatable/assets/icons.css"

parar e rodar de novo

	

importar o font awsome no index. html
	abrir um projeto que eu tenha o link do font awsome
	<script
      src="https://kit.fontawesome.com/be07a8fd5c.js"
      crossorigin="anonymous"
    ></script>

colocar no css

i:not(.fa-trash) {
  margin-right: 8px;
}

i {
  color: black;
  font-size: 20px;
  cursor: pointer;
}

comentar o ts pra ver como fica sem dados

colocar no ngxdatatable

[messages]="{ emptyMessage: 'Nenhum aluno encontrado.' }"

colocar o onclick no botao de adicionar (click)="addStudent()"
chamar na funcao
this.router.navigateByUrl('/students/form/add');

-ng g c students/add-student

explicar que pra nao repetir codigo vai separar


-ng g c students/form-student

-ng g c students/edit-student

arrumar rota

{
        path: 'form/add',
        component: AddStudentComponent,
 },

mudar o html do add aluno pro seletor do form aluno

construir o html

<div class="container">
  <div class="row">
    <div class="col-12">
      <h2 class="form-row">Adicionar Aluno</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <form>
        <div class="row form-row">
          <div class="col-md-10">
            <div class="form-group">
              <label for="name">Nome</label>
              <input
                type="text"
                class="form-control"
                id="name"
                formControlName="name"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="age">Idade</label>
              <input
                type="number"
                class="form-control"
                id="age"
                formControlName="age"
              />
            </div>
          </div>
        </div>

        <hr />

        <div class="row form-row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="date">Data de matrícula</label>
              <input
                type="datetime-local"
                class="form-control"
                id="date"
                formControlName="date"
              />
            </div>
          </div>

          <div class="col-md-8">
            <div class="form-group">
              <label for="course">Curso</label>
              <input
                type="text"
                class="form-control"
                id="course"
                formControlName="course"
              />
            </div>
          </div>
        </div>

        <div class="button-group form-row">
          <div class="row">
            <div class="col-md-6">
              <button class="btn btn-lg btn-warning text-white">Voltar</button>
            </div>
            <div class="col-md-6 wrapper-save-client">
              <button
                class="btn btn-lg btn-success text-white save-client"
                type="submit"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

css

.form-row {
  padding: 25px 0;
}

.wrapper-save-client {
  display: flex;

  justify-content: flex-end;
}

colocar o onclick de voltar pagina e no ts

  backPage(): void {
    this.router.navigateByUrl('/students/list');
  }

criar o form de forma reativa









// criar o form reativo

import { StudentsModule } from './students/students.module';

// addStudentForm: FormGroup = Object.create(null);

// createForm(): void {
//     this.addStudentForm = new FormGroup({
//       name: new FormControl(
//         {
//           value: null,
//           disabled: this.disabled,
//         },
//         [Validators.required]
//       ),
//       age: new FormControl({ value: null, disabled: this.disabled }, [
//         Validators.required,
//       ]),
//       date: new FormControl(
//         {
//           value: null,
//           disabled: this.disabled,
//         },
//         [Validators.required]
//       ),
//       course: new FormControl({ value: null, disabled: this.disabled }, [
//         Validators.required,
//       ]),
//     });
// }

// implementar no on init

// chamar o [formGroup]="addStudentForm" na tag form no html
// vai dar erro pq tem q importar no student module e no app module

// import { FormsModule, ReactiveFormsModule } from '@angular/forms'; e chamar no import

// colocar o (ngSubmit)="onSubmit()" e criar no ts

// onSubmit(): void {
//     if (this.addStudentForm.valid) {

//       const data: any = { ...this.addStudentForm.value };

//       this.addStudent(data);

//     } else {
//       this.addStudentForm.markAllAsTouched();
//     }
//   }

//   addStudent(data: any) {
//     console.log("entrou")
//   }

//   colocar a mascara de campo invalido

//   input.ng-touched.ng-invalid {
//     border-color: #d32f2f;
//   }

//   Vamos criar o Serviço

//   ng g service students/students

//   importar o httpclient import { HttpClient } from '@angular/common/http';
// import { format } from 'path';

//   e colocar no construtor private httpClient: HttpClient

//   importar tb no app module

//   criar o insert

//   addStudent(student: any): Observable<void> {
//     return this.httpClient.post<void>('', student);
//   }

//   abrir o back da manu pra pegar a rota, aproveitar e deixar rodando
//  http://localhost:8100/api/alunos'

// colocar na funcao

// this.studentsService.addStudent(data).subscribe(()=>{
//     next: ()=>{console.log('data', data);},
//     error: (error)=>{console.log(error);}
// });

// testar e depois arrumar as funcoes

// dentro do next
// console.log('data', data);
//         alert('Aluno cadastrado com sucesso!');
//         this.router.navigate(['/students/list']);

// errar o insert no back pra ver o erro e entao arrumar

// alert(error?.error?.data ? error.error.data : 'Ocorreu um erro!');

// colocar o loading

// loading: boolean = false;

// dentro do form.valid
//     this.loading = true;

// e depois no erro
//     this.loading = false;

// no html colocar dentro do botao
// <div *ngIf="loading" class="spinner-border" role="status">
//     <span class="sr-only">Loading...</span>
// </div>

// mostrar

// depois colocar o cadastrar dentro de uma div

// <div *ngIf="!loading">Cadastrar</div>

// mostrar

// arrumar css do botao

// .spinner-border {
//     width: 18px;
//     height: 18px;
//     font-size: 8px;
//   }

//   .save-student{
//     min-width: 110.5px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   falar q ta pronto e sobre o angular takeuntil

//   agr voltamos pro list e vamo criar os outros servicos

//   getStudents(): Observable<any> {
//     return this.httpClient.get<any>('http://localhost:8100/api/alunos');
//   }

//   coloca o rows no ts e exclui os mocados

//   rows: any | null = null;

//   chama no oninit o getStudent e cria a funcao get

//   depois chama o servico no construtor  e preenche a funcao

//   getStudents(): void {
//     this.studentsService.getStudents().subscribe({
//       next: (res) => {
//         console.log('res', res);

//       },
//       error: () => {
//         console.log('erro');
//       },
//     });
//   }

//   testa, ta vindo tudo nuill mas ta vindo

//   coloca

//   this.rows = res?.response ? res.response : [];

//   mudar os props no html pro nome em ptbt q vem do back

// mudar o create form no form-student pros nomes em ptbr e no form-student html mudar os form control pra ptbr tb
// agora vai inserir certim no banco

// insirir o campo de data matricula e alterar o flex grow de todos

// <ngx-datatable-column
// name="Nome"
// prop="nome"
// [flexGrow]="0.25"
// ></ngx-datatable-column>
// <ngx-datatable-column
// name="Idade"
// prop="idade"
// [flexGrow]="0.12"
// ></ngx-datatable-column>
// <ngx-datatable-column
// name="Curso"
// prop="curso"
// [flexGrow]="0.25"
// ></ngx-datatable-column>

// <ngx-datatable-column
// name="Data de Matrícula"
// prop="data_matricula"
// [flexGrow]="0.18"
// ></ngx-datatable-column>

// colocar no ngxtable tb    [loadingIndicator]="!rows"

// criar o (click)="viewStudent(value.id)" no botao de view

// {
//   path: 'form/:action/:id',
//   component: EditStudentComponent
// }

// editStudent(id: number): void {
//   this.router.navigate(['/students/form', 'edit', id]);
// }

// colocar no html do edit <app-form-student></app-form-student>

// e depois criar

// getStudentById(): void {

// }

// e chamar no construtor

// fazer o servico

// getStudentById(id: number): Observable<any> {
//   return this.httpClient.get<any>(`http://localhost:8100/api/alunos/${id}`);
// }

// colocar no construtor

// private route: ActivatedRoute,
//     private studentsService: StudentsService

//     colocar na get student

//     const id: number = this.route.snapshot.params['id'];

//     if (id) {
//       this.studentsService.getStudentById(id).subscribe({
//         next: (res) => {
//           console.log(res);
//         },
//         error: (error) => {
//           console.log(error);
//         },
//       });
//     }

//     criar a variavel

//     item: any = null;

//     de depois complementar a funcao

//     this.item = res?.response?.length > 0 ? res.response[0] : null;

//     colocar o item no html do edit student por input property
//     [item]="item"
//     e explicar q agr tem q receber la

//     @Input() item: any = null;

//     explicar q agr tem q popular o form e vai fazer isso pelo onchange

//     implementar o onchange e criar a func

//     ngOnChanges(): void {

//     }

//     colocar isso no onchange

//     if (this.addStudentForm && this.item) {
//       this.populateForm();
//     }

//     populateForm(): void {
//       this.addStudentForm.setValue({
//         nome: this.item?.nome,
//         idade: this.item?.idade,
//         data_matricula: this.item?.data_matricula,
//         curso: this.item?.curso,
//       });
//     }
//     testar

// formatar a data

// data_matricula: this.item?.data_matricula
//         ? this.item.data_matricula.split('T')[0]
//         : null,

//         aproveitar e arrumar a data na listagem

//         instalar o moment

//         npm i moment

//         importar no list StudentsModule.ts

//         import * as moment from 'moment';

//         e acrescentar no next antes

//         res?.response?.map((item: any) => {
//           item.dateFormatted = moment(item.data_matricula)
//             .utc()
//             .format('DD/MM/yyyy');

//           console.log(item);

//           return item;
//         });

//         mudar lo html o prop para dateFormatted

//         agora vamos alterar o submit do form para editar ao inves de adicionar

//         colcoamos isso no onsubmit

//         if (this.route.snapshot.params["id"]) {
// data.id = this.route.snapshot.params['id'];
//           this.editStudent(data);
//         } else {
//           this.addStudent(data);
//         }

//         e importamos o route no construtor

//         precisamos criar o Servico

//         updateStudent(student: any): Observable<any> {
//           return this.httpClient.put<any>(
//             'http://localhost:8100/api/alunos',
//             student
//           );
//         }

//         agr criamos a funcao

//         this.studentsService.updateStudent(data).subscribe({
//           next: () => {
//             alert('Aluno editado com sucesso!');
//             this.router.navigate(['/students/list']);
//           },
//           error: (error) => {
//             alert(error?.error?.data ? error.error.data : 'Ocorreu um erro!');

//             this.loading = false;
//           },
//         });

//         tester

//         nao ta funcionando, provavelmente eh algo no back mas depois vai conferir

//         vamos arrumar o botao la do form colocando isso no html

//         <ng-container>
//                     {{
//                       route.snapshot.params["id"] ? "Alterar" : "Cadastrar"
//                     }}</ng-container

//         se der erro trocar pra public  o route no construtor, mas nao eh certo

//   vamos fazer o delete agr

//   (click)="deleteStudent(value.id)"

//   e criamos a func no ts

//   entra no site do sweet alert 2 e instala ele

//   depois importa no ts

//   e cria a func no ts

//   confirmDeleteStudent(id: number): void {
//     Swal.fire({
//       title: 'Tem certeza?',
//       text: 'Esta ação não poderá ser revertida.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: 'green',
//       cancelButtonColor: 'red',
//       confirmButtonText: 'Deletar',
//       cancelButtonText: 'Cancelar',
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.deleteStudent(id);
//       }
//     });
//   }

//   chama essa la no hml e cria a delet tb

//   vamo precisar do servico explicar q nao eh o melhor jeito pq delete nao costuma receber body mas da pra fazer

// deleteStudent(student: any): Observable<any> {
//     const studentToDelete: any = { body: student };
//     return this.httpClient.delete<any>(
//       'http://localhost:8100/api/alunos',
//       studentToDelete
//     );
//   }

//   criar o loading e depois a func

//   this.loading = true;
//   this.studentsService.deleteStudent(id).subscribe({
//     next: () => {
//       alert('Deletado com sucesso.');

//       this.getStudents();
//     },
//     error: (error) => {
//       alert('Ocorreu um erro ao deletar o cliente.');
//       this.loading = false;
//     },
//   });

// colocar this.loading = false; no get students, pra certo ou erro

vamos arrumar o view agr 

    (click)="viewStudent(value.id)" 

    e cria a func no ts

    viewStudent(id: number): void {
        this.router.navigate(['/students/form/view', id]);
      } 

      mas da pra melhorar essas rotas 

      alterar a rota 

      {
        path: 'form/:action/:id',
        component: EditStudentComponent,
      },

      e depois no ts arrumar as duas func 


      editStudent(id: number): void {
        this.router.navigate(['/students/form', 'edit', id]);
      }
    
      viewStudent(id: number): void {
        this.router.navigate(['/students/form', 'view', id]);
      }

      la no edit component criar a variavel

      disabledForm: any = null; 

      e verificar no on init 

      this.disabledForm =
      this.route.snapshot.params["action"] === "edit"
        ? false
        : this.route.snapshot.params["action"] === "view"
        ? true
        : null;

        precisamos mandar essa info pro form component atraves de input property colocando o disabled

        <app-form-student [item]="item" [disabled]="disabledForm"></app-form-student>

receber la no form ts 

@Input() disabled: boolean = false; e excluir a outra variavel

so precisamos agr tirar o botao ao visualizar 

*ngIf="!disabled" dentro do botao 

ta pronto o crud , vamos so dar uma melhorada agr 

temos q colocar notificacao e criar interface e arrumar a tipagem 

procurar console.log retirar todos e os de erro colocar o swal 

e ir no form ts e arrumar os alerta 

import Swal from 'sweetalert2';

Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: "Ocorreu um erro!",
    showConfirmButton: false,
    timer: 1500,
  });

  ou 

  Swal.fire({
    position: 'top-end',
    icon: 'successr',
    title: "Aluno .... com sucesso!",
    showConfirmButton: false,
    timer: 1500,
  });

hora de arrumar a tipagem 

comeco nos ts de cima pra baixo 

no edit tem q arrumar 

disbled se der erro arrumar no form tb pra boolean | null 

pro item precisamos de uma interface 

criar pasta interfaces dentro de shared  e criar o student ts 

export interface Student {
    curso: string;
    data_matricula: string;
    dateFormatted?: string;
    id: number;
    idade: number;
    isdeleted: boolean;
    nome: string;
  }

  arrumar la no ts Student | null 


  no form 

  data : Student  

  no list 

  rows: Student[] | null

  item : Student

  arrumando a tipagem do servico 

  pro get e getby id eh diferente, tem q criar o response-get.ts nas interfaces 

  export interface ResponseGet<T> {
    error: boolean;
    response: T[];
  }

  o servico fica assim 

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

  nao arrumar o delete pq ta meio gambiarra 

  fazer o filtro de busca

  colcoar no input 

  [ngModel]="filter"
  (ngModelChange)="updateFilter($event)"

  colocar no ts 


  filter: string = '';
  temp: Student[] = [];

  colocar na funcao getStudent 

  this.temp = this.rows ? [...this.rows] : [];

  updateFilter(event: any): void {
    const val = event.toLowerCase();

    if (this.temp?.length > 0) {
      const filter = this.temp.filter(
        (item: Student) => item.nome.toLowerCase().indexOf(val) !== -1 || !val
      );

      this.rows = filter;
    }
  }



