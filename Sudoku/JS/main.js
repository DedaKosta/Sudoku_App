import {Greed} from "./greed.js";
import { Tile } from "./tile.js";
var time;

const greed = document.getElementById('greed');
const g = new Greed(greed);
g.drawGreed();
console.log("Finished!");

time = setInterval(function() {
    Timer();
}, 1000);

function changeTimer(seconds) {
    const label = document.getElementById("timer-label");
    label.innerHTML = (seconds < 600) ? "0" + Math.floor(seconds/60,1) + ":" + ((seconds % 60 < 10) ? "0" + (seconds % 60) : seconds % 60) : Math.floor(seconds/60,2) + ":" + ((seconds % 60 < 10) ? "0" + (seconds % 60) : seconds % 60);
}

function Timer() {
    var sec = localStorage.getItem("seconds");
    sec = Math.floor(sec) + 1;
    localStorage.setItem("seconds",sec);
    changeTimer(sec);
}

const PausePlay = document.getElementById("pauseplay");
PausePlay.addEventListener("click", changeIcon);

function changeIcon() {
    var pause = localStorage.getItem("pause");
    if(pause == "true") {
        localStorage.setItem("pause",false);
        PausePlay.setAttribute('src', "./Pictures/play.png");
        clearInterval(time);
        return;
    }
    localStorage.setItem("pause",true);
    PausePlay.setAttribute('src',"./Pictures/pause.png");
    time = setInterval(function() {
        Timer();
    }, 1000);
}


const value_mod = document.getElementById("value");
value_mod.addEventListener("click",function() {
    value_mod.style.backgroundColor = "#cc34eb";
    inside_mod.style.backgroundColor = "purple";
    outside_mod.style.backgroundColor = "purple";
    var mod = value_mod.innerHTML;
    localStorage.setItem("mode",mod);
});

const inside_mod = document.getElementById("inside");
inside_mod.addEventListener("click",function() {
    value_mod.style.backgroundColor = "purple";
    inside_mod.style.backgroundColor = "#cc34eb";
    outside_mod.style.backgroundColor = "purple";
    var mod = inside_mod.innerHTML;
    localStorage.setItem("mode",mod);
});

const outside_mod = document.getElementById("outside");
outside_mod.addEventListener("click",function() {
    value_mod.style.backgroundColor = "purple";
    inside_mod.style.backgroundColor = "purple";
    outside_mod.style.backgroundColor = "#cc34eb";
    var mod = outside_mod.innerHTML;
    localStorage.setItem("mode",mod);
});

