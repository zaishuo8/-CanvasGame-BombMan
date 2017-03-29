/**
 * Created by xuting on 2017/3/27.
 */

function stockObj() {

    this.x;
    this.y;

    this.num;
    this.alive;  // ( 全部是 true )为了统一 石块 和 砖块, 写工具函数的时候 方便
}

stockObj.prototype.init = function () {

    this.x = [];
    this.y = [];
    this.num = 0;
    this.alive = [];

    // 小石头
    for (let i = 0; i < 13; i++){

        for (let j = 0; j < 9; j++){

            this.x.push(100 * i);
            this.y.push(100 * j);
            this.num++;
            this.alive.push(true);
        }
    }

    // 铺满边界的小石头
    for(let i = 0; i < 12; i++){

        this.x.push(100 * i + 50);
        this.y.push(0);
        this.num++;
        this.alive.push(true);

        this.x.push(100 * i + 50);
        this.y.push(800);
        this.num++;
        this.alive.push(true);
    }
    for(let j = 0; j < 8; j++){

        this.x.push(0);
        this.y.push(100 * j + 50);
        this.num++;
        this.alive.push(true);

        this.x.push(1200);
        this.y.push(100 * j + 50);
        this.num++;
        this.alive.push(true);
    }
}

stockObj.prototype.draw = function () {

    for(let i = 0; i < this.num; i++){

        drawBlock(this.x[i], this.y[i]);
    }
}


/*
 * 画一个小石头
 * (x, y) 是原点偏移量
 * */
function drawBlock(x, y) {

    cbgCtx.save();
    cbgCtx.translate(x, y);
    cbgCtx.fillStyle = '#B3B3B3';
    cbgCtx.fillRect(0, 0, 50, 50);
    cbgCtx.fillStyle = '#8B8B7A';
    cbgCtx.fillRect(5, 5, 40, 40);
    cbgCtx.restore();
}