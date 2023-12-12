import { AfterViewInit, Component, ElementRef, HostListener, Injectable, Injector, Input, OnInit } from '@angular/core';
import { TextView } from '../editor.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-line',
  imports: [CommonModule],
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  host: {
    "tabindex": "-1"
  }
})
export class LineComponent implements AfterViewInit {
  component = CharacterComponent

  @Input({ required: true }) input!: TextView[]

  constructor(private ref: ElementRef) { }

  ngAfterViewInit(): void {
    (this.ref.nativeElement as HTMLElement).focus()
  }

  @HostListener("keydown", ['$event'])
  onKeyDown(e: KeyboardEvent) {
  }

  @HostListener("click", ['$event'])
  onClick(e: MouseEvent) {
  }

  createInject(value: TextView): Injector {
    return Injector.create({providers: [{provide: TextViewInject, useValue: value}]})
  }
}

@Injectable()
class TextViewInject implements TextView {
  type!: 'text' | 'media';
  content!: string;
  style!: string | undefined;
}

@Component({
  standalone: true,
  imports: [NgFor],
  template: `<span tabindex="-1" *ngFor="let char of text">{{char}}</span>`,
  host: {
    "tabIndex": "-1",
    "class": "char"
  }
})
export class CharacterComponent implements OnInit {
  
  // @Input({required: true, transform: (value: string) => value.split("")})
  // input!: string[]

  // @Output()
  // textChange = new EventEmitter<String>()

  // @Output()
  // clicked = new EventEmitter<{ x: number, y: number }>()

  text!: string[]

  constructor(private ref: ElementRef, public value: TextViewInject) { 
    this.text = value.content.split("")
  }

  ngOnInit(): void {
  }

  @HostListener("keydown", ['$event'])
  onKeyDown(e: KeyboardEvent) {
    console.log(this.value)
  }

  @HostListener("click", ['$event'])
  onClick(e: MouseEvent) {
    console.log(e)
  }
}
