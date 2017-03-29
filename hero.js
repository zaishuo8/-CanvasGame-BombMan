/**
 * Created by xuting on 2017/3/28.
 */

function heroObj() {

    this.x;
    this.y;

    this.deir;
    this.speed;

    this.keysdown;   // 用来储存按下的按钮
}

heroObj.prototype.init = function () {

    // 初始位置, 砖块已经留出来了
    this.x = 50;
    this.y = 50;

    this.deir = 'up';
    this.speed = 0.2;

    this.keysdown = {};
}

heroObj.prototype.draw = function () {


    // 根据 keysdown 修改 x ,y; 转向成功 并且 没有障碍物时,才能移动坐标
    if(87 in this.keysdown){
        if(this.changeDeir('up')){

            if ((!stockCons(stock, this.x, this.y, 'up')) &&
                (!stockCons(brick, this.x, this.y, 'up'))){

                this.y -= this.speed * deltaTime;
            }

        }
    }
    if(83 in this.keysdown){
        if(this.changeDeir('down')){

            if ((!stockCons(stock, this.x, this.y, 'down')) &&
                (!stockCons(brick, this.x, this.y, 'down'))){

                this.y += this.speed * deltaTime;
            }
        }
    }
    if(65 in this.keysdown){
        if(this.changeDeir('left')){

            if ((!stockCons(stock, this.x, this.y, 'left')) &&
                (!stockCons(brick, this.x, this.y, 'left'))){

                this.x -= this.speed * deltaTime;
            }
        }
    }
    if(68 in this.keysdown){
        if(this.changeDeir('right')){

            if ((!stockCons(stock, this.x, this.y, 'right')) &&
                (!stockCons(brick, this.x, this.y, 'right'))){

                this.x += this.speed * deltaTime;
            }
        }
    }


    cbgCtx.save();
    cbgCtx.translate(this.x + 25, this.y + 25);
    let heroImgObj = new Image();
    switch (this.deir){
        case 'up':
            heroImgObj.src = './herol.png';
            cbgCtx.rotate(Math.PI/2);
            cbgCtx.drawImage(heroImgObj, -25, -25);
            break;
        case 'down':
            heroImgObj.src = './herol.png';
            cbgCtx.rotate(-Math.PI/2);
            cbgCtx.drawImage(heroImgObj, -25, -25);
            break;
        case 'left':
            heroImgObj.src = './herol.png';
            cbgCtx.drawImage(heroImgObj, -25, -25);
            break;
        case 'right':
            heroImgObj.src = './heror.png';
            cbgCtx.drawImage(heroImgObj, -25, -25);
            break;
    }
    cbgCtx.restore();

}


/*
*
* return 'true' 表示转向成功, 'false' 表示转向失败
*
* */
heroObj.prototype.changeDeir = function (newDeir) {

    // 位置在整 50 倍的 附近才能改变方向, 并且改变方向后把 位置 微调至最近的 整 50 倍上
    switch (newDeir){
        case 'up':
            if(nearFivty(this.x)){

                this.deir = newDeir;

                this.x = nearFivty(this.x);

                return true;
            }
            break;
        case 'down':
            if(nearFivty(this.x)){

                this.deir = newDeir;
                this.x = nearFivty(this.x);

                return true;
            }
            break;
        case 'left':
            if(nearFivty(this.y)){

                this.deir = newDeir;
                this.y = nearFivty(this.y);

                return true;
            }
            break;
        case 'right':
            if(nearFivty(this.y)){

                this.deir = newDeir;
                this.y = nearFivty(this.y);

                return true;
            }
            break;

    }

    return false;

}


heroObj.prototype.throwBombListen = function () {

    window.addEventListener('keydown', (function (e) {

        if(e.keyCode == 75){

            bombs.newBomb(this.x, this.y);
        }
    }).bind(this), false);
}



heroObj.prototype.addListener = function () {

    window.addEventListener('keydown', (function(e){

        if(e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 65 || e.keyCode == 68){

            // 先清空, 不然同时按多个方向可以斜着移动
            this.keysdown = {};
            this.keysdown[e.keyCode] = true;
        }

    }).bind(this), false);

    window.addEventListener('keyup', (function(e){

        if(e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 65 || e.keyCode == 68){

            delete this.keysdown[e.keyCode];
        }

    }).bind(this), false);
}


