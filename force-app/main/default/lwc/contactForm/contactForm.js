import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { publish, MessageContext } from 'lightning/messageService';
import channel from '@salesforce/messageChannel/messageChannels__c';


export default class ContactForm extends LightningElement {

    @wire(MessageContext)
    messageContext;

    handleSuccess(){
        const event = new ShowToastEvent({
            title: 'Exito',
            message: 'Contacto creado exitosamente',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);

        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if ( inputFields ) {
            inputFields.forEach( field => {
                field.reset();
            } );
        }
        publish(this.messageContext, channel);
    }
}