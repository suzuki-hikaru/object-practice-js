'use strict'

let countupVal, updateVal;
let count = 0;

// let canvas = () => {
//     const canvas = document.getElementById("canvas")
//     console.log(`canvasWidth:${canvas.width}\ncanvasHeight:${canvas.height}`)

//     // 画面内の位置
//     var x = canvas.getBoundingClientRect().left;
//     var y = canvas.getBoundingClientRect().top;

//     console.log(`画面内\ncanvasx:${x}\ncanvasy:${y}`)
// }

let canvas = function () { // canvas
    this.x = document.getElementById("canvas").getBoundingClientRect().left;
    this.y = document.getElementById("canvas").getBoundingClientRect().top;

    this.getx = function () {
        return this.x;
    }

    this.gety = function () {
        return this.y;
    }
}

let getXY = new canvas()
console.log(`x座標：${getXY.getx()}`)
console.log(`y座標：${getXY.gety()}`)

let countup = function () {
    count = count + 1;
    document.getElementById("timer").innerHTML = count;
}
countupVal = setInterval(countup, 1000); // 1秒ごとに countupを呼ぶ

let Human = function () { // Human のコンストラクタ関数
    this.image = new Image();
    this.image.style.position = "fixed";
}

let Player = function () { // Player のコンストラクタ関数
    Human.apply(this, arguments);
    this.x = 0;
    this.y = 0;
    this.image.src = "humanpicto.png";
}

let Enemy = function () { // Enemy のコンストラクタ関数
    Human.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 5);
    this.dy = 0;
    this.image.src = "humanpicto.png";
}

Player.prototype = new Human;
Enemy.prototype = new Human;

Enemy.prototype.update = function () {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    if (this.x < 0 || this.x > window.innerWidth - this.image.width) {
        this.x = this.x - this.dx;
        this.dx *= -1;
    }

    this.image.style.left = this.x + "px";
    this.image.style.top = this.y + "px";

    if ((Math.abs(player.x - this.x) < player.image.width) && (Math.abs(player.y - this.y) < player.image.height)) {
        gameover();
    }
}

let player;
let enemy = new Array(3);

function MouseMove(e) {
    player.x = (e.clientX - player.image.width / 2);
    player.y = (e.clientY - player.image.height / 2);
    player.image.style.left = player.x + "px";
    player.image.style.top = player.y + "px";
}

let update = function () { // 画像表示のアップデート
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].update();
    }
}
updateVal = setInterval(update, 10); // 関数updateを10msごとに呼び出す．

function gameover() {
    clearInterval(countupVal); // 関数countupを一定時間ごとに呼び出していたのを止める．
    clearInterval(updateVal); // 関数updateを一定時間ごとに呼び出していたのを止める．
}

window.onload = function () {　// ブラウザにコンテンツがロードされたときに1度だけ呼ばれる関数
    player = new Player();
    for (let i = 0; i < enemy.length; i++) {
        enemy[i] = new Enemy();
    }
    document.body.appendChild(player.image);

    for (let i = 0; i < enemy.length; i++) {
        document.body.appendChild(enemy[i].image);
    }

    // マウスが移動したときに MouseMove 関数が呼ばれるようにイベントリスナを設定
    if (document.addEventListener) {
        document.addEventListener("mousemove", MouseMove);
    } else if (document.attachEvent) {
        document.attachEvent("onmousemove", MouseMove);
    }
}