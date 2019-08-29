import { Fight } from './Fight';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { ATTACK, BLOCK, CHARGE } from './actions';

const player1 = new Player({ id: 'ethan', name: 'Ethan' });
player1.setWEAPON({ name: 'axe', ATK: 20, CRIT: 20 });
player1.setARMOR({ name: 'silver shield', DEF: 5, AGL: 5 });
player1.addITEM({ name: 'healthy ring', HP: 10 });

const player2 = new Player({ id: 'jesse', name: 'Jesse' });
player2.setWEAPON({ name: 'dagger', ATK: 10, CRIT: 50 });
player2.setARMOR({ name: 'light armor', DEF: 0, AGL: 10 });
player2.addITEM({ name: 'power bracelet', ATK: 5 });

const atk1 = {
  name: 'wing attack',
  numberOfAttacks: 2,
  beforeAttack: () => console.log('WING ATTACK!! (2 hits)'),
};

const enemy1 = new Enemy({
  id: 'bat1',
  name: 'Bat',
  maxHP: 100,
  ATK: 10,
  CRIT: 5,
  DEF: 5,
  AGL: 5,
  attacks: [atk1],
});

const f = new Fight([player1, player2], enemy1);

const readOutHealth = () => {
  console.log('----------------');
  console.log(
    'player(s) health:',
    f.players.map(p => ({ [p.name]: p.currentHP })),
  );
  console.log('enemy health:', f.enemy.currentHP);
  console.log('----------------');
};

readOutHealth();
f.setPlayerAction('ethan', ATTACK);
f.setPlayerAction('jesse', ATTACK);
f.advanceTurn();
readOutHealth();
f.setPlayerAction('ethan', BLOCK);
f.setPlayerAction('jesse', ATTACK);
f.advanceTurn();
readOutHealth();
f.setPlayerAction('ethan', CHARGE);
f.setPlayerAction('jesse', CHARGE);
f.advanceTurn();
readOutHealth();
f.setPlayerAction('ethan', ATTACK);
f.setPlayerAction('jesse', ATTACK);
f.advanceTurn();
readOutHealth();
