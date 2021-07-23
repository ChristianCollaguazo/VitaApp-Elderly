import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vitaapp-web-elderly-ucuenca';
  constructor(private swUpdate: SwUpdate) {}
  ngOnInit(): void {
    this.updatePWA();
  }
  updatePWA() {
    this.swUpdate.available.subscribe((value) => {
      console.log('update', value);
      window.location.reload();
    });
  }
}
