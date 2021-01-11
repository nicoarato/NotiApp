import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing,
               private dataLocalService: DataLocalService) { }

  ngOnInit() {

  }

  abrirNoticia() {

    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBtn;
    // console.log(this.enFavoritos);
    if ( !this.enFavoritos ){
      guardarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarNoticia( this.noticia );
        }
      };

    } else {
      guardarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar Favorito');
          this.dataLocalService.borrarNoticia( this.noticia );
        }
      };
    }


    const actionSheet = await this.actionSheetCtrl.create({


      buttons: [
        {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked'),
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBtn,
       {
        text: 'Cancelar',
        icon: 'close',
        cssClass: ['action-dark', 'cancelar'],
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
