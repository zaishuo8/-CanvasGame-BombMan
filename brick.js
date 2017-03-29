/**
 * Created by xuting on 2017/3/27.
 */

function brickObj() {

    this.num;
    this.x;
    this.y;
    this.alive;  // 砖块有没有被炸掉, true 表示没被炸掉

}


brickObj.prototype.init = function () {

    this.num = 120;
    this.x = [];
    this.y = [];
    this.alive = [];

    for(let i = 0; i < this.num; i++){

        let x = Math.floor(Math.random() * 24) * 50;
        let y = Math.floor(Math.random() * 16) * 50;

        this.x.push(x);
        this.y.push(y);

        this.alive[i] = true;
        // 把重叠在石块上的砖块 设置为 false
        for(let j = 0; j < stock.num; j++){

            if(x == stock.x[j] && y == stock.y[j]){

                this.alive[i] = false;
                break;
            }
        }

        // 把左上角的位置留出来, 给 hero 做初始化位置
        if((x == 50 && y == 50) || (x == 100 && y == 50) || (x==50 && y==100)){

            this.alive[i] = false;
        }
    }


}


brickObj.prototype.draw = function () {


    // 画小砖块组
    for(let i = 0; i < this.num; i++){

        if(this.alive[i]){

            drawBrick(this.x[i], this.y[i]);
        }
    }

}


/*
 * 画一个小砖块
 * (x, y) 是原点偏移量
 *
 * */
function drawBrick(x, y) {

    cbgCtx.save();
    cbgCtx.translate(x, y);
    cbgCtx.fillStyle = '#EAEAEA';
    cbgCtx.fillRect(0, 0, 50, 50);
    cbgCtx.fillStyle = '#CDCDC1';
    cbgCtx.fillRect(5, 5, 40, 10);
    cbgCtx.fillRect(5, 20, 10, 10);
    cbgCtx.fillRect(20, 20, 25, 10);
    cbgCtx.fillRect(5, 35, 25, 10);
    cbgCtx.fillRect(35, 35, 10, 10);
    cbgCtx.restore();
}