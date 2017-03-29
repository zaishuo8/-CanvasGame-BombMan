/**
 * Created by xuting on 2017/3/28.
 */
/*
*
* obj : stock 或者 brick
* x : 被比较的 x 坐标
* y : 被比较的 y 坐标
* deir : 方向
*
* 返回值 : i + 1 : 被第 i + 1 石块挡住 ( 注意: 若被第 0 块, 则 0 也是 false, 所以用 i + 1);
*         false : 没被挡住
*
* */
function stockCons(sobj, x, y, deir) {

    for(let i = 0; i < sobj.num; i++){

        if(sobj.alive[i]){

            switch (deir){

                case 'up':
                    if(x == sobj.x[i]){

                        let dy = y - sobj.y[i];
                        if(dy >=0 && dy <= 50){

                            return i + 1;
                        }
                    }
                    break;
                case 'down':
                    if(x == sobj.x[i]){

                        let dy = y - sobj.y[i];
                        if(dy < 0 && dy > -50){

                            return i + 1;
                        }
                    }
                    break;
                case 'left':
                    if(y == sobj.y[i]){

                        let dx = x - sobj.x[i];
                        if(dx >= 0 && dx <=50){

                            return i + 1;
                        }
                    }
                    break;
                case 'right':
                    if(y == sobj.y[i]){

                        let dx = x - sobj.x[i];
                        if(dx >= -50 && dx <= 0){

                            return i + 1;
                        }
                    }
                    break;
            }
        }
    }

    return false;
}