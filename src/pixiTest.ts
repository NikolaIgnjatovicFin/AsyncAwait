import * as PIXI from "pixi.js";

console.log("Jel ulazi?");

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
  img.x = app.screen.width / 2;
  img.y = app.screen.height / 2;
  img.anchor.x = 0.5;
  img.width = 300;
  img.height = 300;
  app.stage.addChild(img);
  //app.resizeTo(window);
}

window.onresize = function () {
  app.resize();
};

// app.ticker.add(GameLoop);
// function GameLoop() {

// }