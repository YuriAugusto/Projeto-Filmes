import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from './../shared/models/filme';


const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme):Observable<Filme>{//passei a interface filme q serve como model para estrutura de dados
    return this.http.post<Filme>(url, filme);
  }

  listar():Observable<Filme[]>{
    return this.http.get<Filme[]>(url);
  }


}
