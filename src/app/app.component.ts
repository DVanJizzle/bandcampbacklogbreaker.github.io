import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Console, error, log } from 'console';
import { provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { match } from 'assert';
declare function ScrapeAlbums(url: string): void;


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private http: HttpClient) {
  }

  title = 'Bandcamp Backlog Breaker';
  proxyUrl = "https://corsproxy.io/?";

  async getUserWishlistData(): Promise<void> {
    var input = (document.getElementById("Input") as HTMLInputElement).value;
    let wishlist: string = this.proxyUrl + "https://bandcamp.com/" + input + "/wishlist";

    await ScrapeAlbums(wishlist);

    var htmlContent: string;
    this.http.get(wishlist, { responseType: "text", headers: {'Accept-Language': 'en-US'}  }).subscribe({
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
    /*console.log(htmlContent);*/
      const regexWishlistCount = /<li\s+data-tab="wishlist"[^>]*>\s*<span[^>]*>\s*[^<]*<span\s+class="count">(\d+)<\/span>\s*<\/span>\s*<\/li>/
;
      const wishlistSize = htmlContent.match(regexWishlistCount);
      if (wishlistSize && wishlistSize[1]) {
        console.log(wishlistSize[1]);
        let index: number = Math.floor(Math.random() * Number(wishlistSize[1]));
        console.log(index);
        if (index > 19) {
          let scrollAmount: number = index % 20;
        }

        let count: number = 0;
        let match;
        const regexWishlistEntry = /<a\s+target="_blank"\s+href="([^"]+)"\s+class="item-link">/g;

        while ((match = regexWishlistEntry.exec(htmlContent)) !== null) {
          if (count == index) {
            console.log(match[1]);
            break;
          }
          else {
            count++;
            console.log(match[1]);

          }
        }
      }
      else {
        /* Hier soll das Eingabefeld einen Fehler anzeigen*/
    }
  }
}
