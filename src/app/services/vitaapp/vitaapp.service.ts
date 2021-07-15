import { PictogramHelperCarer } from './../../controller/interfaces/pictogram.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Carer } from 'src/app/controller/interfaces/carer.interface';
import { map } from 'rxjs/operators';
import {
  Elderly,
  ElderlyCategory,
} from 'src/app/controller/interfaces/elderly.interface';
import {
  Category,
  CategoryCarer,
} from 'src/app/controller/interfaces/category.interface';
import { SubcategoryCarer } from 'src/app/controller/interfaces/subcategory.interface';
import { PictogramCarer } from 'src/app/controller/interfaces/pictogram.interface';
import { Helper } from 'src/app/controller/interfaces/helper.irterface';

@Injectable({
  providedIn: 'root',
})
export class VitaappService {
  // BASE_URL = 'http://localhost:8080/vitaapp/api/v1';
  BASE_URL = 'https://vitaappucuenca.herokuapp.com/vitaapp/api/v1';
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  carerInformation: Carer;
  elderlyInformation: Elderly;

  colors = [];

  constructor(private http: HttpClient) {}

  concatURL(subURL: string): string {
    return this.BASE_URL + subURL;
  }

  makePostRequest(
    URL: string,
    data: any,
    headers = this.httpOptions
  ): Observable<any> {
    return this.http.post(URL, data, headers);
  }

  makeGetRequest(URL: string, headers = this.httpOptions): Observable<any> {
    return this.http.get(URL, headers);
  }

  makeDelRequest(URL: string, headers = this.httpOptions): Observable<any> {
    return this.http.delete(URL, headers);
  }

  makePutRequest(
    URL: string,
    data: any,
    headers = this.httpOptions
  ): Observable<any> {
    return this.http.put(URL, data, headers);
  }

  // *-------------------------Login Servicios------------------------
  registerCarer(carer: Carer): Observable<any> {
    const PATH = this.concatURL(`/carer/register`);
    return this.makePostRequest(PATH, carer);
  }

  loginCarer(auth: Auth): Observable<any> {
    const PATH = this.concatURL(`/carer/auth`);
    return this.makePostRequest(PATH, auth);
  }

  loginElderly(auth: Auth): Observable<any> {
    const PATH = this.concatURL(`/elderly/auth`);
    return this.makePostRequest(PATH, auth);
  }

  // *-------------------------Informacion Usuario------------------------
  validToken(): Observable<any> {
    const PATH = this.concatURL(`/any/valid`);
    return this.makeGetRequest(PATH);
  }

  carerData(): Observable<any> {
    const PATH = this.concatURL(`/carer/me`);
    if (!this.carerInformation) {
      return this.makeGetRequest(PATH).pipe(
        map((resp: Carer) => {
          this.carerInformation = resp;
          return resp;
        })
      );
    } else {
      return of(this.carerInformation);
    }
  }

  carerDataById(carerId: number): Observable<any> {
    const PATH = this.concatURL(`/carer/${carerId}`);
    if (!this.carerInformation) {
      return this.makeGetRequest(PATH).pipe(
        map((resp: Carer) => {
          this.carerInformation = resp;
          return resp;
        })
      );
    } else {
      return of(this.carerInformation);
    }
  }

  elderlyData(): Observable<any> {
    const PATH = this.concatURL(`/elderly/me`);
    if (!this.elderlyInformation) {
      return this.makeGetRequest(PATH).pipe(
        map((resp: Elderly) => {
          this.elderlyInformation = resp;
          return resp;
        })
      );
    } else {
      return of(this.elderlyInformation);
    }
  }

  // *-------------------------Adulto Mayor------------------------

  saveElderly(elderly: Elderly): Observable<any> {
    const PATH = this.concatURL(`/elderly/register`);
    return this.makePostRequest(PATH, elderly);
  }

