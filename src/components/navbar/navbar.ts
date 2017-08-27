import { Component } from '@angular/core';


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
