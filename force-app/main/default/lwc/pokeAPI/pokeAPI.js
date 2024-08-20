import { LightningElement, wire, track } from 'lwc';
import getCallout from '@salesforce/apex/pokeapiREST.getCallout';
import IMAGES from "@salesforce/resourceUrl/background";

export default class PokeAPI extends LightningElement {

    backgroundImage = IMAGES;

    get getBackgroundImage(){
        return `background-image:url("${this.backgroundImage}")`;
    }
    @track spriteFront = '';
    @track spriteBack = '';
    @track pokeId = '';
    @track pokeName = '';
    @track pokeType = '';
    @track pokeHP = '';
    @track pokeAttack = '';
    @track pokeDefense = '';
    @track pokeSpAtk = '';
    @track pokeSpDef = '';
    @track pokeSpeed = '';
    @track ability1 = '';
    @track ability2 = '';
    @track numberValue;
    @track disabledButton = true;
    @track showDetails = false;
    @track showError = false;
    @track error = '';
    @track showSpinner = false;
    

    handleOnChange(event) {
        this.numberValue = event.target.value.trim();
        console.log(this.numberValue);
        if(this.numberValue !== '') {
            this.disabledButton = false;
        } else {
            this.disabledButton = true;
        }

    }

    async handleClick() {
        this.showSpinner = true;
		try {
			let response = await getCallout({ pokeId: this.numberValue });
            let jsonParse = JSON.parse(response);
            this.spriteFront = jsonParse.sprites.other['official-artwork'].front_default;
            //this.spriteFront = jsonParse.sprites.versions['generation-v']['black-white'].animated.front_default;
            //this.spriteBack = jsonParse.sprites.versions['generation-v']['black-white'].animated.back_default;
            this.showDetails = true;
            this.pokeName = jsonParse.name.charAt(0).toUpperCase() + jsonParse.name.slice(1);
            this.pokeId = jsonParse.id;
            this.pokeType = (jsonParse.types[1]) !== undefined ? jsonParse.types[0].type.name + ' / ' + jsonParse.types[1].type.name : jsonParse.types[0].type.name;
            this.pokeHP = jsonParse.stats[0].base_stat;
            this.pokeAttack = jsonParse.stats[1].base_stat;
            this.pokeDefense = jsonParse.stats[2].base_stat;
            this.pokeSpAtk = jsonParse.stats[3].base_stat;
            this.pokeSpDef = jsonParse.stats[4].base_stat;
            this.pokeSpeed = jsonParse.stats[5].base_stat;
            this.ability1 = jsonParse.abilities[0].ability.name;
            this.ability2 = (jsonParse.abilities[1]) !== undefined ? jsonParse.abilities[1].ability.name : '';
            this.showError = false;
            this.showSpinner = false;
			
		} catch (error) {
			console.error(error);
            this.showDetails = false;
            this.showError = true;
            this.error = error;
            this.showSpinner = false;
		}
	}

    async handleClickRandom() {
        this.showSpinner = true;
        var randomNumber = Math.floor(Math.random() * 905) + 1;
		try {
			let response = await getCallout({ pokeId: randomNumber });
            let jsonParse = JSON.parse(response);
            this.spriteFront = jsonParse.sprites.other['official-artwork'].front_default;
            //this.spriteFront = jsonParse.sprites.versions['generation-v']['black-white'].animated.front_default;
            //this.spriteBack = jsonParse.sprites.versions['generation-v']['black-white'].animated.back_default;
            this.showDetails = true;
            this.pokeName = jsonParse.name.charAt(0).toUpperCase() + jsonParse.name.slice(1);
            this.pokeId = jsonParse.id;
            this.pokeType = (jsonParse.types[1]) !== undefined ? jsonParse.types[0].type.name + ' / ' + jsonParse.types[1].type.name : jsonParse.types[0].type.name;
            this.pokeHP = jsonParse.stats[0].base_stat;
            this.pokeAttack = jsonParse.stats[1].base_stat;
            this.pokeDefense = jsonParse.stats[2].base_stat;
            this.pokeSpAtk = jsonParse.stats[3].base_stat;
            this.pokeSpDef = jsonParse.stats[4].base_stat;
            this.pokeSpeed = jsonParse.stats[5].base_stat;
            this.ability1 = jsonParse.abilities[0].ability.name;
            this.ability2 = (jsonParse.abilities[1]) !== undefined ? jsonParse.abilities[1].ability.name : '';
            this.showError = false;
            this.showSpinner = false;
			
		} catch (error) {
			console.error(error);
            this.showDetails = false;
            this.showError = true;
            this.error = error;
            this.showSpinner = false;
		}
	}

    

}