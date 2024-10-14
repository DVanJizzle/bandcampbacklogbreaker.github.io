import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http: HttpClient) {
  }

  title = 'Bandcamp Backlog Breaker';
  proxyUrl = "https://corsproxy.io/?";
  errorMessage: boolean = false;
  labelText = "Something went wrong. We likely couldn't find your account."

  async getUserWishlistData(): Promise<void> {
    this.errorMessage = false;

    var input = (document.getElementById("Input") as HTMLInputElement).value;
    let wishlist: string = this.proxyUrl + "https://bandcamp.com/" + input + "/wishlist";
        
    var htmlContent: string;
    var SizeAndId = new Array<string>(2);

    try
    {
      htmlContent = await fetch(wishlist).then(res => res.text());
      SizeAndId = this.getFanIdAndCount(htmlContent);
      let albumLinks = await this.requestWishlistItems(SizeAndId);
      const finalLink = this.getRandomWishlistItem(albumLinks, SizeAndId[0]);
      window.open(finalLink);
    }
    catch
    {
      this.errorMessage = true;
    }


  }

  getFanIdAndCount(htmlContent: string): string[]
  {
    let result = new Array<string>(2);

    const regexWishlistCount = /<li\s+data-tab="wishlist"[^>]*>\s*<span[^>]*>\s*[^<]*<span\s+class="count">(\d+)<\/span>\s*<\/span>\s*<\/li>/
    let wishlistSize = htmlContent.match(regexWishlistCount);
    if (wishlistSize && wishlistSize[1]) {
      result[0] = Math.min(Number(wishlistSize[1]),500).toString();
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

  getRandomWishlistItem(albumlinks: string[], size: string): string {
        
      let winner: number = Math.floor(Math.random() * Number(size));
    return albumlinks[winner];
      
  }

}
