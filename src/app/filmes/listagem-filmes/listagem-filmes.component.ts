import { ConfigPrams } from './../../shared/models/config-prams';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filme } from 'src/app/shared/models/filme';
import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/filmes.service';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  config: ConfigPrams = {
    pagina: 0,
    limite: 4,
  };

  filmes: Filme[] = [];//defini e inicializei o array filme como vazio
  filtrosListagem:FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService,
    private fb: FormBuilder) { }

  ngOnInit():void {
    this.filtrosListagem = this.fb.group({
      texto: [''],//recebe um array vazio
      genero: ['']
    });

    //aqui eu recupero o campo com o nome texto
    this.filtrosListagem.get('texto').valueChanges.subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    //aqui eu recupero o select com o nome genero
    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
    });

    this.generos = ['Ação','Romance','Terror','Ficção científica','Comédia','Aventura','Drama'];

    this.listarFilmes();
  }
  onScroll(): void{
    this.listarFilmes();
  }

  private listarFilmes(): void{
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));//... == spread operator quebra o array em celulas
  }
  private resetarConsulta(): void{
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
