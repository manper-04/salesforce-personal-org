import { LightningElement, track , wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import CONTACT_LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import CASE_OBJECT from '@salesforce/schema/Case';
import CASE_CONTACTID_FIELD from '@salesforce/schema/Case.ContactId';
import CASE_CITY_FIELD from '@salesforce/schema/Case.ciudad__c';
import CASE_CINEMA_FIELD from '@salesforce/schema/Case.cinema__c';
import getInformationContact from '@salesforce/apex/testClass.getInformationContact';
import getCinemasCatalog from '@salesforce/apex/CinepolisService_MainController.getCinemasCatalog';

export default class CinepolisService_WebToCase extends LightningElement {

   
    
    @track error;
    @track cities = [];

    // ---- STORE THE CONTACT ID  //

    @track contact;

    // ---- STORE THE CONTACT ID  //

    // -----INPUT VALUES------ //

    
    @track firstName;
    @track lastName;
    @track motherLastName;
    @track email;
    @track birthdate;
    @track phone;
    @track city;
    @track theater;
    @track typeOfComment;
    @track typeOfCommentQuejasArea;
    @track typeOfCommentSugerenciasInformacionFelicitacionArea;
    @track complainTypeQuejas;
    @track digitCard;
    @track dateOfPurchase;
    @track hourOfPurchase;

     // -----INPUT VALUES------ //

     // ----- COMBOBOX //
     
    @track typeOfCommentQuejasAreaBoolean = false;
    @track typeOfCommentSugerenciasInformacionFelicitacionAreaBoolean = false;
    @track complainTypeBoolean = false;
    @track dataCardBoolean = false;

     // ----- COMBOBOX //

    // ----- COMBOBOX OPTIONS //

    @track citiesOptions =[];
    @track mTheaters = [{
            value: 'Macroplaza',
            label: 'Macroplaza'
        }
    ];
    @track typeOfCommentOptions = [{
            value: 'Quejas',
            label: 'Quejas'
        },
        {
            value: 'Sugerencias',
            label: 'Sugerencias'
        },
        {
            value: 'Dudas Informacion',
            label: 'Dudas / Información'
        },
        {
            value: 'Felicitaciones',
            label: 'Felicitaciones'
        }
    ];
    @track typeOfCommentAreaOptions = [{
            value: 'Aplicacion movil Sitio Web',
            label: 'Aplicación Movil / Sitio Web'
        },
        {
            value: 'Atencion a Clientes',
            label: 'Atención a Clientes'
        },
        {
            value: 'Cinecash y o Cinepass',
            label: 'Cinecash y/o Cinepass'
        },
        {
            value: 'Cinepolis KLIC',
            label: 'Cinepolis KLIC'
        },
        {
            value: 'Club Cinepolis',
            label: 'Club Cinépolis'
        }
    ];
    @track areaSugerenciasFelicitacionesDudasOptions;
    @track complainTypeQuejasOptions;
    @track complainTypeSugerenciasFelicitacionesDudasOptions;

    // ----- COMBOBOX OPTIONS //

    //----- Function to validate date //


    connectedCallback() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        this.today = year + "-" + month + "-" + day;
        this.todayP = year + "-" + month + "-" + day;
      
    }

    //----- Function to validate date //
        
    typeOfCommentSelect(event) {
        this.typeOfComment = event.detail.value;
        if(this.typeOfComment === 'Quejas'){
            this.typeOfCommentQuejasAreaBoolean = true;
            this.typeOfCommentSugerenciasInformacionFelicitacionAreaBoolean = false;
        }else if(this.typeOfComment === 'Sugerencias' || this.typeOfComment === 'Dudas Informacion'){
            this.digitCard = '';   
            this.dateOfPurchase = '';   
            this.hourOfPurchase = '';  
            this.dataCardBoolean = false;
            this.typeOfCommentQuejasAreaBoolean = false;
            this.complainTypeBoolean = false;
            this.typeOfCommentSugerenciasInformacionFelicitacionAreaBoolean = true;
            this.areaSugerenciasFelicitacionesDudasOptions = [{
                    value: 'Cinecash Cinepass',
                    label: 'Cinecash / Cinepass'
                },
                {
                    value: 'Club Cinepolis',
                    label: 'Club Cinépolis'
                },
                {
                    value: 'Descuentos y o promociones',
                    label: 'Descuentos y/o promociones'
                },
                {
                    value: 'Dulceria Promocionales',
                    label: 'Dulcería/Promocionales'
                },
                {
                    value: 'Facturacion electronica',
                    label: 'Facturación electrónica'
                },
                {
                    value: 'Formatos',
                    label: 'Formatos'
                },
                {
                    value: 'Funcion de medianoche',
                    label: 'Función de medianoche'
                },
                {
                    value: 'Fundacion Cinepolis',
                    label: 'Fundación Cinépolis'
                },
                {
                    value: 'Garantia Cinepolis',
                    label: 'Garantía Cinépolis'
                },
                {
                    value: 'Mas que Cine',
                    label: 'Más que Cine'
                },
                {
                    value: 'Pase Anual',
                    label: 'Pase Anual'
                },
                {
                    value: 'Preventas y preestrenos',
                    label: 'Preventas y preestrenos'
                },
                {
                    value: 'Programacion de Carteleras',
                    label: 'Programación de Carteleras'
                },
                {
                    value: 'Proximos estrenos',
                    label: 'Próximos estrenos'
                },
                {
                    value: 'Publicidad',
                    label: 'Publicidad'
                },
                {
                    value: 'Renta de sala',
                    label: 'Renta de sala'
                },
                {
                    value: 'Reservacion',
                    label: 'Reservación'
                },
                {
                    value: 'Restricciones de edad',
                    label: 'Restricciones de edad'
                },
                {
                    value: 'Sala de arte',
                    label: 'Sala de arte'
                },
                {
                    value: 'Salas',
                    label: 'Salas'
                },
                {
                    value: 'Tareas escolares',
                    label: 'Tareas escolares'
                },
                {
                    value: 'Vacantes laborales',
                    label: 'Vacantes laborales'
                },
                {
                    value: 'Ventas corporativas',
                    label: 'Ventas corporativas'
                },
                {
                    value: 'Verificacion de datos',
                    label: 'Verificación de datos'
                }
                
            ];
            
        }
        else if(this.typeOfComment === 'Felicitaciones' ){
            this.digitCard = '';   
            this.dateOfPurchase = '';   
            this.hourOfPurchase = '';  
            this.dataCardBoolean = false;
            this.typeOfCommentQuejasAreaBoolean = false;
            this.complainTypeBoolean = false;
            this.typeOfCommentSugerenciasInformacionFelicitacionAreaBoolean = true;
            this.areaSugerenciasFelicitacionesDudasOptions = [{
                    value: 'Descuentos y o promociones',
                    label: 'Descuentos y/o promociones'
                },
                {
                    value: 'Dulceria Promocionales',
                    label: 'Dulcería/Promocionales'
                },
                {
                    value: 'Facturacion electronica',
                    label: 'Facturación electrónica'
                },
                {
                    value: 'Formatos',
                    label: 'Formatos'
                },
                {
                    value: 'Funcion de medianoche',
                    label: 'Función de medianoche'
                },
                {
                    value: 'Fundacion Cinepolis',
                    label: 'Fundación Cinépolis'
                },
                {
                    value: 'Pase Anual',
                    label: 'Pase Anual'
                },
                {
                    value: 'Preventas y preestrenos',
                    label: 'Preventas y preestrenos'
                },
                {
                    value: 'Programacion de Carteleras',
                    label: 'Programación de Carteleras'
                },
                {
                    value: 'Proximos estrenos',
                    label: 'Próximos estrenos'
                },
                {
                    value: 'Publicidad',
                    label: 'Publicidad'
                },
                {
                    value: 'Renta de sala',
                    label: 'Renta de sala'
                },
                {
                    value: 'Reservacion',
                    label: 'Reservación'
                },
                {
                    value: 'Restricciones de edad',
                    label: 'Restricciones de edad'
                },
                {
                    value: 'Sala de arte',
                    label: 'Sala de arte'
                },
                {
                    value: 'Salas',
                    label: 'Salas'
                },
                {
                    value: 'Tareas escolares',
                    label: 'Tareas escolares'
                },
                {
                    value: 'Vacantes laborales',
                    label: 'Vacantes laborales'
                },
                {
                    value: 'Ventas corporativas',
                    label: 'Ventas corporativas'
                },
                {
                    value: 'Verificacion de datos',
                    label: 'Verificación de datos'
                },
                {
                    value: 'Otra Felicitacion',
                    label: 'Otra Felicitación'
                }
                
            ];
            
        }
        if(this.typeOfComment === 'Sugerencias'){
            this.areaSugerenciasFelicitacionesDudasOptions.push({
                
                    value: 'Otra Sugerencia',
                    label: 'Otra Sugerencia'
                
            })
        }
        else if(this.typeOfComment === 'Dudas Informacion'){
            this.areaSugerenciasFelicitacionesDudasOptions.push({
                
                    value: 'Otra Informacion',
                    label: 'Otra Información'
                
            })
          
        }  
    }
    typeOfCommentQuejasAreaSelect(event){
        this.typeOfCommentSugerenciasInformacionFelicitacionArea = '';  
        this.digitCard = '';   
        this.dateOfPurchase = '';   
        this.hourOfPurchase = '';   
        this.typeOfCommentQuejasArea = event.detail.value;
        if(this.typeOfCommentQuejasArea === 'Aplicacion movil Sitio Web' ){
                this.complainTypeBoolean = true;
                if(this.complainTypeQuejas === 'Falta de Confirmacion (Clave)' || this.complainTypeQuejas === 'Cargo doble'){
                this.dataCardBoolean = true;
                }else{
                    this.dataCardBoolean = false;

                }
                this.complainTypeQuejasOptions = [{
                    value: 'Cargo doble',
                    label: 'Cargo Doble'
                },
                {
                    value: 'Cartelera',
                    label: 'Cartelera'
                },
                {
                    value: 'Experiencia',
                    label: 'Experiencia'
                },
                {
                    value: 'Falta de Confirmacion (Clave)',
                    label: 'Falta de Confirmación (Clave)'
                },
                {
                    value: 'Validacion de promociones',
                    label: 'Validación de Promociones'
                },
                {
                    value: 'Otras',
                    label: 'Otras'
                }
                
            ];
        }
        if(this.typeOfCommentQuejasArea === 'Atencion a Clientes'){
            if(this.complainTypeQuejas === 'Falta de Confirmacion (Clave)' || this.complainTypeQuejas === 'Cargo doble'){
                this.dataCardBoolean = true;
                }else{
                    this.dataCardBoolean = false;

                }
                this.complainTypeBoolean = true;
               
                this.complainTypeQuejasOptions = [{
                    value: 'Beneficios y Puntos Club Cinepolis',
                    label: 'Beneficios y Puntos Club Cinépolis'
                },
                {
                    value: 'Cargo doble',
                    label: 'Cargo Doble'
                },
                {
                    value: 'Cartelera',
                    label: 'Cartelera'
                },
                {
                    value: 'Experiencia',
                    label: 'Experiencia'
                },
                {
                    value: 'Falta de Confirmacion (Clave)',
                    label: 'Falta de Confirmación(Clave)'
                },
                {
                    value: 'Taquilla Dulceria',
                    label: 'Taquilla / Dulceria'
                },
                {
                    value: 'Validacion de promociones',
                    label: 'Validación de promociones'
                },
                {
                    value: 'Otras',
                    label: 'Otras'
                }
            ];  
        }
        if(this.typeOfCommentQuejasArea === 'Cinecash y o Cinepass'){
            if(this.complainTypeQuejas === 'Falta de Confirmacion (Clave)' || this.complainTypeQuejas === 'Cargo doble'){
                this.dataCardBoolean = true;
                }else{
                    this.dataCardBoolean = false;

                }
               
                this.complainTypeBoolean = true;
                this.complainTypeQuejasOptions = [{
                    value: 'Beneficios',
                    label: 'Beneficios'
                },
                {
                    value: 'Cargo doble',
                    label: 'Cargo doble'
                },
                {
                    value: 'No recibi mi contrasena',
                    label: 'No recibí mi contraseña'
                },
                {
                    value: 'Saldos',
                    label: 'Saldos'
                },
                {
                    value: 'Uso de la tarjeta',
                    label: 'Uso de la Tarjeta'
                },
                {
                    value: 'Otras',
                    label: 'Otras'
                }
                
            ]; 
        }
        if(this.typeOfCommentQuejasArea === 'Cinepolis KLIC'){
                this.complainTypeBoolean = true;
                this.dataCardBoolean = false;
                this.complainTypeQuejasOptions = [{
                    value: 'Cargos',
                    label: 'Cargos'
                },
                {
                    value: 'Dispositivos disponibles',
                    label: 'Dispositivos disponibles'
                },
                {
                    value: 'Experiencia',
                    label: 'Experiencia'
                },
                {
                    value: 'Fallas tecnicas',
                    label: 'Fallas técnicas'
                },
                {
                    value: 'Validacion de datos',
                    label: 'Validación de datos'
                },
                {
                    value: 'Otras',
                    label: 'Otras'
                }
                
            ];
        }
        if(this.typeOfCommentQuejasArea === 'Club Cinepolis'){
                this.complainTypeBoolean = true;
                this.dataCardBoolean = false;
                this.complainTypeQuejasOptions = [{
                    value: 'Abono de Puntos',
                    label: 'Abono de Puntos'
                },
                {
                    value: 'Beneficios',
                    label: 'Beneficios'
                },
                {
                    value: 'Consulta de Nivel',
                    label: 'Consulta de Nivel'
                },
                {
                    value: 'Consulta de Visitas',
                    label: 'Consulta de Visitas'
                },
                {
                    value: 'Duda de Membresia',
                    label: 'Duda de Membresía'
                }
                
            ];
        }
    }

    complainTypeQuejasSelect(event){
        this.complainTypeQuejas = event.detail.value;
        if(this.complainTypeQuejas === 'Falta de Confirmacion (Clave)' || this.complainTypeQuejas === 'Cargo doble'){
            this.dataCardBoolean = true;
        }else{
            this.dataCardBoolean = false;
            this.digitCard = '';   
            this.dateOfPurchase = '';   
            this.hourOfPurchase = '';   
        }
    }

    // ---- OBTAIN INPUT VALUES -- //

    handleFirstName(event) {
        this.firstName = event.target.value;   
    }
    handleLastName(event) {
        this.lastName = event.target.value;   
    }
    handleMotherLastName(event) {
        this.motherLastName = event.target.value;   
    }
    handleEmail(event) {
        this.email = event.target.value;   
    }
    handleBirthdate(event) {
        this.birthdate = event.target.value;   
    }
    handlePhone(event) {
        this.phone = event.target.value;   
    }
    handleCity(event) {
        this.city = event.target.value;   
    }
    handleTheater(event) {
        this.theater = event.target.value;   
    }
    typeOfCommentSugerenciasInformacionFelicitacionAreaSelect(event){
        this.typeOfCommentSugerenciasInformacionFelicitacionArea = event.target.value;
        this.typeOfCommentQuejasArea = '';  
        this.complainTypeQuejas = ''; 

    }
    handleDigitCard(event) {
        this.digitCard = event.target.value;   
    }
    handleDateOfPurchase(event) {
        this.dateOfPurchase = event.target.value;   
    }
    handleHourOfPurchase(event) {
        this.hourOfPurchase = event.target.value;   
    }
    handleCommentaries(event) {
        this.commentaries = event.target.value;   
    }

    // ---- OBTAIN INPUT VALUES --- //

    // @wire(getInformationContact, { email: '$email' })
    // getContact({ error, data }) {
    //     if (data) {
    //         this.contact = data;
    //         //console.log(this.contact)
    //         // this.error = undefined;
    //     } else if (error) {
    //         this.error = error; 
    //         this.contact = undefined;
    //         // console.log(this.contact);
    //     }
    // }
    @track mapData= [];
    @wire(getCinemasCatalog)
    getCinemas({ error, data }) {
        
        
        if (data) {
          for(var key in data){
            this.mapData.push({value:data[key], key:key}); //Here we are creating the array to show on UI.
        }
            
            console.log(data);
          console.log(this.mapData);
          console.log(this.typeOfCommentOptions);
        
           
            // this.error = undefined;
        } else if (error) {
            console.log('error');
            this.error = error; 
        }
    }
    
   
  
    handleClick(){
        if(this.contact === undefined){
            const fields = {};
            fields[CONTACT_PHONE_FIELD.fieldApiName] = this.phone;
            fields[CONTACT_LASTNAME_FIELD.fieldApiName] = this.firstName;
            fields[CONTACT_EMAIL_FIELD.fieldApiName] = this.email;
            //console.log(fields);
            const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(Contact => {
                    //console.log(Contact)
                    this.contact = Contact.id;  
                    this.createCase();
                })
                .catch(error => {
                    //console.log(JSON.stringify(error));
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating account ERROR',
                            message: error.body.message,
                            variant: 'error',
                        }),
                    );
                }); 

        }else{
            this.createCase();
        }
        
        
        // console.log(this.firstName);
        // console.log(this.lastName);
        // console.log(this.motherLastName);
        // console.log(this.email);
        // console.log(this.birthdate);
        // console.log(this.phone);
        // console.log(this.city);
        // console.log(this.theater);
        // console.log(this.typeOfComment);
        // console.log(this.typeOfCommentQuejasArea);
        // console.log(this.typeOfCommentSugerenciasInformacionFelicitacionArea);
        // console.log(this.complainTypeQuejas);
        // console.log(this.digitCard);
        // console.log(this.dateOfPurchase);
        // console.log(this.hourOfPurchase);
        // console.log(this.commentaries);

        
        }
        createCase() {
            const fields = {};
            fields[CASE_CONTACTID_FIELD.fieldApiName] = this.contact;
            fields[CASE_CITY_FIELD.fieldApiName] = this.city;
            fields[CASE_CINEMA_FIELD.fieldApiName] = this.theater;
            const recordInput = { apiName: CASE_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(Case => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'SUCCESS',
                            message: 'caso creado con exito',
                            variant: 'sucess',
                        }),
                    );
                   
    
                })      
        }        
}