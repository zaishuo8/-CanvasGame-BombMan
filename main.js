/**
 * Created by xuting on 2017/3/27.
 */

let lastTime, deltaTime, cbgCan, bombCan;
let cbg, brick, stock;
let hero, monsters, bombs;
let gameState;    // 游戏的状态: ready  gaming  gameover  win
let gameData;

document.body.onload = game;

function game() {

    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}

function init() {

    cbgCan = document.getElementById('cbg');
    cbgCtx = cbgCan.getContext('2d');

    bombCan = document.getElementById('bombg');
    bombCtx = bombCan.getContext('2d');

    gameState = 'ready';

    cbg = new bgObg();

    gameData = new gameDataObj();

    stock = new stockObj();
    stock.init();

    brick = new brickObj();
    brick.init();

    hero = new heroObj();
    hero.init();

    monsters = new monstersObj();
    monsters.init();

    bombs = new bombObj();
    bombs.init();

    hero.addListener();
    hero.throwBombListen();

}

function gameLoop() {

    requestAnimationFrame(gameLoop);

    let now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    if(gameState != 'gaming'){

        gameData.draw();
    }

    if(gameState == 'gaming'){

        cbg.draw();

        stock.draw();

        brick.draw();

        hero.draw();

        monsters.draw();

        bombs.draw();

        hitMonster();

        hitHero();

        monsters.ifKillAll();
    }

}