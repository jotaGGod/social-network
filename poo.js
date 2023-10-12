const ApiError = require("./utils/ApiError");
const https = require("https");


class CsGoPlayer {
    #weapon;
    #money;
    #alive;
    #kills;

    constructor(weapon, money){ //atributos 
        this.#weapon = weapon;        
        this.#money = money;
        this.#alive = true;
        this.#kills = 0;
    };

    get kills(){ //método
        return this.#kills;
    };

    set kills(value){ //método
        this.#kills += value;       
    };

    interactWithBomb(){
        console.log("Are interacting with the bomb");
    };    
}

class CounterTerrorist extends CsGoPlayer{    
    constructor(weapon, money){
        super(weapon, money);
    };
    interactWithBomb(){
        console.log("Are defusing the bomb");
    };
}

/*
const jpk = new CsGoPlayer("M4A4", "Counter-Terrorist", 16000);
const varchar = new CsGoPlayer("AK-47", "Terrorist", 16000);
jpk.kills += 1;
jpk.interactWithBomb();

const gsAgra = new CounterTerrorist("USP", 800);
gsAgra.interactWithBomb();
*/

class Weapon {
    #name;
    #price;
    #ammunition;

    constructor(name, price, ammunition) {
        this.#name = name;
        this.#price = price;
        this.#ammunition = ammunition;
    }

    shot() {
        console.log(`${this.#name} is shooting`);
    }

    get price() {
        return this.#price;
    }

    set price(newPrice) {
        this.#price = newPrice;
    }

    get name() {
        return this.#name;
    }
}

class Rifle extends Weapon {
    constructor(name, price, ammunition) {
        super(name, price, ammunition);
    }

    get name() {
        return `${super.name} !!!!`;
    }

    shot() {
        console.log(`${super.name} vai poca`);
    }
}

const AK47 = new Weapon('AK47', 10000, 762);
const M4A4 = new Weapon('M4A4', 15000, 556);
const AUG = new Rifle('AUG', 18000, 556);

AK47.shot(); // Saída: "AK47 is shooting"
M4A4.shot(); // Saída: "M4A4 is shooting"
AUG.shot(); // Saída: "AUG vai poca"


