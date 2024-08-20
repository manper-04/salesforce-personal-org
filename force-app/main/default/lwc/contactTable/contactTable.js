import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { refreshApex } from '@salesforce/apex';

import { subscribe, MessageContext } from 'lightning/messageService';
import channel from '@salesforce/messageChannel/messageChannels__c';


export default class ContactTable extends LightningElement {
    @track contactList;
    @track error;
    @track subscription = null;
    wiredAllData;

    @wire(MessageContext)
    messageContext;


    columns = [
        { label: 'FirstName', fieldName: 'FirstName' },
        { label: 'LastName', fieldName: 'LastName'},
        { label: 'Email', fieldName: 'Email'}
    ];


    connectedCallback() {
        this.handleSubscribe();
    }

    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, channel, () => {
            return refreshApex(this.wiredAllData);
        });
    }
   

    @wire(getContacts)
    wiredContacts(wireResult) {
        const { data, error } = wireResult;
        this.wiredAllData = wireResult;
        if (data) {
            this.contactList = data;
        } else if (error) {
            this.error = error;
        }
    }
}