import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {//executa sempre que o componente for inicializado

    this.cadastro = this.fb.group({//Validators permite que sejam aplicadas validações, já required é o método que torna o preenchimento do campo obrigatório
      titulo: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(256)]],//aqui como 2º arg eu passo um array que representa todas as validações necessárias para serem aplicadas no campo
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['',[Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

  }

}
