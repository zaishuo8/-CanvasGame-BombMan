/**
 * Created by xuting on 2017/3/29.
 */


function hitMonster() {

    for(let i = 0; i < monsters.num; i++){

        if(monsters.alive[i]){

            bombs.bombsArray.forEach(function (bomb, key) {

                if(bomb.state == 'bombing'){

                    if ((monsters.x[i] > bomb.x - 50) &&
                        (monsters.x[i] < bomb.x + 50) &&
                        (monsters.y[i] > bomb.y + bomb.lengthUp - 45) &&
                        (monsters.y[i] < bomb.y + bomb.lengthDown + 45))
                    {

                        monsters.alive[i] = false;
                    }

                    if ((monsters.x[i] > bomb.x + bomb.lengthLeft - 45) &&
                        (monsters.x[i] < bomb.x + bomb.lengthRight + 45) &&
                        (monsters.y[i] > bomb.y - 50) &&
                        (monsters.y[i] < bomb.y + 50))
                    {

                        monsters.alive[i] = false;
                    }
                }
            });
        }
    }
}