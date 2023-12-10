import { Component, OnInit } from '@angular/core';

export interface TextView {
  type: "text" | "media"
  content: TextView | string,
  style?: string
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public textview: TextView[][] = []
  public target: HTMLElement | undefined

  constructor() { }

  newLine(): void {
    this.textview.push([
      {
        type: "text",
        content: "asd"
      }
    ])
  }

  ngOnInit(): void {
    this.newLine()
  }

  onClick(event: MouseEvent) {
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        this.newLine()
        break
    }
  }
}
