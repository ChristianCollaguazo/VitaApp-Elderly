import { Subcategory } from './../../../controller/interfaces/subcategory.interface';
import { Pictogram } from './../../../controller/interfaces/pictogram.interface';
import { Carer } from './../../../controller/interfaces/carer.interface';
import { Elderly } from './../../../controller/interfaces/elderly.interface';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { ActivatedRoute } from '@angular/router';
import { SubcategoryCarer } from 'src/app/controller/interfaces/subcategory.interface';
import {
  PictogramCarer,
  PictogramHelperCarer,
} from 'src/app/controller/interfaces/pictogram.interface';

declare var ResizeObserver;
declare var responsiveVoice;

import { CategoryCarer } from 'src/app/controller/interfaces/category.interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, AfterViewInit, AfterViewChecked {
  elderly: Elderly;
  carer: Carer;
  category: CategoryCarer;
  categoryId: number;
  activeSubcategory: SubcategoryCarer;
  pictogramsHelper: PictogramHelperCarer[] = [];
  helperId: number;
  subcategories: SubcategoryCarer[] = [];
  pictograms: PictogramCarer[] = [];
  pictogramsMessage = [];
  @ViewChild('gridContent') gridContent: ElementRef<HTMLElement>;
  @ViewChild('globalContainer') globalContainer: ElementRef<HTMLElement>;
  @ViewChild('message') message: ElementRef<HTMLElement>;
  resizeObserver: any;

  positionsPanel = [];

  pictogramDelete: Pictogram = {
    name: 'Borrar',
    imageUrl: 'assets/Images/delete.png',
    color: 'FFE4AE',
    subcategoryId: null,
    images: null,
  };
  pictogramAll: Pictogram = {
    name: 'Borrar Todo',
    imageUrl: 'assets/Images/delete-all.png',
    color: 'FFE4AE',
    subcategoryId: null,
    images: null,
  };

  pictogramSend: Pictogram = {
    name: 'Enviar',
    imageUrl: 'assets/Images/entregar.png',
    color: 'B7FF9E',
    subcategoryId: null,
    images: null,
  };

  constructor(
    private vitaapp: VitaappService,
    private activeRoute: ActivatedRoute,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.categoryId = params.id;
      this.getElderly();
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.widthPictogram();
    });

    this.resizeObserver.observe(this.gridContent.nativeElement);
  }
  ngAfterViewChecked() {
    this.widthPictogram();
  }

  widthPictogram(): void {
    const widthGridContent = this.gridContent.nativeElement.offsetWidth;
    const widthWindow = window.innerWidth;
    const items = this.globalContainer.nativeElement.getElementsByClassName(
      'content-pictogram-grid__card'
    );

    for (let element of items) {
      const htmlElement: HTMLElement = element as HTMLElement;
      if (widthWindow >= 1200) {
        htmlElement.style.width = `calc(${
          (widthGridContent * 7.6923) / 100
        }px - 0.5rem)`;
      } else if (widthWindow >= 768) {
        htmlElement.style.width = `calc(${
          (widthGridContent * 11.111111) / 100
        }px - 0.5rem)`;
      } else if (widthWindow >= 576) {
        htmlElement.style.width = `calc(${
          (widthGridContent * 20) / 100
        }px - 0.5rem)`;
      } else if (widthWindow >= 365) {
        htmlElement.style.width = `calc(${
          (widthGridContent * 25) / 100
        }px - 0.5rem)`;
      } else {
        htmlElement.style.width = `calc(${
          (widthGridContent * 33.33333) / 100
        }px - 0.5rem)`;
      }
    }
    if (widthWindow >= 1200) {
      if (this.message) {
        this.message.nativeElement.style.width = `calc(100vw - 3 * (${
          (widthGridContent * 7.6923) / 100
        }px - 0.5rem) - 2rem)`;
        this.message.nativeElement.style.height = '100%';
      }
    } else if (widthWindow >= 768) {
      if (this.message) {
        this.message.nativeElement.style.width = `calc(100vw - 3 * (${
          (widthGridContent * 11.111111) / 100
        }px - 0.5rem) - 2rem)`;

        this.message.nativeElement.style.height = '100%';
      }
    } else if (widthWindow >= 576) {
      if (this.message) {
        this.message.nativeElement.style.width = `100vw`;
        this.message.nativeElement.style.height = `calc(${
          (widthGridContent * 20) / 100
        }px + 0.5rem)`;
      }
    } else if (widthWindow >= 365) {
      this.message.nativeElement.style.width = `100vw`;
      this.message.nativeElement.style.height = `calc(${
        (widthGridContent * 25) / 100
      }px + 0.5rem)`;
    } else {
      this.message.nativeElement.style.width = `100vw`;
      this.message.nativeElement.style.height = `calc(${
        (widthGridContent * 33.333333) / 100
      }px + 0.5rem)`;
    }
  }

  getElderly(): void {
    this.vitaapp.elderlyData().subscribe(
      (data) => {
        this.elderly = data;
        this.getCarer();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCarer(): void {
    this.vitaapp.carerDataById(this.elderly.carerId).subscribe((data) => {
      this.carer = data;
      this.getSubcateries();
      this.getCategoryById();
      this.getPositionAdminPanel();
    });
  }

  getSubcateries(): void {
    this.vitaapp
      .getAllSubcategoriesCarerByCategoryId(
        this.categoryId,
        'carer-' + this.carer.email
      )
      .subscribe((data) => {
        this.subcategories = data;
        this.subcategories.map((subcategory) => {
          subcategory.color = 'f9c74f';
        });
        if (this.subcategories.length) {
          this.activeSubcategory = this.subcategories[0];
          this.getPictograms(this.activeSubcategory.subcategoryCarerId);
        }
        console.log(this.subcategories);
      });
  }

  getPictograms(subcategoryId: number): void {
    this.vitaapp
      .getAllPictogramsCarerBySubcategoryId(
        subcategoryId,
        'carer-' + this.carer.email
      )
      .subscribe((data) => {
        this.pictograms = data;
        console.log(this.pictograms);
      });
  }

  getCategoryById(): void {
    this.vitaapp.getCategoryCarerById(this.categoryId).subscribe((data) => {
      this.category = data;
      if (this.category.helperId) {
        this.helperId = this.category.helperId;
        this.getPictogramsHelper();
      }
    });
  }

  getPictogramsHelper(): void {
    this.vitaapp
      .getAllPictogramsByHelperId(this.helperId, 'carer-' + this.carer.email)
      .subscribe((data) => {
        this.pictogramsHelper = data;
        console.log(this.pictogramsHelper);
      });
  }

  addPictogramMessage(pictogram: any): void {
    this.pictogramsMessage.push(pictogram);
  }

  deleteLastPictogram(): void {
    this.pictogramsMessage.splice(this.pictogramsMessage.length - 1, 1);
  }

  deleteAllPictogram(): void {
    this.pictogramsMessage = [];
  }

  textToVoice(text: string): void {
    console.log('hola mundo');
    try {
      responsiveVoice.speak(text, 'Spanish Female');
    } catch (error) {}
  }

  sendMessage(): void {
    console.log(this.elderly);
    console.log(this.carer);
    this.firebase.sendMessage(
      this.carer.uid,
      this.elderly.username,
      this.pictogramsMessage,
      this.elderly
    );
    this.firebase.sendNotification(this.carer.uid, this.elderly);
  }

  getPositionAdminPanel(): void {
    this.vitaapp.getPositionAdminPanel().subscribe((data) => {
      if (data.length) {
        this.positionsPanel = data[0].positions.split('-');
      } else {
        this.positionsPanel = ['0', '1', '2', '3'];
      }
    });
  }
}
