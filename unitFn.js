/**
 * Created by xuting on 2017/3/28.
 */


/*
 *
 * 如果接近 50 的倍数 (40 - 65) (90 - 110), 则返回该最近的倍数
 * 负责返回 false
 *
 * */
function nearFivty(num) {

    // 取十位和个位
    let hundred = parseInt(num / 100);
    let tens = num - hundred * 100;
    // 可转向

    if(tens > 40 && tens < 60){

        // 调整到最近的 50 倍
        return hundred * 100 + 50;
    }

    if(tens > 90){

        return (hundred + 1) * 100;
    }

    if(tens < 10){

        return hundred * 100;
    }

    return false;
}