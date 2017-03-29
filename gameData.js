/**
 * Created by xuting on 2017/3/29.
 */

function gameDataObj() {

    this.timer = 0;
    this.count = 3;

    this.y = 0;
}

gameDataObj.prototype.draw = function () {

    if(gameState == 'ready'){

        this.timer += deltaTime;
        if(this.timer >= 1000){

            if(this.count > 0){

                this.count--;
                this.timer = 0;
            }
        }
        if(this.count <= 0){

            this.count = 0;
            gameState = 'gaming';
        }

        cbgCtx.save();
        cbgCtx.clearRect(0, 0, 1250, 850);
        cbgCtx.font = "200px Consolas";
        cbgCtx.fillStyle = 'black';
        cbgCtx.fillText(this.count, 550, 450);
        cbgCtx.restore();
    }

    if(gameState == 'gameover'){

        cbgCtx.save();
        bombCtx.clearRect(0, 0, 1250, 850);
        cbgCtx.clearRect(0, 0, 1250, 850)
        cbgCtx.font = "50px Consolas";
        cbgCtx.fillStyle = 'black';
        cbgCtx.fillText('GAME OVER', 450, 450);
        cbgCtx.restore();
    }

    if(gameState == 'win'){

        cbgCtx.save();
        bombCtx.clearRect(0, 0, 1250, 850);
        cbgCtx.clearRect(0, 0, 1250, 850)
        cbgCtx.font = "80px Consolas";
        cbgCtx.fillStyle = 'black';
        cbgCtx.fillText('WIN', 500, 450);
        cbgCtx.restore();
    }
}