const check = document.getElementById("check");
check.addEventListener("click",function() {
    var good = true;

    const greed = document.getElementById("greed");
    var children_elem = greed.childNodes;
    var children = new Array();
    children_elem.forEach(element => {
        children.push(element);
    });
    children.shift();
    children.forEach(child => {
        child.style.backgroundColor = "white";
    });
    children.forEach(child => {
        var element_children = child.childNodes;
        if(element_children.length != 1) {
            good = false;
            child.style.backgroundColor = "#d99b9c";
        }
    });
    if(!good) {
        alert("This doesn't look good!");
        return;
    }
    var row_col_box;
    var row_col_box_tiles
    var indexes;
    var good_row = true;
    for(var i=0;i<81;i+=9) {
        row_col_box_tiles = new Array();
        row_col_box = new Array();
        indexes = new Array();

        indexes.push(i);
        indexes.push(i+1);
        indexes.push(i+2);
        indexes.push(i+3);
        indexes.push(i+4);
        indexes.push(i+5);
        indexes.push(i+6);
        indexes.push(i+7);
        indexes.push(i+8);

        row_col_box_tiles.push(children[i]);
        row_col_box_tiles.push(children[i+1]);
        row_col_box_tiles.push(children[i+2]);
        row_col_box_tiles.push(children[i+3]);
        row_col_box_tiles.push(children[i+4]);
        row_col_box_tiles.push(children[i+5]);
        row_col_box_tiles.push(children[i+6]);
        row_col_box_tiles.push(children[i+7]);
        row_col_box_tiles.push(children[i+8]);

        row_col_box.push(returnInner(children[i]));
        row_col_box.push(returnInner(children[i+1]));
        row_col_box.push(returnInner(children[i+2]));
        row_col_box.push(returnInner(children[i+3]));
        row_col_box.push(returnInner(children[i+4]));
        row_col_box.push(returnInner(children[i+5]));
        row_col_box.push(returnInner(children[i+6]));
        row_col_box.push(returnInner(children[i+7]));
        row_col_box.push(returnInner(children[i+8]));
        if(good_row)
            good_row = !checkValues(row_col_box);
        var index_dup = colorDuplicates(row_col_box_tiles);
        index_dup.forEach(element => {
            children[indexes[element]].style.backgroundColor = "#d99b9c";
        });
    }

    var good_column = true;
    for(var i=0;i<9;i++) {
        row_col_box_tiles = new Array();
        row_col_box = new Array();
        indexes = new Array();

        indexes.push(i);
        indexes.push(i+9);
        indexes.push(i+18);
        indexes.push(i+27);
        indexes.push(i+36);
        indexes.push(i+45);
        indexes.push(i+54);
        indexes.push(i+63);
        indexes.push(i+72);

        row_col_box_tiles.push(children[i]);
        row_col_box_tiles.push(children[i+9]);
        row_col_box_tiles.push(children[i+18]);
        row_col_box_tiles.push(children[i+27]);
        row_col_box_tiles.push(children[i+36]);
        row_col_box_tiles.push(children[i+45]);
        row_col_box_tiles.push(children[i+54]);
        row_col_box_tiles.push(children[i+63]);
        row_col_box_tiles.push(children[i+72]);

        row_col_box.push(returnInner(children[i]));
        row_col_box.push(returnInner(children[i+9]));
        row_col_box.push(returnInner(children[i+18]));
        row_col_box.push(returnInner(children[i+27]));
        row_col_box.push(returnInner(children[i+36]));
        row_col_box.push(returnInner(children[i+45]));
        row_col_box.push(returnInner(children[i+54]));
        row_col_box.push(returnInner(children[i+63]));
        row_col_box.push(returnInner(children[i+72]));
        if(good_column)
            good_column = !checkValues(row_col_box);
            var index_dup = colorDuplicates(row_col_box_tiles);
            index_dup.forEach(element => {
                children[indexes[element]].style.backgroundColor = "#d99b9c";
            });
    }

    var good_box = true;
    for(var i=0;i<9;i++) {
        for(var j=0;j<9;j++) {
            if(i%3 == "0" && j%3 == "0") {
                row_col_box_tiles = new Array();
                row_col_box = new Array();
                indexes = new Array();

                indexes.push(i*9+j);
                indexes.push(i*9+j + 1);
                indexes.push(i*9+j + 2);
                indexes.push((i+1)*9+j);
                indexes.push((i+1)*9+j + 1);
                indexes.push((i+1)*9+j + 2);
                indexes.push((i+2)*9+j);
                indexes.push((i+2)*9+j + 1);
                indexes.push((i+2)*9+j + 2);

                row_col_box_tiles.push(children[i*9+j]);
                row_col_box_tiles.push(children[i*9+j + 1]);
                row_col_box_tiles.push(children[i*9+j + 2]);
                row_col_box_tiles.push(children[(i+1)*9+j]);
                row_col_box_tiles.push(children[(i+1)*9+j + 1]);
                row_col_box_tiles.push(children[(i+1)*9+j + 2]);
                row_col_box_tiles.push(children[(i+2)*9+j]);
                row_col_box_tiles.push(children[(i+2)*9+j + 1]);
                row_col_box_tiles.push(children[(i+2)*9+j + 2]);

                row_col_box.push(returnInner(children[i*9+j]));
                row_col_box.push(returnInner(children[i*9+j+1]));
                row_col_box.push(returnInner(children[i*9+j+2]));
                row_col_box.push(returnInner(children[(i+1)*9+j]));
                row_col_box.push(returnInner(children[(i+1)*9+j+1]));
                row_col_box.push(returnInner(children[(i+1)*9+j+2]));
                row_col_box.push(returnInner(children[(i+2)*9+j]));
                row_col_box.push(returnInner(children[(i+2)*9+j+1]));
                row_col_box.push(returnInner(children[(i+2)*9+j+2]));
                if(good_box)
                    good_box = !checkValues(row_col_box);
                var index_dup = colorDuplicates(row_col_box_tiles);
                index_dup.forEach(element => {
                    children[indexes[element]].style.backgroundColor = "#d99b9c";
                });
            }
        }
    }
    if(!good_row || !good_column || !good_box) {
        alert("This doesn't look good!");
        return;
    }
    alert("This looks good. Good job!");
});

function checkValues(val_array) {
    return (new Set(val_array)).size !== val_array.length;
}

function colorDuplicates(array) {
    var indexes = new Array();
    for(var i=0;i<array.length;i++) {
        for(var j=0;j<array.length;j++) {
            if(i != j) {
                var el1 = array[i].childNodes;
                var el2 = array[j].childNodes;
                if(el1[0].innerHTML == el2[0].innerHTML) {
                    indexes.push(i);
                    indexes.push(j);
                }
            }
        }
    }
    return indexes;
}

function returnInner(cont) {
    var children = cont.childNodes;
    return children[0].innerHTML;
}
 

const new_game = document.getElementById("new-game");
new_game.addEventListener("click",function() {
    if(confirm("Start a new game?")) {
        const greed = document.getElementById('greed');
        greed.innerHTML = "";
        const g = new Greed(greed);
        g.drawGreed();
        console.log("Finished!");
        localStorage.setItem("seconds",-1);
        time = setInterval(function() {
            Timer();
        }, 1000);
        var pause = localStorage.getItem("pause");
        if(pause == "true") return;
        localStorage.setItem("pause",true);
        PausePlay.setAttribute('src',"./Pictures/pause.png");

        
    }
});