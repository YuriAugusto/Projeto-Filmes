import { Alerta } from './../../shared/models/alerta';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FilmesService } from './../../core/filmes.service';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { MatDialog } from '@angular/material';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {
  //por padrão em angular caso a visibilidade de um método não seja definida ele será public
  //em métodos não é necessário explicitar um retorno quando ele for void (vazio), porém é uma boa prática deixar o retorno void explícito

  cadastro: FormGroup;//variável que representa o FormGroup dentro do html
  generos: Array<string>;

  constructor(public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit(): void {//executa sempre que o componente for inicializado

    this.cadastro = this.fb.group({//Validators permite que sejam aplicadas validações, já required é o método que torna o preenchimento do campo obrigatório
      titulo: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(256)]],//aqui como 2º arg eu passo um array que representa todas as validações necessárias para serem aplicadas no campo
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['',[Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

    this.generos = ['Ação','Romance','Terror','Ficção científica','Comédia','Aventura','Drama'];
  }

  submit(): void{
    this.cadastro.markAllAsTouched();//toda vez que submit for clicado em submit
    if(this.cadastro.invalid){
      return;//n retorna nada e impede o usuário de submit
    }
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void{//limpa todos os campos
    this.cadastro.reset();
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
    },

    () => {
      alert("ERRO AO SALVAR");
    });

  }

}
