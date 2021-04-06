import {Tile} from "./tile.js";
export class Greed {
    constructor(cont) {
        this.container = cont;
        this.tiles = new Array();

    }

    drawGreed() {
        for(var i=0;i<81;i++) {
            const tile = document.createElement("div");
            tile.classList = "tile";
            tile.style.backgroundColor = "white";
            tile.setAttribute('tabindex','-1');
            const t = new Tile(Math.floor(i/9)+1,(i%9)+1,null,new Array(),new Array(),tile);
            t.drawTile();
            tile.addEventListener("click",function() {
                pozadina(tile);
                localStorage.setItem("selected-tile",tile);
            });
            tile.addEventListener('keydown', function(e) {
                switch(e.key) {
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    case "0":
                        var mode = localStorage.getItem("mode");
                        t.newValue(mode,e.key);
                        break;
                    case "Delete":
                        t.deleteValues();
                        break;
                    default:
                        break;
                }
            });
            tile.addEventListener("focusout", function() {
                tile.style.backgroundColor = "white";
            });
            this.tiles.push(t);
            this.container.appendChild(tile);
        }
    }
}

function pozadina(cont) {
    if(cont.style.backgroundColor != "white") {
        cont.style.backgroundColor = "white";
        return;
    }
    cont.style.backgroundColor = "#ffeb80";
} 

function numberPalet(tile,val) {
    var mode = localStorage.getItem("mode");
    tile.newValue(mode,val);
    console.log(val);
}