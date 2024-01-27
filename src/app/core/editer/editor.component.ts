import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';

@Component({
  standalone: true,
  selector: 'app-editor',
  template: '<div #editor class="component"></div>',
  styles: ['::ng-deep.cm-editor {height: 100%}']
})
export class EditorComponent implements AfterViewInit {

  @ViewChild('editor')
  editor: ElementRef | undefined

  private view?: EditorView
  private compartment = new Compartment();

  ngAfterViewInit() {

    const state = EditorState.create({
      extensions: [
        basicSetup,
        this.compartment.of([]),
        EditorView.updateListener.of((e) => {
          switch(true) {
            case e.docChanged: 
              console.log(e)
          }
        })
      ]
    })

    this.view = new EditorView({
      state,
      parent: this.editor?.nativeElement
    })

  }

  dispatch() {
    this.view?.dispatch({
      effects: this.compartment.reconfigure(
        EditorView.theme({
          "&": { fontSize: "30px" }
        })
      )
    })
  }

}
