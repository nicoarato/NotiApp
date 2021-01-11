import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaTopHeadlines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private noticiasService: NoticiasService) {}

  noticias: Article[] = [];
  ngOnInit() {
    this.cargarNoticias();
  }

  loadData( event ) {
    this.cargarNoticias( event );
  }

  cargarNoticias( event? ) {
    this.noticiasService.getTopHeadlines().subscribe(
      info => {
        // console.log('Noticias', info );

        if ( info.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.noticias.push( ...info.articles);

        if (event) {
          // console.log(event.target);
          event.target.complete();

        }
      }
    );
  }
}
