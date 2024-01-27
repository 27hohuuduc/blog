import { Component, HostBinding } from '@angular/core';
import { ApiService } from 'src/app/shared';

@Component({
  selector: 'app-overlay',
  standalone: true,
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',

})
export class OverlayComponent {

  @HostBinding('class.center') center: boolean = true;
  @HostBinding('class.hide') hide: boolean = true;

  msg: string | null = null

  constructor(private service: ApiService) {
    service.subject.subscribe(x => {
      this.hide = !x.state
      this.msg = x.msg
    })
  }
}
