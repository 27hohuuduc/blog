import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommonService, HttpMethod } from 'src/app/service/common.service';
import { Router } from '@angular/router'

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (idConfiguration: {
            client_id: string;
            callback?: (credentialResponse: {
              credential: string;
              select_by:
              | "auto"
              | "user"
              | "user_1tap"
              | "user_2tap"
              | "btn"
              | "btn_confirm"
              | "btn_add_session"
              | "btn_confirm_add_session";
            }) => void;
          }) => void;
          disableAutoSelect: () => void;
          storeCredential: (credential?: string, callback?: () => void) => void;
          prompt: () => void;
          renderButton: (parent: HTMLElement | null, options: {
            type?: "standard" | "icon";
            theme?: "outline" | "filled_blue" | "filled_black";
            size?: "large" | "medium" | "small";
            text?: "signin_with" | "signup_with" | "continue_with" | "signin";
            shape?: "rectangular" | "pill" | "circle" | "square";
            logo_alignment?: "left" | "center";
            width?: number;
            locale?: string;
          }) => void;
        }
      }
    }
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document, private service: CommonService, private router: Router) {

  }

  ngOnInit(): void {
    let script = this._renderer2.createElement('script')
    script.src = "https://accounts.google.com/gsi/client"
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "651134861717-91lcugpve6hvdjsss23o6isck3kg8b0k.apps.googleusercontent.com",
        callback: (response) => {
          this.service.callApi<String>('api/auth', HttpMethod.POST, response.credential).subscribe((value) => {
            console.log(value)
          })
        }
      })

      window.google.accounts.id.renderButton(
        document.getElementById("google-login"),
        {
          type: "standard", shape: "pill", theme: "outline",
          text: "signin_with", size: "medium", logo_alignment: "center",
          width: 265
        }
      )

      window.google.accounts.id.prompt()

    }
    this._renderer2.appendChild(this._document.body, script)
  }

  public loginEnter(event: KeyboardEvent): void {
    if(event.key === "Enter") {
      this.router.navigateByUrl("/admin/dashboard")
    }
  }
}
