import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto="https://img.icons8.com/ios/452/no-image.png";
  filme: Filme;
  id: number;


  constructor(public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmesService: FilmesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void{
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certeza que deseja excluir, selecione o botão Ok',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      }as Alerta
    };

    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) =>{
      if(opcao){
        this.filmesService.excluir(this.id)
          .subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }

  private visualizar(): void{//this faz referência a variável com o escopo da classe, nesse casso a variável filme é uma variável de escopo local e this.filme é a variável com escopo da classe
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }

}
