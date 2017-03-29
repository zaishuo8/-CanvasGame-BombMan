/**
 * Created by xuting on 2017/3/29.
 */


function hitHero() {

    // 炸弹击中 hero
    bombs.bombsArray.forEach(function (bomb) {

        if(bomb.state == 'bombing'){

            if ((hero.x > bomb.x - 50) &&
                (hero.x < bomb.x + 50) &&
                (hero.y > bomb.y + bomb.lengthUp - 45) &&
                (hero.y < bomb.y + bomb.lengthDown + 45))
            {

                // 游戏结束
                gameState = 'gameover';
                console.log('gameover');
            }

            if ((hero.x > bomb.x + bomb.lengthLeft - 45) &&
                (hero.x < bomb.x + bomb.lengthRight + 45) &&
                (hero.y > bomb.y - 50) &&
                (hero.y < bomb.y + 50))
            {

                // 游戏结束
                gameState = 'gameover';
                console.log('gameover');
            }
        }
    });


    // 幽灵碰到 hero
    for(let i = 0; i < monsters.num; i++){

        if(monsters.alive[i]){

            if(monsters.x[i] == hero.x){

                if((monsters.y[i] > hero.y - 50) && (monsters.y[i] < hero.y + 50)){

                    gameState = 'gameover';
                    console.log('gameover');
                }

            }

            if(monsters.y[i] == hero.y){

                if((monsters.x[i] > hero.x - 50) && (monsters.x[i] < hero.x + 50)){

                    gameState = 'gameover';
                    console.log('gameover');
                }
            }

        }
    }
}