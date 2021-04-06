export class Tile {
    constructor(row,column,value,insides,outlines,cont) {
        this.row =row;
        this.column=column;
        this.value=value;
        this.insides = insides;
        this.outlines = outlines;
        this.container = cont;
    }

    drawTile() {
        border(this.container, this.row, this.column);
        this.drawValues();
        var i = 1;
        this.setValues(i);
    }

    newValue(mode, val) {
        switch(mode) {
            case "value":
                if(this.value == val) {
                    this.deleteValues();
                    return;
                }
                this.value = val;
                break;
            case "inside":
                var contains = false;
                for(var i=0;i<this.insides.length;i++) {
                    if(this.insides[i] == val) {
                        this.insides.splice(i,1);
                        contains = true;
                    }
                }
                if(contains)
                    break;
                this.insides.push(val);
                break;
            case "outside":
                var contains = false;
                for(var i=0;i<this.outlines.length;i++) {
                    if(this.outlines[i] == val) {
                        this.outlines.splice(i,1);
                        contains = true;
                    }
                }
                if(contains)
                    break;
                this.outlines.push(val);
                break;
            default:
                break;
        }
        this.drawValues();
    }

    deleteValues() {
        this.container.innerHTML = "";
        this.value = "";
    }

    drawValues() {
        this.container.innerHTML = "";
        if(this.value != undefined) {
            const value = document.createElement("div");
            value.innerHTML = this.value;
            value.className = "value";
            this.container.appendChild(value);
            return;
        }

        this.insides.sort();
        const inside = document.createElement("div");
        this.insides.forEach(element => {
            inside.innerHTML += element;
        });
        inside.className = "inside";
        this.container.appendChild(inside);

        this.outlines.sort();
        const outside = document.createElement("div");
        outside.className = "outside";
        for(var i=1;i<10;i++) {
            const out = document.createElement("div");
            out.id = "outside-" + this.row + "-" + this.column + "-" + i;
            if(this.outlines[i - 1] != undefined)
                out.innerHTML = this.outlines[i - 1];
            outside.appendChild(out)
        }  
        this.container.appendChild(outside);
    }

    setValues(i) {
        
        this.outlines.forEach(element => {
            if(i == "5") {
                i++;
                console.log(i);
            }
            else {
                const out = document.getElementById("outside-" + this.row + "-" + this.column + "-" + i);
                console.log("outside-" + this.row + "-" + this.column + "-" + i);
                i++;
                console.log(i);
            }
        });
    }
}

/*function setNumbers() {
    for(var i=1;i<10;i++) {
        const number = document.getElementById(i);
        number.addEventListener("click",function() {
            console.log("dugme klik");
            var mode = localStorage.getItem("mode");
            this.newValue(mode,i);
        });
    }
}*/

function border(cont, row, column) {
    if(row === 1) cont.style.borderTop = "2px solid black";
    (row === 3 || row === 6) ? cont.style.borderBottom = "4px solid black" : cont.style.borderBottom = "2px solid black";
    if(column === 1) cont.style.borderLeft = "2px solid black";
    (column === 3 || column === 6) ? cont.style.borderRight = "4px solid black": cont.style.borderRight = "2px solid black";
}
