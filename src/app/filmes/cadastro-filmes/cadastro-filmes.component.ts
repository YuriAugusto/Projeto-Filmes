import { MatDialog } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Alerta } from './../../shared/models/alerta';
import { FilmesService } from './../../core/filmes.service';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {
  //por padrão em angular caso a visibilidade de um método não seja definida ele será public
  //em métodos não é necessário explicitar um retorno quando ele for void (vazio), porém é uma boa prática deixar o retorno void explícito

  id: number;
  cadastro: FormGroup;//variável que representa o FormGroup dentro do html
  generos: Array<string>;


  constructor(public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit(): void {//executa sempre que o componente for inicializado
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){//se o id existir
      this.filmeService.visualizar(this.id)
        .subscribe((filme : Filme) => this.criarFormulario(filme));
    }else{
      this.criarFormulario(this.criarFilmeEmBranco());
    }

    this.generos = ['Ação','Romance','Terror','Ficção científica','Comédia','Aventura','Drama'];
  }

  submit(): void{
    this.cadastro.markAllAsTouched();//toda vez que submit for clicado em submit
    if(this.cadastro.invalid){
      return;//n retorna nada e impede o usuário de submit
    }
    const filme = this.cadastro.getRawValue() as Filme;
    if(this.id){
      filme.id = this.id;
      this.editar(filme);
    }else{
      this.salvar(filme);
    }

  }

  reiniciarForm(): void{//limpa todos os campos
    this.cadastro.reset();
  }

  private criarFormulario(filme:Filme): void{
    this.cadastro = this.fb.group({//Validators permite que sejam aplicadas validações, já required é o método que torna o preenchimento do campo obrigatório
      titulo: [filme.titulo,[Validators.required, Validators.minLength(2), Validators.maxLength(256)]],//aqui como 2º arg eu passo um array que representa todas as validações necessárias para serem aplicadas no campo
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento,[Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Filme{
    return{
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null
    }as Filme;
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(() =>{
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar novo filme',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        }as Alerta
      };

      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) =>{
        if(opcao){
          this.router.navigateByUrl('filmes');
        }else{
          this.reiniciarForm();
        }
      });
    },

    () => {
      const config = {
        data: {
          titulo: "Erro ao salvar o registro!",
          descricao: "Não conseguimos salvar o seu registro, por favor tente novamente mais tarde.",
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        }as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });

  }

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(() =>{
      const config = {
        data: {
          descricao: "Seu registro foi atualizado com sucesso!",
          btnSucesso: "Ir para a listagem",
        }as Alerta
      };

      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
    },

    () => {
      const config = {
        data: {
          titulo: "Erro ao editar o registro!",
          descricao: "Não conseguimos editar o seu registro, por favor tente novamente mais tarde.",
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        }as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });

  }

}
