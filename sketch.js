let snake;
let width;
let amount = 20;
let size = 25;
let food;
let append;
let gameover = false;
let interval;
let score = 1;
function setup() {
    frameRate(15);
    width = amount * size;
    createCanvas(width, width);
    snake = new Snake();
    let avab = [];
    for (let i = 0; i < amount ** 2; i++) avab.push(i);
    avab = avab.filter(i => !snake.body.includes(i));
    food = avab[Math.floor(Math.random() * avab.length)];
}

function draw() {
    noStroke();
    for (let i = 0; i < amount ** 2; i++) {
        if (snake.body.includes(i)) fill("#2d8bd3");
        else fill((i + (Math.floor(i / amount) % 2 ? 1 : 0)) % 2 === 0 ? "#263445" : "#1f2937");
        if (i === food) fill("#ff0000");
        rect((i % amount) * size, Math.floor(i / amount) * size, size, size);
    }

    if (gameover) {
        fill("rgba(51, 51, 51, 0.5)");
        rect(0, 0, amount * size, amount * size);
        fill(255);
        textAlign(CENTER);
        textSize(50);
        textStyle(BOLD);
        text("Game Over!", amount * size / 2, 200);
        textSize(30);
        textStyle(NORMAL);
        text(gameover, amount * size / 2, 240);
        clearInterval(interval);
        interval = null;
    }
    if (!interval && !gameover) interval = setInterval(() => snake.move(), 200);

    if (document.getElementById("score").innerHTML.split(" ")[1] != score) document.getElementById("score").innerHTML = `Score: ${score}`;
}

function keyPressed() {
    if (!gameover) {
        if (keyCode === UP_ARROW) snake.move("up");
        if (keyCode === DOWN_ARROW) snake.move("down");
        if (keyCode === LEFT_ARROW) snake.move("left");
        if (keyCode === RIGHT_ARROW) snake.move("right");
    }
}

function restart() {
    gameover = false;
    score = 1;
    snake = new Snake();
    let avab = [];
    for (let i = 0; i < amount ** 2; i++) avab.push(i);
    avab = avab.filter(i => !snake.body.includes(i));
    food = avab[Math.floor(Math.random() * avab.length)];
}