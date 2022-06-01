import * as PIXI from "pixi.js";
import { AccessibilityManager } from "pixi.js";

console.log("Jel ulazi?");

var buttonClicked:boolean=false;

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

console.log(canvas);
var img;

const app = new PIXI.Application({
  antialias: true,
  backgroundColor: 0x2980b9,
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
});
document.body.appendChild(app.view);
app.stage.interactive=true;

app.loader.add("Slika", "/OctanePic.jpg");
app.loader.load();
app.loader.onComplete.add(DoneLoadingAssets);

function DoneLoadingAssets() {
  img = PIXI.Sprite.from("/OctanePic.jpg");
  img.interactive=true;
  img.x = app.screen.width / 2;
  img.y = app.screen.height / 2;
  img.anchor.x = 0.5;
  img.width = 300;
  img.height = 300;
  img.on('click', async function(){
    try{
      await Delay(5000);
      buttonClicked=false;
      console.log("evo me");
    }
    catch(error){
      console.log("Uhvacen error", error);
    }
    finally{
      console.log("Izvrsava se finally");
    }
  }
 )

 function Delay(ms:number)
{
    return new Promise<void>((resolve,reject)=>
    {
      if(!buttonClicked)
      {   
        buttonClicked=true;
        setTimeout(() => {
          resolve();
        }, ms);
      }
      else
      {
        reject(console.log("Button was already clicked"))
      }
      
    })
}

  app.stage.addChild(img);
  //app.resizeTo(window);
}

window.onresize = function () {
  app.resize();
};

// app.ticker.add(GameLoop);
// function GameLoop() {

// }