import { LightningElement, api, track } from 'lwc';

export default class SspBadge extends LightningElement {
    @api value;
    @track showActive = false;
    @track showPlanned = false;
    @track showPast = false;
    @track showInReview = false;
    @track showFinalized = false;

    connectedCallback() {
        if(this.value.startsWith('E')) {
            this.showActive = true;
            this.showFinalized = false;
            this.showPlanned = false;
        } else if(this.value.startsWith('T')) {
            
            this.showActive = false;
            this.showFinalized = true;
            this.showPlanned = false;
        } else {
            this.showActive = false;
            this.showFinalized = false;
            this.showPlanned = true;
        }
        // alert(this.value);
        // if(this.value === 'Active') {
        //     this.showActive = true;
        //     this.showPlanned = false;
        //     this.showPast = false;
        //     this.showInReview = false;
        //     this.showFinalized = false;
        // }
        // if(this.value === 'Planned') {
        //     this.showActive = false;
        //     this.showPlanned = true;
        //     this.showPast = false;
        //     this.showInReview = false;
        //     this.showFinalized = false;
        // }
        // if(this.value === 'Past') {
        //     this.showActive = false;
        //     this.showPlanned = false;
        //     this.showPast = true;
        //     this.showInReview = false;
        //     this.showFinalized = false;
        // }
        // if(this.value === 'In Review') {
        //     this.showActive = false;
        //     this.showPlanned = false;
        //     this.showPast = false;
        //     this.showInReview = true;
        //     this.showFinalized = false;
        // }
        // if(this.value === 'Finalized') {
        //     this.showActive = false;
        //     this.showPlanned = false;
        //     this.showPast = false;
        //     this.showInReview = false;
        //     this.showFinalized = true;
        // }
    }
}