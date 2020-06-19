import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './catalogue.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public categories;
  public categoriesCourant;
  constructor(public cateservice:CatalogueService, public router:Router){}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(){
      this.cateservice.getRessource("/categories")
        .subscribe(data=>{
            this.categories=data;
        },error1 => {
          console.log(error1);
        });
  }
  //title = 'ProduitsCategory';
  getProductsByCat(c: any) {
    this.categoriesCourant=c;
    this.router.navigateByUrl("/products/2/"+c.id);
  }

  onSelectedProducts() {
    this.categoriesCourant=undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  onProductsPromotions() {
    this.categoriesCourant=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDisponible() {
    this.categoriesCourant=undefined;
    this.router.navigateByUrl("/products/4/0");
  }

  onProductsSearch() {
    this.categoriesCourant=undefined;
    this.router.navigateByUrl("/products/5/0");
  }
}
