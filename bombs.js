/**
 * Created by xuting on 2017/3/28.
 */

function bombObj() {

    this.bombsArray;
    this.numLimit;
}

bombObj.prototype.init = function () {

    this.bombsArray = [];
    this.numLimit = 3;

}

bombObj.prototype.newBomb = function (x, y) {

    // 最多同时存在三个炸弹
    if(this.bombsArray.length < this.numLimit){

        // 将炸弹生到 方格 内
        if(nearFivty(x) && nearFivty(y)){

            this.bombsArray.push(new bomb(nearFivty(x), nearFivty(y)));
        }
    }

}

bombObj.prototype.draw = function () {

    // 清理 bomb
    for (let i = 0; i < this.bombsArray.length; i++){

        if(this.bombsArray[i].state == 'finish'){

            this.bombsArray.splice(i, 1);
            i--;

        }else{

            this.bombsArray[i].draw();
        }
    }


}