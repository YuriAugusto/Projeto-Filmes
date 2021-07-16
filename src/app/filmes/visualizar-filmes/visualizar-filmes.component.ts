import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto="https://img.icons8.com/ios/452/no-image.png";
  filme: Filme;

  constructor(private activatedRoute: ActivatedRoute,
    private filmesService: FilmesService) { }

  ngOnInit() {
    this.visualizar(this.activatedRoute.snapshot.params['id']);
  }

  private visualizar(id: number): void{//this faz referência a variável com o escopo da classe, nesse casso a variável filme é uma variável de escopo local e this.filme é a variável com escopo da classe
    this.filmesService.visualizar(id).subscribe((filme: Filme) => this.filme = filme);
  }

}