  getAllElderlies(carerId: number): Observable<any> {
    const PATH = this.concatURL(`/elderly/carer/${carerId}`);
    return this.makeGetRequest(PATH);
  }

  getCategoriesElderly(elderlyId: number): Observable<any> {
    const PATH = this.concatURL(
      `/carer/elderly-category/categories/elderly/${elderlyId}`
    );
    return this.makeGetRequest(PATH);
  }

  saveElderlyCategory(
    elderlyId: number,
    elderlyCategories: ElderlyCategory[]
  ): Observable<any> {
    const PATH = this.concatURL(`/carer/elderly-category/list/${elderlyId}`);
    return this.makePostRequest(PATH, elderlyCategories);
  }

  // * -------------------Servicios de Colores-------------------
  getColor(): Observable<any> {
    const PATH = this.concatURL(`/color/any/all`);
    if (this.colors) {
      return this.makeGetRequest(PATH).pipe(
        map((resp) => {
          this.colors = resp;
          return resp;
        })
      );
    } else {
      return of(this.colors);
    }
  }

  // *------------------------Categorias-----------------------------

  getAllCategories(): Observable<any> {
    const PATH = this.concatURL(`/category/any/all`);
    return this.makeGetRequest(PATH);
  }

  getCategoryById(id: number): Observable<any> {
    const PATH = this.concatURL(`/category/any/${id}`);
    return this.makeGetRequest(PATH);
  }

  getCategoryCarerById(id: number): Observable<any> {
    const PATH = this.concatURL(`/carer/category/${id}`);
    return this.makeGetRequest(PATH);
  }

  saveListCategories(categories: CategoryCarer[]): Observable<any> {
    const PATH = this.concatURL(`/carer/category/add/list`);
    return this.makePostRequest(PATH, categories);
  }

  getAllCategoriesCarer(carerId: number): Observable<any> {
    const PATH = this.concatURL(`/carer/category/by_carer/${carerId}`);
    return this.makeGetRequest(PATH);
  }

  editCategoryCarer(categoryCarer: CategoryCarer): Observable<any> {
    const PATH = this.concatURL(
      `/carer/category/${categoryCarer.categoryCarerId}`
    );
    return this.makePutRequest(PATH, categoryCarer);
  }

  getImagesCategory(categoryId: number): Observable<any> {
    const PATH = this.concatURL(`/image/any/category/${categoryId}`);
    return this.makeGetRequest(PATH);
  }

  // *------------------------Subcategorias-----------------------------

  getAllSubcategories(): Observable<any> {
    const PATH = this.concatURL(`/subcategory/any/all`);
    return this.makeGetRequest(PATH);
  }

  saveListSubcategories(subcategories: SubcategoryCarer[]): Observable<any> {
    const PATH = this.concatURL(`/carer/subcategory/add/list`);
    return this.makePostRequest(PATH, subcategories);
  }

  getAllSubcategoriesByCategoryId(categoryId: number): Observable<any> {
    const PATH = this.concatURL(`/subcategory/any/category/${categoryId}`);
    return this.makeGetRequest(PATH);
  }

  getAllSubcategoriesCarerByCategoryId(
    categoryId: number,
    email: string
  ): Observable<any> {
    const PATH = this.concatURL(
      `/carer/subcategory/category/${categoryId}?email=${email}`
    );
    return this.makeGetRequest(PATH);
  }

  getSubcategoryCarerById(id: number): Observable<any> {
    const PATH = this.concatURL(`/carer/subcategory/${id}`);
    return this.makeGetRequest(PATH);
  }

  getImagesSubcategory(subcategoryId: number): Observable<any> {
    const PATH = this.concatURL(`/image/any/subcategory/${subcategoryId}`);
    return this.makeGetRequest(PATH);
  }

  editSubcategoryCarer(subcategoryCarer: SubcategoryCarer): Observable<any> {
    const PATH = this.concatURL(
      `/carer/subcategory/${subcategoryCarer.subcategoryCarerId}`
    );
    return this.makePutRequest(PATH, subcategoryCarer);
  }

