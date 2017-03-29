/**
 * Created by xuting on 2017/3/28.
 */

function bomb(x, y) {

    this.x = x;
    this.y = y;
    this.state = 'ready';  // ready or bombing or finish
    this.timer = 0;

    // bombing 的时候的波及长度
    this.lengthUp = 0;        // -105 / 1000
    this.lengthDown = 0;      // 105 / 1000
    this.lengthLeft = 0;        // -105 / 1000
    this.lengthRight = 0;     // 105 / 1000
}


bomb.prototype.draw = function () {

    bombCtx.save();
    bombCtx.translate(this.x + 25, this.y + 25);

    if(this.state == 'ready'){

        this.timer += deltaTime;
        if(this.timer >= 3000){

            this.state = 'bombing';
            this.timer = 0;

        }
    }

    if(this.state == 'bombing'){

        // 判断是否在石头旁边
        if(!stockCons(stock, this.x, this.y - (-this.lengthUp - 25) - 20, 'up')){

            this.lengthUp += -0.105 * deltaTime * 2;

            // 判断有没击中砖块
            let brickId = stockCons(brick, this.x, this.y - (-this.lengthUp - 25) - 20 + 5, 'up');
            if(brickId){

                brick.alive[brickId - 1] = false;
            }
        }
        if(!stockCons(stock, this.x, this.y + 25 + this.lengthDown - 50 + 20 , 'down')){

            this.lengthDown += 0.105 * deltaTime * 2;

            let brickId = stockCons(brick, this.x, this.y + 25 + this.lengthDown - 50 + 20 - 5, 'down')
            if(brickId){

                brick.alive[brickId - 1] = false;
            }
        }
        if(!stockCons(stock, this.x - (-this.lengthLeft - 25) -20, this.y, 'left')){

            this.lengthLeft += -0.105 * deltaTime * 2;

            let brickId = stockCons(brick, this.x - (-this.lengthLeft - 25) - 20 + 5, this.y, 'left')
            if(brickId){

                brick.alive[brickId - 1] = false;
            }
        }
        if(!stockCons(stock, this.x + 25 + this.lengthRight - 50 + 20, this.y, 'right')){

            this.lengthRight += 0.105 * deltaTime * 2;

            let brickId = stockCons(brick, this.x + 25 + this.lengthRight - 50 + 20 - 5, this.y, 'right')
            if(brickId){

                brick.alive[brickId - 1] = false;
            }
        }


        if(this.lengthDown >= 105 || this.lengthRight >= 105 ||
            this.lengthUp <= -105 || this.lengthLeft <= -105){

            this.state = 'finish';
            this.timer = 0;

            // 四个方向上清空
            bombCtx.clearRect(-25, -25, 50, 50);
            bombCtx.clearRect(-25, -25, 50, -100);
            bombCtx.clearRect(-25, 25, 50, 100);
            bombCtx.clearRect(25, -25, 100, 50);
            bombCtx.clearRect(-25, -25, -100, 50);
        }
    }

    switch (this.state){

        case 'ready':
            bombCtx.fillStyle = 'black';
            bombCtx.beginPath();
            bombCtx.arc(0, 5, 16, 0, Math.PI * 2);
            bombCtx.fill();
            bombCtx.moveTo(0, 5);
            bombCtx.quadraticCurveTo(-20, -20, 15, -20);
            bombCtx.stroke();
            break;
        case 'bombing':
            bombCtx.lineWidth = 40;
            bombCtx.strokeStyle = 'red';
            bombCtx.lineCap = 'round';
            bombCtx.beginPath();
            bombCtx.moveTo(0, 0);
            bombCtx.lineTo(0, this.lengthUp);
            bombCtx.moveTo(0, 0);
            bombCtx.lineTo(0, this.lengthDown);
            bombCtx.moveTo(0, 0);
            bombCtx.lineTo(this.lengthLeft, 0);
            bombCtx.moveTo(0, 0);
            bombCtx.lineTo(this.lengthRight, 0);
            bombCtx.stroke();
            break;
    }

    bombCtx.restore();

}