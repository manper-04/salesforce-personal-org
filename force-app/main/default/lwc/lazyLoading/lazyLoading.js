import { LightningElement, track, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/AccountController.getOpportunities';

const columns = [
    { label: 'Id', fieldName: 'Id', type: 'text' },
    { label: 'Name', fieldName: 'Name', type: 'text'}
  
];

export default class LazyLoading extends LightningElement {

    columns = columns;
    data = [];
    error;
    totalNumberOfRows = 35; // stop the infinite load after this threshold count    
    offSetCount = 0;
    loadMoreStatus;
    targetDatatable; // capture the loadmore event to fetch data and stop infinite loading

    connectedCallback() {
        //Get initial chunk of data with offset set at 0
        this.getRecords();
    }

    getRecords() {
        getOpportunities({ offSetCount: this.offSetCount })
            .then(result => {
                // Returned result if from sobject and can't be extended so objectifying the result to make it extensible
                result = JSON.parse(JSON.stringify(result));
                result.forEach(record => {
                    record.linkAccount = '/' + record.Id;
                });
                this.data = [...this.data, ...result];
                this.error = undefined;
                this.loadMoreStatus = '';
                if (this.targetDatatable && this.data.length >= this.totalNumberOfRows) {
                    //stop Infinite Loading when threshold is reached
                    this.targetDatatable.enableInfiniteLoading = false;
                    //Display "No more data to load" when threshold is reached
                    this.loadMoreStatus = 'No more data to load';
                }
                //Disable a spinner to signal that data has been loaded
                if (this.targetDatatable) this.targetDatatable.isLoading = false;
            })
            .catch(error => {
                this.error = error;
                this.data = undefined;
                console.log('error : ' + JSON.stringify(this.error));
            });
    }

    // Event to handle onloadmore on lightning datatable markup
    handleLoadMore(event) {
        event.preventDefault();
        // increase the offset count by 20 on every loadmore event
        this.offSetCount = this.offSetCount + 20;
        //Display a spinner to signal that data is being loaded
        event.target.isLoading = true;
        //Set the onloadmore event taraget to make it visible to imperative call response to apex.
        this.targetDatatable = event.target;
        //Display "Loading" when more data is being loaded
        this.loadMoreStatus = 'Loading';
        // Get new set of records and append to this.data
        this.getRecords();
    }
}