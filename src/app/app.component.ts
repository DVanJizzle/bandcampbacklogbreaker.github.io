import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { json } from 'express';
import { error } from 'node:console';

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
        
    var htmlContent: string;
    var SizeAndId = new Array<string>(2);

    try
    {
      htmlContent = await fetch(wishlist).then(res => res.text());
      SizeAndId = this.getFanIdAndCount(htmlContent);
    }
    catch
    {

    }

    await this.requestWishlistItems(SizeAndId);

  }

  getFanIdAndCount(htmlContent: string): string[]
  {
    let result = new Array<string>(2);

    const regexWishlistCount = /<li\s+data-tab="wishlist"[^>]*>\s*<span[^>]*>\s*[^<]*<span\s+class="count">(\d+)<\/span>\s*<\/span>\s*<\/li>/
    let wishlistSize = htmlContent.match(regexWishlistCount);
    if (wishlistSize && wishlistSize[1]) {
      result[0] = Math.min(Number(wishlistSize[1]),20).toString();
    }
    else {throw new Error("Wishlist size not found");}

    const regexFanId = /fan_id&quot;:(\d+)/
    let fanId = htmlContent.match(regexFanId);
    if (fanId && fanId[1]) {
      result[1] = fanId[1];
    }
    else {throw new Error ("Fan-Id not found") }

    return result;
  }

  async requestWishlistItems(SizeAndId: string[]): Promise<string[]> {

    console.log(SizeAndId[0]);
    console.log(SizeAndId[1]);

    let url: string = this.proxyUrl + "https://bandcamp.com/api/fancollection/1/wishlist_items";
    let response = await fetch(url,
      {
        method: "POST",
        headers: {
        },
        
        body: JSON.stringify({
          "count": SizeAndId[0],
          "fan_id": SizeAndId[1],
          "older_than_token": "9999999999:9999999999:a::"
        })
      }).then(res => res.json())

    let albumLinks = [];
    for (let item in response.items) {
      let album = response.items[item];
      albumLinks.push(album.item_url);
    }

    return albumLinks;
  }

  //getRandomWishlistItem(htmlContent: string): void {
  //  /*console.log(htmlContent);*/
  //    ;
  //  if (wishlistSize && wishlistSize[1]) {
  //    console.log(wishlistSize[1]);
  //    let index: number = Math.floor(Math.random() * Number(wishlistSize[1]));
  //    console.log(index);
  //    if (index > 19) {
  //      let scrollAmount: number = index % 20;
  //    }

  //    let count: number = 0;
  //    let match;
  //    const regexWishlistEntry = /<a\s+target="_blank"\s+href="([^"]+)"\s+class="item-link">/g;

  //    while ((match = regexWishlistEntry.exec(htmlContent)) !== null) {
  //      if (count == index) {
  //        console.log(match[1]);
  //        break;
  //      }
  //      else {
  //        count++;
  //        console.log(match[1]);

  //      }
  //    }
  //  }
  //  else {
  //    /* Hier soll das Eingabefeld einen Fehler anzeigen*/
  //  }
  //}

}
