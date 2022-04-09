import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureTower, StructureContainer  } from '/game/prototypes';
import { RESOURCE_ENERGY } from '/game/constants';
// import { } from '/arena';


export function loop() {
    const creeps = getObjectsByPrototype(Creep);
    const myCreeps = creeps.filter(creep => creep.my);
    const enemyCreep = creeps.find(creep => !creep.my);
    const towers = getObjectsByPrototype(StructureTower);
    const container = getObjectsByPrototype(StructureContainer)[0];

    towers.forEach(tower => {
        if(tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            myCreeps.forEach(myCreep => {
                if(myCreep.store[RESOURCE_ENERGY] == 0) {
                    console.log("Creep withdraw energy");
                    myCreep.withdraw(container, RESOURCE_ENERGY);
                } else {
                    console.log("Creep transfer energy to tower");
                    myCreep.transfer(tower, RESOURCE_ENERGY);
                }
            });
        }
        if(tower.store[RESOURCE_ENERGY] >= 10) {
            console.log("Tower cooldown: " + tower.cooldown);
            if(tower.cooldown == 0) {
                console.log("Tower Attack!")
                tower.attack(enemyCreep);
            }
        }
    });
}
