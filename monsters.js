/**
 * Created by xuting on 2017/3/27.
 */

function monstersObj() {

    this.num;
    this.x;
    this.y;
    this.alive;

    this.deir;   // 移动方向
    this.speed;  // 移动速度
    this.bodyDer;  // 身体方向( 改变身体方向, 呈现动画 )

    this.bodytimer;  // 用来计时身体方向
    this.deirTimer;  // 用来计时移动方向
}

monstersObj.prototype.init = function () {

    this.num = 18;
    this.x = [];
    this.y = [];
    this.alive = [];
    this.deir = [];
    this.speed = 0.05;
    this.bodyDer = [];

    this.bodytimer = 0;
    this.deirTimer = 0;


    for(let i = 0; i < this.num; i++){

        let x = (Math.floor(Math.random() * 23) + 1) * 50;
        let y = (Math.floor(Math.random() * 15) + 1) * 50;

        this.alive[i] = true;
        // 把重叠在砖块上的幽灵 设置为 false
        for(let j = 0; j < brick.num; j++){

            if(x == brick.x[j] && y == brick.y[j]){

                this.alive[i] = false;
                break;
            }
        }
        // 把重叠在石块上的幽灵 设置为 false
        for(let j = 0; j < stock.num; j++){

            if(x == stock.x[j] && y == stock.y[j]){

                this.alive[i] = false;
                break;
            }
        }

        this.x.push(x);
        this.y.push(y);

        this.deir.push(deirMap[Math.floor(Math.random() * 4)]);
        this.bodyDer.push(Math.random() > 0.5);
    }
}


monstersObj.prototype.draw = function () {


    // 根据计时器调整身体方向
    this.bodytimer += deltaTime;
    if( this.bodytimer > 500){

        for (let i = 0; i < this.num; i++){

            if(this.alive[i]){

                this.bodyDer[i] = !this.bodyDer[i];
            }

        }
        this.bodytimer = 0;
    }


    // 根据计时器调整移动方向
    this.deirTimer += deltaTime;
    if( this.deirTimer > 4000){

        for(let i = 0; i < this.num; i++){

            if(this.alive[i]){

                this.changeDeir(i);
            }

        }
        this.deirTimer = 0;
    }


    // 根据速度和方向调整位置
    for(let i = 0; i < this.num; i++){

        if(this.alive[i]){

            switch (this.deir[i]){

                case 'up':
                    // 判断是否被 石头、砖块、炸弹 挡住
                    if (!stockCons(stock, this.x[i], this.y[i], 'up') &&
                        !stockCons(brick, this.x[i], this.y[i], 'up') &&
                        !bombCons(this.x[i], this.y[i], 'up'))
                    {

                        this.y[i] -= this.speed * deltaTime;
                    }else {

                        monsters.changeDeir(i);
                    }
                    break;
                case 'down':
                    if (!stockCons(stock, this.x[i], this.y[i], 'down') &&
                        !stockCons(brick, this.x[i], this.y[i], 'down') &&
                        !bombCons(this.x[i], this.y[i], 'down'))
                    {

                        this.y[i] += this.speed * deltaTime;
                    }else {

                        monsters.changeDeir(i);
                    }
                    break;
                case 'left':
                    if(!stockCons(stock, this.x[i], this.y[i], 'left') &&
                        !stockCons(brick, this.x[i], this.y[i], 'left') &&
                        !bombCons(this.x[i], this.y[i], 'left'))
                    {

                        this.x[i] -= this.speed * deltaTime;
                    }else {

                        monsters.changeDeir(i);
                    }
                    break;
                case 'right':
                    if(!stockCons(stock, this.x[i], this.y[i], 'right') &&
                        !stockCons(brick, this.x[i], this.y[i], 'right') &&
                        !bombCons(this.x[i], this.y[i], 'right'))
                    {

                        this.x[i] += this.speed * deltaTime;
                    }else {

                        monsters.changeDeir(i);
                    }
                    break;

            }
        }

    }


    // 画出幽灵组
    for (let i = 0; i < this.num; i++){

        if(this.alive[i]){

            cbgCtx.save();
            cbgCtx.translate(this.x[i], this.y[i]);
            cbgCtx.fillStyle = '#3D3D3D';
            cbgCtx.strokeStyle = '#3D3D3D';
            cbgCtx.beginPath();

            /* --------------画身体----------------------------------------------*/
            if(this.bodyDer[i]){

                cbgCtx.arc(25, 12.5, 12.5, 0, Math.PI, true);
                cbgCtx.lineTo(0, 43.75);
                cbgCtx.arc(6.25, 43.75, 6.25, Math.PI, Math.PI * 2, true);
                cbgCtx.arc(18.75, 43.75, 6.25, Math.PI, Math.PI * 2, true);
                cbgCtx.arc(31.25, 43.75, 6.25, Math.PI, Math.PI * 2, true);
            }else{

                cbgCtx.arc(25, 12.5, 12.5, 0, Math.PI, true);
                cbgCtx.lineTo(12.5, 43.75);
                cbgCtx.arc(18.75, 43.75, 6.25, Math.PI, Math.PI * 2, true);
                cbgCtx.arc(31.25, 43.75, 6.25, Math.PI, Math.PI * 2, true);
                cbgCtx.arc(43.75, 43.75, 6.25, Math.PI, Math.PI * 2, true);
            }
            /* --------------画身体----------------------------------------------*/
            cbgCtx.fill();

            /* --------------画眼睛----------------------------------------------*/
            cbgCtx.fillStyle = '#F7F7F7';
            cbgCtx.moveTo(20.75, 12.5);
            cbgCtx.arc(18.75, 12.5, 2, 0, Math.PI * 2);
            cbgCtx.moveTo(33.25, 12.5);
            cbgCtx.arc(31.25, 12.5, 2, 0, Math.PI * 2);
            /* --------------画眼睛----------------------------------------------*/
            cbgCtx.closePath();
            cbgCtx.fill();

            cbgCtx.restore();
        }
    }

}


monstersObj.prototype.changeDeir = function (i) {

    if(nearFivty(this.x[i]) && nearFivty(this.y[i])){

        this.deir[i] = deirMap[Math.floor(Math.random() * 4)];

        /*
         *
         * 虽然每 4 秒改变方向, 4秒的移动距离是 200 ,刚好是 50 的倍数, 会在正确轨道上
         * 但是, 跑起来发现有 零点几 的误差 ( 可能是浮点数计算的问题? )
         * 所以,需要将 monster 的位置摆到最近的 整50 整100 的坐标上
         *
         * */

        this.x[i] = nearFivty(this.x[i]);
        this.y[i] = nearFivty(this.y[i]);
    }

}


monstersObj.prototype.ifKillAll = function () {

    let aliveNum = 0;

    for(let i = 0; i < this.num; i++){

        if(this.alive[i]) aliveNum++;
    }

    if(!aliveNum) gameState = 'win';
}


let deirMap = {

    0: 'up',
    1: 'down',
    2: 'left',
    3: 'right'
}

