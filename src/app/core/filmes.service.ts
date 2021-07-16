import { ConfigParamsService } from './config-params.service';
import { ConfigPrams } from './../shared/models/config-prams';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from './../shared/models/filme';


const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient,
    private configService: ConfigParamsService) { }

  salvar(filme: Filme): Observable<Filme>{//passei a interface filme q serve como model para estrutura de dados
    return this.http.post<Filme>(url, filme);
  }

  listar(config: ConfigPrams): Observable<Filme[]>{
    const configPrams = this.configService.configurarParametros(config);

    return this.http.get<Filme[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Filme>{
    return this.http.get<Filme>(url + id);
  }

}
