import './polyfills.server.mjs';
import{A as S,B as A,C as _,F as O,L as B,a as p,b as g,c as d,d as f,e as y,f as a,g as r,h,i as w,j as b,k as l,l as k,m as C,r as v,u as x,w as I,x as P,y as M,z as T}from"./chunk-YIUSTMLR.mjs";import{h as u}from"./chunk-5XUXGTUW.mjs";function F(m,t){if(m&1&&(a(0,"div")(1,"label"),l(2),r()()),m&2){let e=b();g(2),k(e.labelText)}}var c=class m{constructor(t){this.http=t}title="Bandcamp Backlog Breaker";proxyUrl="https://corsproxy.io/?";errorMessage=!0;labelText="";isRunning=!1;getUserWishlistData(){return u(this,null,function*(){if(this.isRunning)return;this.isRunning=!0;let t=Math.floor(Math.random()*this.methodRunningPhrases.length);this.labelText=this.methodRunningPhrases[t];var e=document.getElementById("Input").value;if(e===""){this.labelText="Something went wrong. You can find your Bandcamp name in the link of your profile page.",this.isRunning=!1;return}let n=this.proxyUrl+"https://bandcamp.com/"+e+"/wishlist";var i,o=new Array(2);try{i=yield fetch(n).then(N=>N.text()),o=this.getFanIdAndCount(i);let s=yield this.requestWishlistItems(o),W=this.getRandomWishlistItem(s,o[0]);window.open(W);let H=Math.floor(Math.random()*this.successPhrases.length);this.labelText=this.successPhrases[H],this.isRunning=!1}catch{this.labelText="Something went wrong. You can find your Bandcamp name in the link of your profile page.",this.isRunning=!1}})}getFanIdAndCount(t){let e=new Array(2),n=/<li\s+data-tab="wishlist"[^>]*>\s*<span[^>]*>\s*[^<]*<span\s+class="count">(\d+)<\/span>\s*<\/span>\s*<\/li>/,i=t.match(n);if(i&&i[1])e[0]=Math.min(Number(i[1]),500).toString();else throw new Error("Wishlist size not found");let o=/fan_id&quot;:(\d+)/,s=t.match(o);if(s&&s[1])e[1]=s[1];else throw new Error("Fan-Id not found");return e}requestWishlistItems(t){return u(this,null,function*(){console.log(t[0]),console.log(t[1]);let e=this.proxyUrl+"https://bandcamp.com/api/fancollection/1/wishlist_items",n=yield fetch(e,{method:"POST",headers:{},body:JSON.stringify({count:t[0],fan_id:t[1],older_than_token:"9999999999:9999999999:a::"})}).then(o=>o.json()),i=[];for(let o in n.items){let s=n.items[o];i.push(s.item_url)}return i})}getRandomWishlistItem(t,e){let n=Math.floor(Math.random()*Number(e));return t[n]}methodRunningPhrases=["Spin the wheel!","TGIBF","This is what I'll spend my wife's boyfriend's allowance on.","Here comes the music.","Warming up the vocal chords.","It's not gambling, if you always win.","Stringing the bass.","Reassembling the orchestra.","This is the one, I can feel it.","*Plays Epic drum fill*","That's some wild stuff you got on here \u{1F440}","So you like music? Name every song.","Can you feel the excitement!","Looking for that one album you forgot you put on your wishlist.","Country roads...","Today's avant-garde is tomorrow's 'ahead of their time'.","And Roll.","Getting ready to name three songs.","There's no way out now.","Please don't push the button so hard, he's a bit touchy.","Don't you wanna invite me for dinner before you touch me like that?","Uniting the swifties for a crusade.","Checking if they got cancelled.","Push me again, I dare you.","Recalibrating the snarky remark matrix.","Pretending like this does something.","Googling the difference between a violin and cello.","Stealing your credit card info.","Rummaging through the backlog.","Dusting of the ol' trumpet.","Oiling up the saxophone.","Practicing solos.","Finding a way to recommend Vector to you.","You get an album, and you get an album AND YOU GET AN ALBUM.","It always pays to shoot your shot.","Acting like any of this is actually random.","Sneakily adding items to your wishlist.","Stealthily removing stuff from your wishlist.","Judging your taste.","Coming up with clever insults for your favorite genre.","Hippin' n' hoppin'.","*Cracks fingers*","Firing up the keyboard.","Fingering the piano.","Ascertaining the worst possible thing to recommend.","Let your fate take the reins.","Turning the wall of death into a wall of life.","Pressing that button is the pesto to my spaghetti code.","Deflecting ethical concerns.","So, you want something, huh? What's in it for me?","~Musing~","Reflecting on a better time in my life.","What do you call the upper echelon of the underground? Souterrain?","Pretending like I care about that video you took at the concert.","By pushing that button you have agreed to participate in an invasion of France under my command."];successPhrases=["It could be worse, I guess...","Maybe you should use that money to pay your rent...","Album of the century right here!","We should boycott solo artists, it's called BANDcamp after all.","I sincerely hope that's free jazz.","I'm more of a technical dissonant avant-garde jazz-infused Scandinavian black metal type of guy, but you do you.","People actually listen to this?","It's only pop music if it's popular.","Poser.","I listened to them before they became popular.","Sellouts.","They're just jamming, right?","If you like their music, write them a nice comment.","I'd go straight for the LP.","Thank you, thank you! You're the greatest audience tonight!","Classyyy","That's a real bop.","Music went downhill after the Beatles anyway.","I'm feeling a light 0.","10/10","Your wishlist is like a sewer: What you get out of it depends on what you put into it.","I mean, you put that on your wishlist.","That's the best I could find.","Someone's got taste!","They just don't make music like they used to.","Maybe you should check out Soundcloud.","A hidden gem.","Well, look what the dog dragged in.","Mid.","Dolly did it better.","It's not wasting money, it's an investment in your mental health.","At least they've got potential.","Your child's going hungry for THIS?","I'd be disappointed too.","Is that a TikTok trend?","Profile\u2192Settings\u2192Fan\u2192Scroll down\u2192Termination","I thought they split up after the lead guitarist slept with the vocalist's wife.","At least it's music.","This is being slept on like a fluffy pillow.","Let's just call it alternative 'music'.","Criminally underrated.","Muh sweet merch.","Music is like a drug, but I can tell the kids it's cool.","Slay.","Cringe.","Edgy.","I just stole your credit card info.","That artwork is killer.","Killer tune.","CaSsEtTeS aRe So ReTrO.","Accustically challenged.","You brought this upon yourself.","Well, well, well, if it isn't the consequences of my own actions.","Oh woe...","I'm like a DJ but read backwards.","*Slaps knee* Welp, I'mma head out.","THE ORACLE HATH SPOKEN!!!","Back in my day, we used to beat people up for listening to this stuff.","I saw them live with that other band last year in March.","No takesies backsies.","Problematic.","There's so much great music all around the world (even France).","Like a fire in Vermont: A Barnburner.","Backlog 'Bangers Only' Breaker.","That was just a test spin, right?","AGAIN!","If you close the tab right now, I won't tell a soul about this."];static \u0275fac=function(e){return new(e||m)(d(M))};static \u0275cmp=p({type:m,selectors:[["app-root"]],standalone:!0,features:[C],decls:20,vars:1,consts:[[1,"main"],["name","InputField","type","text","placeholder","Your Bandcamp name...","id","Input"],["type","button",3,"click"],[4,"ngIf"],[1,"mainP"],[1,"shamelessPlug"],["href","https://bandcamp.com/thedizzlingone"],["src","https://upload.wikimedia.org/wikipedia/commons/1/1b/BandcampLogo_x320.png",1,"bc"],["href","https://www.youtube.com/@jvandizzle9014"],["src","https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",1,"yt"],[1,"smoll"]],template:function(e,n){e&1&&(a(0,"main",0)(1,"div")(2,"h1"),l(3,"Bandcamp Backlog Breaker"),r(),h(4,"input",1),a(5,"button",2),w("click",function(){return n.getUserWishlistData()}),l(6,"Let's rock"),r(),f(7,F,3,1,"div",3),a(8,"p",4),l(9," Got too much good music on your Watchlist and you don't know where to start? "),r(),a(10,"p",4),l(11," Let the Bandcamp Backlog Breaker decide which band you should support next! "),r()()(),a(12,"footer")(13,"p",5)(14,"a",6),h(15,"img",7),r(),a(16,"a",8),h(17,"img",9),r()(),a(18,"p",10),l(19," Note: The author of this site is not affiliated with Bandcamp. Contact: jvandizzle36@gmail.com "),r()()),e&2&&(g(7),y("ngIf",n.errorMessage))},dependencies:[P,I],styles:[`h1[_ngcontent-%COMP%] {
    font-size: 5.5rem;
    color: var(--gray-900);
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.125rem;
    margin: 0;
    font: "Helvetica Neue";
    font-family: Arial, Helvetica, sans-serif;
  }

  p[_ngcontent-%COMP%] {
    font-size: 3.25rem;
    color: var(--gray-900);
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.05rem;
    max-inline-size: 65rem;
    font: "Helvetica Neue";
    font-family: Arial, Helvetica, sans-serif;
  }

  .mainP[_ngcontent-%COMP%] {
    margin: 0.5rem 0 1rem 0;
  }

  .smoll[_ngcontent-%COMP%] {
    font-size: 1rem;
    letter-spacing: 0;
    position: relative;
    margin-left:1rem;
    bottom:0.5rem;
  }

  .shamelessPlug[_ngcontent-%COMP%] {
    font-size: 1.3rem;
    letter-spacing: 0;
    position: relative;
    margin-left: 1rem;
    text-align: left;
    top: -0.5rem;
  }

  main[_ngcontent-%COMP%] {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: inherit;
    min-height: 50px;
    margin-top: 4rem;
    margin-bottom: 1rem;
  }

  body[_ngcontent-%COMP%] {
    height: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  input[type = text][_ngcontent-%COMP%] {
    width: 100%;
    background-color: lightgrey;
    color: black;
    margin: 1rem 0 4px 0;
    border: solid;
    border-color: #1da0c3;
    outline-color: #1da0c3;
    height: 1.75rem;
  }

  input[_ngcontent-%COMP%]::placeholder {
    font-size: 1.2rem;
  }

  button[type = button][_ngcontent-%COMP%] {
    background-color: #1da0c3;
    border-color: black;
    border-width: 3px;
    outline-color: #1da0c3;
    margin: 0 0 0.75rem 0;
    max-width: 35rem;
    color: white;
    cursor: pointer;
    width: 7rem;
    height: 2rem;
    font-size: 1.15rem;
  }

  label[_ngcontent-%COMP%]{
    color: red;
    font-size: 1.25rem;
  }

  


















  footer[_ngcontent-%COMP%] {
    position: relative;
    margin-left: -1rem;
    margin-right: -0.5rem;
    overflow: hidden;
    background-color: #1DA0C3CC;
    height: 80px;
    bottom: -3.4rem;
  }

  label[_ngcontent-%COMP%]{
    display: inline-block;
    height: 1.1rem;
  }

  img.yt[_ngcontent-%COMP%]{
    height: 3%;
    width:3%;
    margin-left: 20px;
  }

  img.bc[_ngcontent-%COMP%] {
    height: 13%;
    width: 13%;
  }

  @media screen and (max-width: 768px) {
    footer[_ngcontent-%COMP%] {
      padding: 15px; 

      text-align: center; 

    }`]})};var R=[];var z={providers:[v({eventCoalescing:!0}),B(R),_(),T(S())]};var D={providers:[O()]},E=x(z,D);var L=()=>A(c,E),ce=L;export{ce as a};
