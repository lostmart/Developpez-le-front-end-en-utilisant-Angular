import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  imports: [CommonModule]
  
})
export class NotFoundComponent  {

  linkText = 'Go Home';

  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }

}
