import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apikey = environment.apikey;
const apiURL = environment.apiURL;

const headers = new HttpHeaders({
  'X-Api-key': apikey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }


  private ejecutarQuery<T>( query: string) {
    query = apiURL + query;
    return this.http.get<T>( query , { headers } );
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&page=${this.headlinesPage}`);

  }

  getTopHeadlinesCategorias( categoria: string) {

     if ( this.categoriaActual === categoria ){
       this.categoriaPage++;

    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

     return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&category=${categoria}&page=${ this.categoriaPage }`);
  }
}
