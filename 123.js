var gameBoard;
var gameSelector;
var gameBlocks;
var ctx;
var idx = -1;
const TILE_SIZE = 50;
const TILE_GAP = 5;

class GameObject {
    constructor(json) {
        this.array = json.data;
        this.offset = json.offset;
        this.coords = json.coords;
    }
    draw() {
        for (var json of this.array)
            display(json, this.offset);
    }
};

function display(json, offset) {
    ctx.beginPath();
    for (var point of json.path)
        ctx.lineTo(point[0] + offset[0] * TILE_SIZE, 
                   point[1] + offset[1] * TILE_SIZE);
    ctx.closePath();
    ctx.fillStyle = json.color;
    ctx.fill();
    ctx.stroke();
}

function draw() {
    gameBoard.draw();
    for (var block of gameBlocks)
        block.draw();
    gameSelector.draw();
}

function init() {
    var canvas = document.getElementById("canvas");
    canvas.width = 7 * TILE_SIZE + TILE_GAP;
    canvas.height = 6 * TILE_SIZE + TILE_GAP;
    ctx = canvas.getContext("2d");
    initPaths();
    draw();
    document.addEventListener("keydown", updateGameState);
}

function initPaths() {
    gameBoard = new GameObject({
        "data": [{
            "color": "lightGray",
            "path": [
                [0, 0],
                [7 * TILE_SIZE + TILE_GAP, 0],
                [7 * TILE_SIZE + TILE_GAP, 5 * TILE_SIZE + TILE_GAP],
                [6 * TILE_SIZE + TILE_GAP, 5 * TILE_SIZE + TILE_GAP],
                [6 * TILE_SIZE + TILE_GAP, 6 * TILE_SIZE + TILE_GAP],
                [TILE_SIZE, 6 * TILE_SIZE + TILE_GAP],
                [TILE_SIZE, 5 * TILE_SIZE + TILE_GAP],
                [0, 5 * TILE_SIZE + TILE_GAP]
            ]
        }],
        "offset": [0,0],
        "coords": [],
    });
    for (var i = 0; i < 7; i++)
        for (var j = 0; j < 6; j++)
            if (i != 0 && i != 6 || j != 5)
                gameBoard.coords.push([i, j]);
    gameSelector = new GameObject({
        "data": [{
            "color": "yellow",
            "path": [
                [0, 0],
                [Math.round(TILE_SIZE / 3), 0],
                [Math.round(TILE_SIZE / 3), TILE_GAP],
                [TILE_GAP, TILE_GAP],
                [TILE_GAP, Math.round(TILE_SIZE / 3)],
                [0, Math.round(TILE_SIZE / 3)]
            ]
        }],
        "offset": [1,5],
        "coords": [[0,0]]
    });
    function invert(input, dx, dy) {
        var output = {
            color: input.color,
            path: []
        };
        for (var point of input.path) {
            var x = point[0];
            var y = point[1];
            if (dx != 0)
                x = dx - x;
            if (dy != 0)
                y = dy - y;
            output.path.push([x, y]);
        }
        return output;
    }
    var tmp = gameSelector.array;
    tmp.push(invert(tmp[0], 0, 55));
    tmp.push(invert(tmp[0], 55, 0));
    tmp.push(invert(tmp[0], 55, 55));
    gameBlocks = [{
        // block A
        "data": [{
            "color": "magenta",
            "path": [
                [TILE_GAP, TILE_GAP],
                [3 * TILE_SIZE, TILE_GAP],
                [3 * TILE_SIZE, 2 * TILE_SIZE],
                [2 * TILE_SIZE + TILE_GAP, 2 * TILE_SIZE],
                [2 * TILE_SIZE + TILE_GAP, TILE_SIZE],
                [TILE_GAP, TILE_SIZE]
            ]
        }],
        "offset": [0,0],
        "coords": [[0,0],[1,0],[2,0],[2,1]]
    },{
        // block B
        "data": [{
            "color": "magenta",
            "path": [
                [TILE_GAP, TILE_GAP],
                [3 * TILE_SIZE, TILE_GAP],
                [3 * TILE_SIZE, 2 * TILE_SIZE],
                [2 * TILE_SIZE + TILE_GAP, 2 * TILE_SIZE],
                [2 * TILE_SIZE + TILE_GAP, TILE_SIZE],
                [TILE_GAP, TILE_SIZE]
            ]
        }],
        "offset": [3,0],
        "coords": [[0,0],[1,0],[2,0],[2,1]]
    },{
        // block C
        "data": [{
            "color": "magenta",
            "path": [
                [TILE_GAP, TILE_GAP],
                [TILE_SIZE, TILE_GAP],
                [TILE_SIZE, 3 * TILE_SIZE],
                [TILE_GAP, 3 * TILE_SIZE]
            ]
        }],
        "offset": [6,0],
        "coords": [[0,0],[0,1],[0,2]]
    },{
        // block D
        "data": [{
            "color": "magenta",
            "path": [
                [TILE_GAP, TILE_GAP],
                [3 * TILE_SIZE, TILE_GAP],
                [3 * TILE_SIZE, TILE_SIZE],
                [TILE_GAP, TILE_SIZE]
            ]
        }],
        "offset": [0,2],
        "coords": [[0,0],[1,0],[2,0]]
    },{
        // block E
        "data": [{
            "color": "magenta",
            "path": [
                [TILE_GAP, TILE_GAP],
                [3 * TILE_SIZE, TILE_GAP],
                [3 * TILE_SIZE, TILE_SIZE],
                [TILE_GAP, TILE_SIZE]
            ]
        }],
        "offset": [3,2],
        "coords": [[0,0],[1,0],[2,0]]
    },{
        // block F
        "data": [{
            "color": "magenta",
            "path": [
                [2 * TILE_SIZE + TILE_GAP, TILE_GAP],
                [3 * TILE_SIZE, TILE_GAP],
                [3 * TILE_SIZE, 2 * TILE_SIZE],
                [TILE_GAP, 2 * TILE_SIZE],
                [TILE_GAP, TILE_SIZE + TILE_GAP],
                [2 * TILE_SIZE + TILE_GAP, TILE_SIZE + TILE_GAP]
            ]
        }],
        "offset": [0,3],
        "coords": [[2,0],[0,1],[1,1],[2,1]]
    },{
        // block G
        "data": [{
            "color": "magenta",
            "path": [
                [TILE_GAP, TILE_GAP],
                [TILE_SIZE, TILE_GAP],
                [TILE_SIZE, TILE_SIZE + TILE_GAP],
                [3 * TILE_SIZE, TILE_SIZE + TILE_GAP],
                [3 * TILE_SIZE, 2 * TILE_SIZE],
                [TILE_GAP, 2 * TILE_SIZE]
            ]
        }],
        "offset": [3,3],
        "coords": [[0,0],[0,1],[1,1],[2,1]]
    },{
        // block H
        "data": [{
            "color": "magenta",
            "path": [
                [TILE_GAP, TILE_GAP],
                [TILE_SIZE, TILE_GAP],
                [TILE_SIZE, 2 * TILE_SIZE],
                [TILE_GAP, 2 * TILE_SIZE]
            ]
        }],
        "offset": [6,3],
        "coords": [[0,0],[0,1]]
    }].map(x => new GameObject(x));
}

