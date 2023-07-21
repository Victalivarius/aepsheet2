  
  
  //////////////////////////////////////////////////////////////////
  //////////////CHARACTER CREATOR BY VICTALIVARIUS  ///////////////
  /////////////////////       PIXIJS      /////////////////////////
  ////////////////////////////////////////////////////////////////
  
  
  //parts Array
  const parts = ["Head",  "Ears", "Body", "Eyebrows", "Nose", "Mouth",  "Eyes", "Background", "Hair", "Bangs"];
  const partsAmount = [0,1,2,3,4]

    //CANVAS AND APP CREATION
let canvasDiv = document.getElementById("canvasDiv");
const canvas = document.createElement('canvas');

canvasDiv.appendChild(canvas);
const view = canvas.transferControlToOffscreen();

const app = new PIXI.Application({ width: 150, height: 150, view, backgroundAlpha: 0,preserveDrawingBuffer: true, resolution: 2 });

const container = new PIXI.Container();
// canvas.setAttribute("id", "canvas");
app.stage.addChild(container);

  //pixel it
  PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

    ////////////////////////////////////////////////////////////////
    ////////////////       SPRITES,TEXTURES     ////////////////////
    ////////////////////////////////////////////////////////////////

    //create sprites

    
    const Background = new PIXI.Sprite(PIXI.Texture.from('assets/Background/1.png'));

    const Body = new PIXI.Sprite(PIXI.Texture.from('assets/Body/1.png'));
    const Ears = new PIXI.Sprite(PIXI.Texture.from('assets/Ears/1.png'));
    const Head = new PIXI.Sprite(PIXI.Texture.from('assets/Head/1.png'));

    const Mouth = new PIXI.Sprite(PIXI.Texture.from('assets/Mouth/1.png'));
    const Nose = new PIXI.Sprite(PIXI.Texture.from('assets/Nose/1.png'));

    const Hair = new PIXI.Sprite(PIXI.Texture.from('assets/Hair/1.png'));
    const Bangs = new PIXI.Sprite(PIXI.Texture.from('assets/Bangs/1.png'));

    const Eyes = new PIXI.Sprite(PIXI.Texture.from('assets/Eyes/1.png'));
    const Iris = new PIXI.Sprite(PIXI.Texture.from('assets/Eyes/1(1).png'));
    const Eyebrows = new PIXI.Sprite(PIXI.Texture.from('assets/Eyebrows/1.png'));



    const objects = [Background, Body, Ears, Head, Mouth, Nose, Eyebrows, Eyes, Hair, Bangs, Iris];

    app.ticker.add(() => {
      objects.forEach((obj) => {
        // center the sprite's anchor point
        obj.anchor.set(0.5);
        // add to canvas
        container.addChild(obj);
      });
    });


// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;


    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    function menu() {
        let menu = document.getElementById("menu");
        let htmlContent = "";
      
        for (let i = 0; i < parts.length; i++) {
          htmlContent += `<div class="menuParts"><p>${parts[i]}</p>`;
      
          const colorSelector = document.createElement("input");
          colorSelector.type = "color";
          colorSelector.addEventListener("change", () => {
            localStorage.setItem(`${parts[i]}_color`, colorSelector.value);
            makeCharacter();
          });
      
          htmlContent += `<div class="colorGroup">${colorSelector.outerHTML}`;
      
          for (let j = 0; j < partsAmount.length; j++) {
            let src1 = "assets/" + parts[i] + "/" + partsAmount[j] + ".png";
      
            htmlContent += `
              <button class="partButton" id="${localStorage.getItem(parts[i])}"
                onclick="swapTexture('${parts[i]}','${partsAmount[j]}'),swapTexture('Eyes','${partsAmount[j]}(1).png')">
                <img class="buttonIMG" src="${src1}">
              </button>
            `;
          }
      
          htmlContent += `</div><hr></div>`;
        }
      
        menu.innerHTML = htmlContent;
      }
      
      menu();
      
      
