import { Filme } from 'src/app/shared/models/filme';
import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/filmes.service';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina = 4;//é uma variável que não pode ter seu valor alterado
  pagina = 0;
  filmes: Filme[] = [];//defini inicializei o array filme como vazio

  constructor(private filmesService: FilmesService) { }

  ngOnInit():void {
    this.listarFilmes();
  }
  onScroll(): void{
    this.listarFilmes();
  }

  private listarFilmes(): void{
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPagina)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));//... == spread operator quebra o array em celulas
  }

}
