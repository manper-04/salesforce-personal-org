import { LightningElement, track, wire} from 'lwc';
import getInformationContact from '@salesforce/apex/CaseManager.getInformationContact';



export default class CreateAccount extends LightningElement {
    // @track firstname;
    // @track lastname;
    // @track email = '';
    // @track respuesta;

    // handleFirstName(event) {
    //     this.firstname = event.target.value;
       
    // }
    // handleLastName(event) {
    //     this.lastname = event.target.value;
       
    // }
    // handleEmail(event) {
    //     this.email = event.target.value;
    //     const respuesta = event.target.value;
        
    //         this.respuesta = respuesta;
       
    // }
   

    // hacerclick() {
    //     console.log(this.firstname);
    //     console.log(this.lastname);
    //     console.log(this.email);
       
      
        
       
    // }
    @track searchKey = '';
    @wire(getInformationContact, { searchKey: '$searchKey' })
    contacts;

    handleKeyChange(event) {
        // Debouncing this method: Do not update the reactive property as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        
        const searchKey = event.target.value;
        
            this.searchKey = searchKey;
      
    }
    

    

    
}