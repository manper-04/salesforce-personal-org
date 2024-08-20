import { LightningElement , wire, track, api} from 'lwc';
import CINE from '@salesforce/resourceUrl/member';
import getInformationContact from '@salesforce/apex/contactID.getContactTransactions';

export default class Vista360 extends LightningElement {

@track Id;
@api recordId;

member = CINE;
    @wire(getInformationContact, {contactId:'$recordId' })
    wiredContacts({ error, data }) {
        if (data) {
            this.Id = data.Id;
            //console.log(this.Id);
            this.error = undefined;
        } else if (error) {
            this.error = error;
           
        }
    }

    
    
    


}