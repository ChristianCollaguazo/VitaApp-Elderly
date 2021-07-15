import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import {
  Category,
  CategoryCarer,
} from 'src/app/controller/interfaces/category.interface';
import { Elderly } from 'src/app/controller/interfaces/elderly.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';

declare var responsiveVoice;

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss'],
})
export class ViewCategoriesComponent implements OnInit {
  elderly: Elderly;
  carer: Carer;
  categoriesCarer: CategoryCarer[] = [];

  constructor(
    private vitaapp: VitaappService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getElderly();
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
      this.getCategories();
    });
  }

  getCategories(): void {
    this.vitaapp
      .getCategoriesElderly(this.elderly.elderlyId)
      .subscribe((data) => {
        this.categoriesCarer = data;
        console.log(this.categoriesCarer);
      });
  }

  openBoard(categoryCarerId: number, text: string) {
    try {
      responsiveVoice.speak(text, 'Spanish Female');
    } catch (error) {}

    this.router.navigate(['tablero', categoryCarerId]);
  }

  textToVoice(text: string): void {
    console.log('hola mundo');

    responsiveVoice.speak(text, 'Spanish Female');
  }

  logout(): void {
    this.auth.logOut();
  }
}
