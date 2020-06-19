import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;
  public currentProducts: any;
  public editPhoto: boolean;
  public seletedFiles;
  public progress: number;
  public currentFileUpload: any;
  public title:string;

  constructor(public cateservice:CatalogueService, public route:ActivatedRoute, public router:Router) {
   /* this.route.params.subscribe(params=>{
      console.log(params)
    })
    */
  }

  ngOnInit() {
    this.router.events.subscribe(val=>{
      console.log(val)
      if (val instanceof NavigationEnd){
        let url=val.url;
        //console.log(url)
        let p1=this.route.snapshot.params.p1;
        console.log(p1)
        if (p1==1){
          this.title="Produits Sélectionnée";
          this.getProducts("/productses/search/selectedProducts");
        }
        //ici on chercher a afficher le produit par category
        else if (p1==2){
          let p2=this.route.snapshot.params.p2;//ici p2 represente id du category
          this.title="Produits de la Categories:"+p2;
          this.getProducts('/categories/'+p2+'/products')
        }
        else if (p1==3){
          //let p3=this.route.snapshot.params.p3;//ici p3 represente id du produit en promo
          this.title="Produits en promotions";
          this.getProducts("/productses/search/promotionProducts");
        }
        else if (p1==4){
          //let p4=this.route.snapshot.params.p4;//ici p4 represente id du produit disponible
          this.title="Produits Disponible";
          this.getProducts("/productses/search/disponobleProducts");
        }
        else if (p1==5){
          //let p5=this.route.snapshot.params.p5;//ici p4 represente id du produit disponible
          this.title="Produits Recherche";
          this.getProducts("/productses/search/chercherProducts");
        }
      }
    });
    let p1=this.route.snapshot.params.p1;
    if (p1==1){
      this.getProducts("/productses/search/selectedProducts");
    }
  }

  private getProducts(url) {
    this.cateservice.getRessource(url)
      .subscribe(data=>{
        this.products=data;
      },error => {
        console.log(error);
      })
  }

  onEditPhoto(p) {
    this.currentProducts=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
      this.seletedFiles=event.target.files;//pour selectionner le fichier
  }

  onUploadPhoto() {
    this.progress=0;
    this.currentFileUpload=this.seletedFiles.item(0);//pour recuperer le fichier qui etait selectinoner
    this.cateservice.uploadPhotProducts(this.currentFileUpload, this.currentProducts.id).subscribe(event=>{
          if (event.type===HttpEventType.UploadProgress){
            this.progress=Math.round(100* event.loaded / event.total);
            console.log(this.progress)
          }else if(event instanceof HttpResponse){
            alert("Fin du Téléchargement...");
            this.getProducts("/productses/search/selectedProducts");
          }
    },error => {
      alert("Probléme de Téléchargement..."+JSON.parse(error.error).message);
    })

  }
}
