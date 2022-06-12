import * as PIXI from "pixi.js";
import { AccessibilityManager } from "pixi.js";

console.log("Jel ulazi?");

var buttonClicked:boolean=false;
var startText: PIXI.Text;

startText = new PIXI.Text('Press Button to start Async Function',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'left'});

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

console.log(canvas);
var img: PIXI.Sprite;

const app = new PIXI.Application({
  antialias: true,
  backgroundColor: 0x2980b9,
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
});
document.body.appendChild(app.view);
app.stage.interactive=true;

app.loader.add("ZelenoDugme", "GreenButton.png");
app.loader.add("CrvenoDugme", "RedButton.png");
app.loader.load();
app.loader.onComplete.add(DoneLoadingAssets);

function DoneLoadingAssets() {
  img = PIXI.Sprite.from(app.loader.resources["ZelenoDugme"].texture!);
  img.interactive=true;
  img.x = app.screen.width / 2;
  img.y = app.screen.height / 2;
  img.anchor.x = 0.5;
  img.width = 300;
  img.height = 300;

  img.on('click', async function(){
    try{
      await Delay(5000);
      startText.text='Press Button to start Async Function';
      img.texture = app.loader.resources["ZelenoDugme"].texture!;
      buttonClicked=false;
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
        startText.text='Wait 5 seconds till async executes';
        img.texture = app.loader.resources["CrvenoDugme"].texture!;
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
  app.stage.addChild(startText);
  //app.resizeTo(window);
  //app.ticker.add(GameLoop);
}

window.onresize = function () {
  app.resize();
};

function GameLoop() { //Menjam sliku spritea iz gameloopa cisto da oprobam gameLoop iako nije pozeljno bas ovde Ne moze preko game Loopa jer ne sme da se menja tako sprite
  // if(buttonClicked==true)
  // {
  //   console.log("AAA");
  //   img.texture = app.loader.resources["CrvenoDugme"].texture!;
  // }
  // else
  // {
  //   console.log("BBB");
  //   img= PIXI.Sprite.from(app.loader.resources["ZelenoDugme"].texture!);
  // }
}