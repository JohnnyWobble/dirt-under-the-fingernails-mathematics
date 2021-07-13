class PS4Q1 {
    size = 5;
    board = "#ps4q1Board";
    active = "I";
    I = this.getEmptyArray(); 
    U = this.getEmptyArray(1);
    R = this.getEmptyArray();
    t = 0;
    tStep = 1;

    setupHTML() {
        for (let i = 0; i < this.size * this.size; i++) {
            $(this.board).append(`<div class="grid-box">${this.getValue(i)}</div>`);
        }
    }

    updateHTML() {
        let children = $(this.board).children();
        for (let i = 0; i < this.size * this.size; i++) {
            let child = $(children[i]); 
            child.text(this.getValue(i).toFixed(3));
            child.css("background-color", `hsla(${this.getValue(i) * 330 + 90}, 100%, 50%, 0.15)`);
        }

        $("#tTicker").text(`t  = ${this.t}`);
    }

    start() {
        this.step();
    }

    pause() {
        console.log("PAUSE");
    }

    reset() {
        this.I = this.getEmptyArray();
        this.U = this.getEmptyArray(1);
        this.R = this.getEmptyArray();

        this.I[1][2] = .3;
        this.U[1][2] = .7;
        this.t = 0;

        this.updateHTML();
    }

    getActive() {
        return this[this.active];
    }

    getValue(index) {
        return this.getActive()[(index % this.size)][this.size - Math.floor(index/this.size) - 1];
    }

    getNewI(x, y) {
        return this.U[x][y] 
            * (0.3 
                * ((x > 0? this.I[x - 1][y] : 0)
                    + (y > 0? this.I[x][y - 1] : 0)
                    + (x < this.size - 1? this.I[x + 1][y] : 0) 
                    + (y < this.size - 1? this.I[x][y + 1] : 0))
                + (0.4 * this.I[x][y]));
    }

    getNewU(x,y) {
        return this.U[x][y] - this.I[x][y];
    }

    getNewR(x,y) {
        return this.R[x][y] + this.I[x][y];
    }

    step() {
        let newI = this.getEmptyArray().map((v,i) => v.map((_,j) => this.getNewI(i,j)));
        let newU = this.getEmptyArray().map((v,i) => v.map((_,j) => this.getNewU(i,j)));
        let newR = this.getEmptyArray().map((v,i) => v.map((_,j) => this.getNewR(i,j)));

        this.I = newI;
        this.U = newU;
        this.R = newR;
        this.t += this.tStep;

        this.updateHTML();
    }

    getEmptyArray(fillWith=0) {
        return new Array(this.size).fill(fillWith).map(() => new Array(this.size).fill(fillWith));
    }

    setActive(arrLetter) {
        $(`#${this.active}Btn`).removeClass("hold");
        $(`#${arrLetter}Btn`).addClass("hold");

        this.active = arrLetter;
        this.updateHTML();
    }
} 

const ps4q1 = new PS4Q1();

$(function(){
    ps4q1.setupHTML();
    ps4q1.reset();
});


function showAnimation(name) {
    $(`#${name}`).removeClass("hidden");
}

function closeAnimation(name) {
    $(`#${name}`).addClass("hidden");
}