function swapTexture (part, num) {
    let name = "assets/" + part + "/" + num + ".png";
    localStorage.setItem(part, name);
    makeCharacter();
};

    ////////////////////////////////////////////////////////////////
    ////////////////       COLOR     ////////////////////
    ////////////////////////////////////////////////////////////////

    function colorTransform(color) {
        let str = localStorage.getItem(color);
        str = str.substring(1);
        return "0x" + str;
    }
    
    function skinRandomHexColor() {
        const startColor = parseInt('fc0303', 16); // convert start color to decimal
        const endColor = parseInt('f4fc03', 16); // convert end color to decimal
      
        const randomColor = Math.floor(Math.random() * (endColor - startColor + 1) + startColor);
        const hexColor = randomColor.toString(16).padStart(6, '0'); // convert decimal to hex and pad with 0s if needed
      
        return `#${hexColor}`;
      }

    const skinColor = document.createElement("input");
    skinColor.type = "color";
    const backColor = document.createElement("input");
backColor.type = "color";
const eyesColor = document.createElement("input");
eyesColor.type = "color";
const hairColor = document.createElement("input");
hairColor.type = "color";

skinColor.addEventListener("input", () => {
    localStorage.setItem("skinColor", skinColor.value); 
    makeCharacter();
});

eyesColor.addEventListener("input", () => {
    localStorage.setItem("eyesColor", eyesColor.value); 
    makeCharacter();
});

hairColor.addEventListener("input", () => {
    localStorage.setItem("hairColor", hairColor.value); 
    makeCharacter();
});

backColor.addEventListener("input", () => {
    localStorage.setItem("backColor", backColor.value);
    makeCharacter();
});

ColorDiv.appendChild(skinColor);
ColorDiv.appendChild(backColor);
ColorDiv.appendChild(eyesColor);
ColorDiv.appendChild(hairColor);

function makeCharacter() {

    Background.tint = colorTransform("backColor");
    Background.texture = PIXI.Texture.from(localStorage.getItem("Background"));

    Body.tint = colorTransform("skinColor");
    Body.texture = PIXI.Texture.from(localStorage.getItem("Body"));

    Ears.tint = colorTransform("skinColor");
    Ears.texture = PIXI.Texture.from(localStorage.getItem("Ears"));
   
    Head.tint = colorTransform("skinColor");
    Head.texture = PIXI.Texture.from(localStorage.getItem("Head"));
   
    Iris.tint = colorTransform("eyesColor"); 
    Iris.texture = PIXI.Texture.from(localStorage.getItem("Iris"));
    Eyes.texture = PIXI.Texture.from(localStorage.getItem("Eyes"));
    Eyebrows.texture = PIXI.Texture.from(localStorage.getItem("Eyebrows"));
    Mouth.texture = PIXI.Texture.from(localStorage.getItem("Mouth"));
    Nose.texture = PIXI.Texture.from(localStorage.getItem("Nose"));

    Hair.tint = colorTransform("hairColor");
    Bangs.tint = colorTransform("hairColor");
    Hair.texture = PIXI.Texture.from(localStorage.getItem("Hair"));
    Bangs.texture = PIXI.Texture.from(localStorage.getItem("Bangs"));


}

function random() {
    let currentSkin = skinRandomHexColor();
    let currentBackground = skinRandomHexColor();


    localStorage.setItem("skinColor", currentSkin); 
    localStorage.setItem("backColor", currentBackground); 

    skinColor.value = currentSkin;
    backColor.value = currentBackground;

    for (let i = 0; i < parts.length; i++) {
        let randomnumber = Math.floor(Math.random() * partsAmount.length)
        let name = "assets/" + parts[i] + "/" + randomnumber + ".png";
        localStorage.setItem(parts[i], name);
    }
    makeCharacter();
}

makeCharacter();