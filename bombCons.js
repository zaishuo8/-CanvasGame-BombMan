/**
 * Created by xuting on 2017/3/29.
 */
/*
*
* 判断是否被炸弹挡住去路
*
* x, y : 被比较的坐标
* deir : 被比较的方向
* 返回值 : 被挡住,返回 true
*         没被挡住, 返回 false
*
* */

function bombCons(x, y, deir) {

    let result = false;

    bombs.bombsArray.forEach(function (bomb, key) {

        if(bomb.state == 'ready'){

            switch (deir){

                case 'up':
                    if(x == bomb.x){

                        let dy = y - bomb.y;

                        if(dy >=0 && dy <= 50){

                            result = true;
                        }
                    }
                    break;
                case 'down':
                    if(x == bomb.x){

                        let dy = y - bomb.y;
                        if(dy < 0 && dy > -50){

                            result = true;
                        }
                    }
                    break;
                case 'left':
                    if(y == bomb.y){

                        let dx = x - bomb.x;
                        if(dx >= 0 && dx <=50){

                            result = true;
                        }
                    }
                    break;
                case 'right':
                    if(y == bomb.y){

                        let dx = x - bomb.x;
                        if(dx >= -50 && dx <= 0){

                            result = true;
                        }
                    }
                    break;
            }
        }
    });

    return result;
}