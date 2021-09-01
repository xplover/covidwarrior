let canvas;
let context;

let request_id;
let fpsInterval = 100 / 30; // the denimitor is frame per second
let now;
let then = Date.now();

let backgroundImage = new Image();

let tilesPerRow = 5;
let tileSize = 40;

let background = [
    [5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 8, 0, 1, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]

let covid = [];
let player = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0,
};

let playerImage = new Image();
let covidImage = new Image();
let vaccineImage = new Image();

let floor;

let vaccines = [];
let vaccine2 = [];

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    load_images(["pave.png", "starlord.png", "covid.png", "vaccine.png"]);
    backgroundImage.src = "static/pave.png";
    playerImage.src = "static/starlord.png";
    covidImage.src = "static/covid.png";
    vaccineImage.src = "static/vaccine.png";

    floor = canvas.height - 20;
    player.x = canvas.width / 2;
    player.y = floor - player.height;

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    for (let i = 0; i < 5; i += 1) {
        let z = {
            x: 250, // how right the dot is
            y: 10, // how down the dot is
            size: 30, // size of the dot
            xChange: randint(-3, 3), // addig values the x and y for animation
            yChange: randint(-3, 3)
        }
        covid.push(z);
    }
    for (let i = 0; i < 2; i += 1) {
        let v = {
            x: 250,
            y: 10,
            size: 20,
            xChange: randint(-1.5, 1.5), // addig values the x and y for animation
            yChange: randint(-1.5, 1.5)
        }
        vaccines.push(v);
    }
    for (let i = 0; i < 1; i += 1) {
        let v = {
            x: 250,
            y: 10,
            size: 20,
            xChange: randint(-1.5, 1.5), // addig values the x and y for animation
            yChange: randint(-1.5, 1.5)
        }
        vaccine2.push(v);
    }
    draw();
}

function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval)

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 32; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);

            }
        }
    }

    //Covid
    for (let z of covid) {
        context.drawImage(covidImage, z.x, z.y, z.size, z.size);
    }

    //vaccine
    for (let v of vaccines) {
        context.drawImage(vaccineImage, v.x, v.y, v.size, v.size);
    }

    // Player
    context.drawImage(playerImage,
        player.width * player.frameX, player.height * player.frameY, player.width, player.height,
        player.x, player.y, player.width, player.height);
    if ((moveLeft || moveRight) && !(moveLeft && moveRight) && !player.in_air) {
        player.frameX = (player.frameX + 1) % 4; // This is like another if state that reset frameX to zero
    }

    for (let z of covid) {
        if (player_collides(z)) {
            stop("You Lose!");
            return;
        }
    }

    for (let v of vaccines) {
        if (player_collides(v)) {
            vaccines.shift(v, 1);
            //vaccines.splice(v, 1);
            return;
        }
    }

    if (vaccines.length === 0) {
        stop("You Win!");
        return;
    }

    for (let z of covid) {
        z.x = z.x + z.xChange;
        z.y = z.y + z.yChange;

        if (z.y < 0) {
            z.yChange = z.yChange * -1;
        } else if (z.y + z.size > canvas.height) {
            z.yChange = z.yChange * -1;
        } else if (z.x < 0) {
            z.xChange = z.xChange * -1;
        } else if (z.x + z.size > canvas.width) {
            z.xChange = z.xChange * -1;
        }
    }

    for (let v of vaccines) {
        v.x = v.x + v.xChange;
        v.y = v.y + v.yChange;

        if (v.y < 0) {
            v.yChange = v.yChange * -1;
        } else if (v.y + v.size > canvas.height) {
            v.yChange = v.yChange * -1;
        } else if (v.x < 0) {
            v.xChange = v.xChange * -1;
        } else if (v.x + v.size > canvas.width) {
            v.xChange = v.xChange * -1;
        }
    }

    // Code to move the player
    if (moveLeft) {
        player.x = player.x - player.width * .15;
        player.frameY = 1;
    }
    if (moveRight) {
        player.x = player.x + player.width * .15;
        player.frameY = 2;
    }
    if (moveUp) {
        player.y = player.y - player.width * .15;
        player.frameY = 3;
    }
    if (moveDown) {
        player.y = player.y + player.width * .15;
        player.frameY = 0;
    }

    // Update the player
    player.x = player.x + player.xChange;
    player.y = player.y + player.yChange;

    // Player can go through the wall
    if (player.x + player.width < 0) {
        player.x = canvas.width;
    } else if (player.x > canvas.width) {
        player.x = -player.width
    } else if (player.y + player.height < 0) {
        player.y = canvas.height;
    } else if (player.y > canvas.height) {
        player.y = -player.height;
    }
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
}

function player_collides(z) {
    if (player.x + player.width < z.x ||
        z.x + z.size < player.x ||
        player.y > z.y + z.size ||
        z.y > player.y + player.width) {
        return false;
    } else {
        return true;
    }
}

function stop(outcome) {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
    let outcome_element = document.querySelector("#outcome"); //to select id in html
    outcome_element.innerHTML = outcome;
}

async function load_images(urls) {
    let promises = [];
    for (let url of urls) {
        promises.push(new Promise(resolve => {
            let img = new Image();
            img.onload = resolve;
            img.src = url;
        }));
    }
    await Promise.all(promises);
}