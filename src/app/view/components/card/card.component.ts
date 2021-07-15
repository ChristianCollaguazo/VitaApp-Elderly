import { Subcategory } from './../../../controller/interfaces/subcategory.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pictogram } from 'src/app/controller/interfaces/pictogram.interface';
import { Category } from 'src/app/controller/interfaces/category.interface';
import { Helper } from 'src/app/controller/interfaces/helper.irterface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() category: Category;
  @Input() categoryView: Category;
  @Input() subcategoryView: Subcategory;
  @Input() helper: Helper;
  @Input() pictogramView: Pictogram;
  @Input() subcategory: Subcategory;
  @Input() pictogram: Pictogram;
  @Input() showClose: boolean = false;
  @Output() clickEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickDelete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickContent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  clickedDelete(): void {
    this.clickDelete.emit(true);
  }

  clickedEdit(): void {
    this.clickEdit.emit(true);
  }

  clickedContent(): void {
    this.clickContent.emit(true);
  }
}
