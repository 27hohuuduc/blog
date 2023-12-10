import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-svg.component.html',
  styles: [':host { display: flex; align-items: center }']
})
export class IconSvgComponent {

}
