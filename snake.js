function Snake() {
    let x = Math.floor(Math.random() * (amount - 4)) + 2;
    let y = Math.floor(Math.random() * (amount - 4)) + 2;
    this.head = x * amount + y;
    this.body = [this.head];
    this.direction = null;

    this.move = function(dir) {
        let opposites = { up: "down", down: "up", left: "right", right: "left" };
        if (dir && (dir === opposites[this.direction]) || dir === this.direction) return;
        if (!dir) dir = this.direction;
        this.direction = dir;
        if (dir === "up") {
            if (this.head < amount) gameover = "You Hit the Edge of the Board";
            else this.head -= amount;
        }
        else if (dir === "down") {
            if (this.head > (amount ** 2) - amount) gameover = "You Hit the Edge of the Board";
            else this.head += amount;
        }
        else if (dir === "left") {
            if (this.head % amount === 0) gameover = "You Hit the Edge of the Board";
            else this.head--;
        }
        else if (dir === "right") {
            if ((this.head + 1) % amount === 0) gameover = "You Hit the Edge of the Board";
            else this.head++;
        }
        if (gameover) return;
        let newBody = [this.head, ...this.body.slice(0, -1)];
         if (append) {
            newBody.push(append);
            append = null;
        }
        this.body = newBody;
        if (this.head === food) {
            score++;
            let avab = [];
            for (let i = 0; i < amount ** 2; i++) avab.push(i);
            avab = avab.filter(i => !snake.body.includes(i));
            if (avab.length === 0) return gameover = "Well Done! You Win!";
            food = avab[Math.floor(Math.random() * avab.length)];
            append = this.body[this.body.length - 1];
        }
        if (this.body.slice(1).includes(this.head)) gameover = "You Hit Yourself";
    }
}
