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
  errorMessage: boolean = true;
  labelText = ""
  isRunning = false

  async getUserWishlistData(): Promise<void> {
    if (this.isRunning)
    {
      return;
    }

    this.isRunning = true;

    let winnerMethodRunning: number = Math.floor(Math.random() * this.methodRunningPhrases.length);
    this.labelText = this.methodRunningPhrases[winnerMethodRunning]//"Spin the wheel!" 

    var input = (document.getElementById("Input") as HTMLInputElement).value;
    if (input === "")
    {
      this.labelText = "Something went wrong. You can find your Bandcamp name in the link of your profile page."
      this.isRunning = false;
      return;
    }
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
      let winnerPhrase: number = Math.floor(Math.random() * this.successPhrases.length);
      this.labelText = this.successPhrases[winnerPhrase] //"It could be worse, I guess..."
      this.isRunning = false;
    }
    catch
    {
      this.labelText = "Something went wrong. You can find your Bandcamp name in the link of your profile page."
      this.isRunning = false;
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

  methodRunningPhrases = [
    "Spin the wheel!",
    "TGIBF",
    "This is what I'll spend my wife's boyfriend's allowance on.",
    "Here comes the music.",
    "Warming up the vocal chords.",
    "It's not gambling, if you always win.",
    "Stringing the bass.",
    "Reassembling the orchestra.",
    "This is the one, I can feel it.",
    "*Plays Epic drum fill*",
    "That's some wild stuff you got on here 👀",
    "So you like music? Name every song.",
    "Can you feel the excitement!",
    "Looking for that one album you forgot you put on your wishlist.",
    "Country roads...",
    "Today's avant-garde is tomorrow's 'ahead of their time'.",
    "And Roll.",
    "Getting ready to name three songs.",
    "There's no way out now.",
    "Please don't push the button so hard, he's a bit touchy.",
    "Don't you wanna invite me for dinner before you touch me like that?",
    "Uniting the swifties for a crusade.",
    "Checking if they got cancelled.",
    "Push me again, I dare you.",
    "Recalibrating the snarky remark matrix.",
    "Pretending like this does something.",
    "Googling the difference between a violin and cello.",
    "Stealing your credit card info.",
    "Rummaging through the backlog.",
    "Dusting of the ol' trumpet.",
    "Oiling up the saxophone.",
    "Practicing solos.",
    "Finding a way to recommend Vector to you.",
    "You get an album, and you get an album AND YOU GET AN ALBUM.",
    "It always pays to shoot your shot.",
    "Acting like any of this is actually random.",
    "Sneakily adding items to your wishlist.",
    "Stealthily removing stuff from your wishlist.",
    "Judging your taste.",
    "Coming up with clever insults for your favorite genre.",
    "Hippin' n' hoppin'.",
    "*Cracks fingers*",
    "Firing up the keyboard.",
    "Fingering the piano.",
    "Ascertaining the worst possible thing to recommend.",
    "Let your fate take the reins.",
    "Turning the wall of death into a wall of life.",
    "Pressing that button is the pesto to my spaghetti code.",
    "Deflecting ethical concerns.",
    "So, you want something, huh? What's in it for me?",
    "~Musing~",
    "Reflecting on a better time in my life.",
    "What do you call the upper echelon of the underground? Souterrain?",
    "Pretending like I care about that video you took at the concert.",
    "By pushing that button you have agreed to participate in an invasion of France under my command."
  ]

  successPhrases = [
    "It could be worse, I guess...",
    "Maybe you should use that money to pay your rent...",
    "Album of the century right here!",
    "We should boycott solo artists, it's called BANDcamp after all.",
    "I sincerely hope that's free jazz.",
    "I'm more of a technical dissonant avant-garde jazz-infused Scandinavian black metal type of guy, but you do you.",
    "People actually listen to this?",
    "It's only pop music if it's popular.",
    "Poser.",
    "I listened to them before they became popular.",
    "Sellouts.",
    "They're just jamming, right?",
    "If you like their music, write them a nice comment.",
    "I'd go straight for the LP.",
    "Thank you, thank you! You're the greatest audience tonight!",
    "Classyyy",
    "That's a real bop.",
    "Music went downhill after the Beatles anyway.",
    "I'm feeling a light 0.",
    "10/10",
    "Your wishlist is like a sewer: What you get out of it depends on what you put into it.",
    "I mean, you put that on your wishlist.",
    "That's the best I could find.",
    "Someone's got taste!",
    "They just don't make music like they used to.",
    "Maybe you should check out Soundcloud.",
    "A hidden gem.",
    "Well, look what the dog dragged in.",
    "Mid.",
    "Dolly did it better.",
    "It's not wasting money, it's an investment in your mental health.",
    "At least they've got potential.",
    "Your child's going hungry for THIS?",
    "I'd be disappointed too.",
    "Is that a TikTok trend?",
    "Profile→Settings→Fan→Scroll down→Termination",
    "I thought they split up after the lead guitarist slept with the vocalist's wife.",
    "At least it's music.",
    "This is being slept on like a fluffy pillow.",
    "Let's just call it alternative 'music'.",
    "Criminally underrated.",
    "Muh sweet merch.",
    "Music is like a drug, but I can tell the kids it's cool.",
    "Slay.",
    "Cringe.",
    "Edgy.",
    "I just stole your credit card info.",
    "That artwork is killer.",
    "Killer tune.",
    "CaSsEtTeS aRe So ReTrO.",
    "Accustically challenged.",
    "You brought this upon yourself.",
    "Well, well, well, if it isn't the consequences of my own actions.",
    "Oh woe...",
    "I'm like a DJ but read backwards.",
    "*Slaps knee* Welp, I'mma head out.",
    "THE ORACLE HATH SPOKEN!!!",
    "Back in my day, we used to beat people up for listening to this stuff.",
    "I saw them live with that other band last year in March.",
    "No takesies backsies.",
    "Problematic.",
    "There's so much great music all around the world (even France).",
    "Like a fire in Vermont: A Barnburner.",
    "Backlog 'Bangers Only' Breaker.",
    "That was just a test spin, right?",
    "AGAIN!",
    "If you close the tab right now, I won't tell a soul about this."
  ]
}
