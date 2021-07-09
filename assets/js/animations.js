class PS4Q1 {
    size = 5;
    board = "#ps4q1Board";
    values = (new Array(this.size)).fill((new Array(this.size)).fill(0));

    setupHTML() {
        for (let i = 0; i < this.size * this.size; i++) {
            $(this.board).append(`<div class="grid-box">${this.getValue(i)}</div>`);
        }
    }

    start() {

    }

    getValue(index) {
        return this.values[Math.floor(index/this.size)][index % this.size];
    }
} 

const ps4q1 = new PS4Q1();

$(function(){
    ps4q1.setupHTML()
});


function showAnimation(name) {
    $(`#${name}`).removeClass("hidden");
}

function closeAnimation(name) {
    $(`#${name}`).addClass("hidden");
}