import { Component } from '@angular/core';

export interface TextView {
  type: "text" | "media"
  content: TextView | string,
  style?: string
}

@Component({
  selector: 'app-editor',
  template: '<div id="editor"></div>',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  
}