function updateGameState(e) {
    switch (e.key) {
        case "w": case "ArrowUp":
            move(0, -1);
            break;
        case "a": case "ArrowLeft":
            move(-1, 0);
            break;
        case "s": case "ArrowDown":
            move(0, 1);
            break;
        case "d": case "ArrowRight":
            move(1, 0);
            break;
        case "Enter": case " ":
            toggleSelect();
            break;
    }
}

function check(obj1, obj2, dx, dy, type) {
    var arrayA = obj1.coords;
    var arrayB = obj2.coords;
    var flag1 = type;
    for (var pA of arrayA) {
        var flag2 = false;
        for (var pB of arrayB) {
            var x = pA[0] + obj1.offset[0] + dx - pB[0] - obj2.offset[0];
            var y = pA[1] + obj1.offset[1] + dy - pB[1] - obj2.offset[1];
            if (x == 0 && y == 0)
                flag2 = true;
        }
        if (type)
            flag1 &= flag2;
        else 
            flag1 |= flag2;
    }
    return flag1;
}

function move(dx, dy) {
    if (idx == -1) {
        if (!check(gameSelector, gameBoard, dx, dy, true))
            return;
        gameSelector.offset[0] += dx;
        gameSelector.offset[1] += dy;
    } else {
        if (!check(gameBlocks[idx], gameBoard, dx, dy, true))
            return;
        for (var i = 0; i < gameBlocks.length; i++) 
            if (i != idx)
                if (check(gameBlocks[idx], gameBlocks[i], dx, dy, false))
                    return;
        gameSelector.offset[0] += dx;
        gameSelector.offset[1] += dy;
        gameBlocks[idx].offset[0] += dx;
        gameBlocks[idx].offset[1] += dy;
    }
    draw();
}

function toggleSelect() {
    if (idx == -1) {
        for (var i = 0; i < gameBlocks.length; i++) {
            if (check(gameSelector, gameBlocks[i], 0, 0, true)) {
                idx = i;
                gameBlocks[idx].array[0].color = "greenyellow";
                break;
            }
        }
    } else {
        gameBlocks[idx].array[0].color = "magenta";
        idx = -1;
    }
    draw();
}