  // *------------------------Pictogramas-----------------------------

  getAllPictogramsCarerBySubcategoryId(
    subcategoryId: number,
    email: String
  ): Observable<any> {
    const PATH = this.concatURL(
      `/carer/pictogram/subcategory/${subcategoryId}?email=${email}`
    );
    return this.makeGetRequest(PATH);
  }

  getAllPictogramsBySubcategoryId(subcategoryId: number): Observable<any> {
    const PATH = this.concatURL(`/pictogram/any/subcategory/${subcategoryId}`);
    return this.makeGetRequest(PATH);
  }

  saveListPictograms(pictograms: PictogramCarer[]): Observable<any> {
    const PATH = this.concatURL(`/carer/pictogram/add/list`);
    return this.makePostRequest(PATH, pictograms);
  }

  getImagesPictogram(pictogramId: number): Observable<any> {
    const PATH = this.concatURL(`/image/any/pictogram/${pictogramId}`);
    return this.makeGetRequest(PATH);
  }

  editPictogramCarer(pictogramCarer: PictogramCarer): Observable<any> {
    const PATH = this.concatURL(
      `/carer/pictogram/${pictogramCarer.pictogramCarerId}`
    );
    return this.makePutRequest(PATH, pictogramCarer);
  }

  editPositionPictogram(pictogramsCarer: PictogramCarer[]): Observable<any> {
    const PATH = this.concatURL(`/carer/pictogram/update-position`);
    return this.makePutRequest(PATH, pictogramsCarer);
  }

  // *------------------------Pictogramas Ayuda-----------------------------

  getAllPictogramsByHelperId(helperId: number, email: string): Observable<any> {
    const PATH = this.concatURL(
      `/carer/pictogram-helper/helper/${helperId}?email=${email}`
    );
    return this.makeGetRequest(PATH);
  }

  saveListPictogramsHelper(
    pictograms: PictogramHelperCarer[]
  ): Observable<any> {
    const PATH = this.concatURL(`/carer/pictogram-helper/add/list`);
    return this.makePostRequest(PATH, pictograms);
  }

  // *------------------------Ayudas-----------------------------

  saveHelper(helper: Helper): Observable<any> {
    const PATH = this.concatURL(`/carer/helper/add`);
    return this.makePostRequest(PATH, helper);
  }

  editHelper(helper: Helper): Observable<any> {
    const PATH = this.concatURL(`/carer/helper/${helper.helperId}`);
    return this.makePutRequest(PATH, helper);
  }

  getAllPictogramsHelper(): Observable<any> {
    const PATH = this.concatURL(`/pictogram-help/any/all`);
    return this.makeGetRequest(PATH);
  }

  getHelpersByCarerId(carerId: number): Observable<any> {
    const PATH = this.concatURL(`/carer/helper/by-carer/${carerId}`);
    return this.makeGetRequest(PATH);
  }

  editPositionPictogramHelper(
    pictogramsHelper: PictogramHelperCarer[]
  ): Observable<any> {
    const PATH = this.concatURL(`/carer/pictogram-helper/update-position`);
    return this.makePutRequest(PATH, pictogramsHelper);
  }

  getImagesPictogramsHelp(helperId: number): Observable<any> {
    const PATH = this.concatURL(`/image/any/pictogram-help/${helperId}`);
    return this.makeGetRequest(PATH);
  }

  editPictogramCarerHelper(pictogram: PictogramHelperCarer): Observable<any> {
    const PATH = this.concatURL(
      `/carer/pictogram-helper/${pictogram.pictogramCarerId}`
    );
    return this.makePutRequest(PATH, pictogram);
  }

  reloadData() {
    this.carerInformation = undefined;
    this.elderlyInformation = undefined;
  }
}
