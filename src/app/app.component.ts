import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Console, log } from 'console';
import { provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private http: HttpClient) { }

  title = 'Bandcamp Backlog Breaker';
  proxyUrl = "https://corsproxy.io/?";

  getUserWishlistData(): void {
    var input = (document.getElementById("Input") as HTMLInputElement).value;
    let wishlist: string = this.proxyUrl + "https://bandcamp.com/" + input + "/wishlist";

    var htmlContent: string;
    this.http.get(wishlist, { responseType: "text" }).subscribe({
      next: (response: string) => {
        htmlContent = response;
        this.getRandomWishlistItem(htmlContent);
      },
      error: (error) => {
        /* Hier soll das Eingabefeld einen Fehler anzeigen*/
        console.error('Fehler beim Abrufen:', error);
      },
      complete: () => {
        console.log('Anfrage abgeschlossen');
      }
    })
  }

    getRandomWishlistItem(htmlContent: string): void {
      console.log(htmlContent);
    }
  


}
