import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

const COLS = [
    {
        label: 'Name',
        fieldName: 'accountName',
        type: 'badge',
        sortable: true,
        typeAttributes: {
                    value: { 
                        fieldName: 'accountName' 
                    }
                },
        hideDefaultActions: true
    },
    {
        label: 'Number',
        fieldName: 'storeNumber',
        type: 'text',
        sortable: true,
        hideDefaultActions: true
    }
    // { 
    //     label: 'Account Name', type: 'customName',sortable: true,
    //     typeAttributes: {
    //         accountName: { 
    //             fieldName: 'Name' 
    //         }
    //     },
    // },
    // { 
    //     label: 'Employees', type: 'customNumber', fieldName: 'NumberOfEmployees',sortable: true,
    //     cellAttributes: {
    //         class: {fieldName: 'color'},
    //         alignment: 'center'
            
    //     }
    // }
];

export default class TestCustomDataTable extends LightningElement {
    columns = COLS;
    @track accounts = [];
    @track mapMarkers = [];
    @track markersTitle = 'Accounts';
    @track zoomLevel = 4;
    @track mapOptions = {
        draggable: true,
        disableDefaultUI: true,
    };
    @track sortedBy = 'Name';
    @track sortDirection = 'asc';

    @wire(getAccountList)
    wiredAccounts({error, data}) {
        if (error) {
        } else if (data) {
            this.accounts = data.map((record) => {
                return {
                    ...record,
                    accountName: record.Name,
                    storeNumber: record.NumberOfEmployees
                    
            }
                // this.mapMarkers = [
                //     {
                //         location: {
                //             City: record.BillingCity,
                //             Country: record.BillingCountry,
                //             PostalCode: record.BillingPostalCode,
                //             State: record.BillingState,
                //             Street: record.BillingStreet
                //         },
                //         icon: 'custom:custom26',
                //         title: record.Name,
                //     }
                //     ];
                // let color = record.NumberOfEmployees > 10000 ? 'slds-text-color_error' : '';
                // return {...record, 
                //     'color': color,
                //     'mapMarkers': this.mapMarkers,
                //     'mapOptions': this.mapOptions
                // }
            });  
        }
    }

    handleSort(event) {
        
        // this.changeLoadingStatus(true);
        // let sortedBy = event.detail.fieldName; 

        // this.sortedBy = sortedBy;
 
        // if(this.sortedBy==="storeId"){
        //     sortedBy = "storeNumber";
        // }
        // else if (this.sortedBy === "storeIdentification"){
        //     sortedBy = "storeName";
        //     this.sortedBy = "storeIdentification";
        // }
        // this.sortDirection = event.detail.sortDirection;
        
        // this.allUpcomingResetProjects = sortData(sortedBy, this.sortDirection, this.allUpcomingResetProjects);
        // this.filteredData = this.allUpcomingResetProjects.slice(this.offSet, this.lastIndex);
        // this.changeLoadingStatus(false);

        this.sortedBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.accounts = this.sortData(this.sortedBy, this.sortDirection, this.accounts);

        
    }

    sortData = (sortBy, direction, values, fieldName) => {
        // serialize the data before calling sort function
        let parseData = JSON.parse(JSON.stringify(values));
    
        let keyValue = (a) => {
            if(fieldName && fieldName === 'Account__r') {
                return a[fieldName].Name;
            }
            return a[sortBy];
        };
    
        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1 : -1;
        console.log(sortBy);
        //sorting by store number handling numbers only
        if (sortBy === 'storeId'|| sortBy === 'storeNumber' || sortBy === 'StoreNumber' || sortBy === 'Store_Number_EDW__c' || sortBy === 'Account__rStore_Number_EDW__c') {
            parseData.sort((x, y) => {
    
                if (keyValue(x) === 'UNKNOWN' ) {
                    x = 0.1 ;
                } else {
                    x = keyValue(x) ? keyValue(x).replace(/\D/g, '') : ''; // handling null values
                }
                if (keyValue(y) === 'UNKNOWN' ) {
                    y = 0.1 ;
                } else {
                    y = keyValue(y) ? keyValue(y).replace(/\D/g, '') : '';
                }
    
                if (isNaN(x)) {
                    return isReverse;
                } 
                if (isNaN(y)) {
                    return -1 * isReverse;
                }
    
                // sorting values based on direction, treat values as Numbers
                return isReverse * ((Number(x) > Number(y)) - (Number(y) > Number(x)));
    
            });
            
        } else if(sortBy === 'hasPlanogram') {
            let firstVal, secondVal;
            parseData.sort((x, y) => {
                firstVal = x && x.hasPlanogram && typeof x.hasPlanogram == 'boolean' ? x.hasPlanogram : false;
                secondVal = y && y.hasPlanogram && typeof y.hasPlanogram == 'boolean' ? y.hasPlanogram : false;
                return isReverse * ((Number(firstVal) > Number(secondVal)) - (Number(secondVal) > Number(firstVal)));
            });
        } else if(sortBy === 'welcomeEmailSent') {
            let firstVal, secondVal;
            parseData.sort((x, y) => {
                firstVal = x && x.welcomeEmailSent && typeof x.welcomeEmailSent == 'boolean' ? x.welcomeEmailSent : false;
                secondVal = y && y.welcomeEmailSent && typeof y.welcomeEmailSent == 'boolean' ? y.welcomeEmailSent : false;
                return isReverse * ((Number(firstVal) > Number(secondVal)) - (Number(secondVal) > Number(firstVal)));
            });
        } else {
            // sorting strings
            parseData.sort((x, y) => {
    
                if(keyValue(x)) {
                    x = keyValue(x).toLowerCase() ? keyValue(x).toLowerCase() : ''; // compare string in lower case
                } else {
                    x = keyValue(x) ? keyValue(x) : ''; // handling null values
                }
                if(keyValue(y)) {
                    y = keyValue(y).toLowerCase() ? keyValue(y).toLowerCase() : ''; // compare string in lower case
                } else {
                    y = keyValue(y) ? keyValue(y) : ''; // handling null values
                }
    
                // sorting values based on direction
                return isReverse * ((x > y) - (y > x));
            });
        }
        return parseData;
    };
}