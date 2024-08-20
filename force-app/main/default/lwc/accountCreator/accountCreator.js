import { LightningElement } from 'lwc';
import PDFJS from '@salesforce/resourceUrl/jspdf';
import PDFWORKER from '@salesforce/resourceUrl/pdfWorker'
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';


// Include pdf.js library


export default class AccountCreator extends LightningElement {

  loaded = false;

 

  renderedCallback() {

      if (this.loaded) return; // Ensures scripts are loaded only once

      this.loaded = true;



      Promise.all([

          loadScript(this,PDFJS),

          loadScript(this, PDFWORKER)
        

      ])

      .then(() => {

          console.log('JS files loaded successfully');
           

          // Your JS files are now loaded and ready to use

      })

      .catch(error => {

          console.error('Error loading JS files', error);

      });

  }

     async handleFileChange(event){

      const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        // Load the PDF file
        console.log('about to create file reader');
        let reader = new FileReader();
        reader.onloadend = async () => {
          pdfjsLib.GlobalWorkerOptions.workerSrc = PDFWORKER;
            let loadingTask = pdfjsLib.getDocument({data: reader.result});
            //
            loadingTask.promise.then(function (pdf) {
                console.log('PDF loaded');
            });
      // var file = ev.target.files[0];
      //       console.log(file);
      //       var reader = new FileReader();
            
      //       reader.onload =  async () => {
      //           var typedarray = new Uint8Array(reader.result);
      //           console.log(typedarray);
      //           pdfjsLib.GlobalWorkerOptions.workerSrc = PDFWORKER;

      //           const pdfDocument =  await pdfjsLib.getDocument(typedarray).promise;
      //           console.log(pdfDocument);
      //           console.log(pdfjsLib);
      //           console.log(pdfjsLib.getDocument(typedarray));
                
      //           pdfjsLib.getDocument(typedarray).promise.then(function(pdf){
      //             console.log('entro');
      //               var text = "";
      //               var numPages = pdf.numPages;
                    

      //               for(var i = 1; i <= numPages; i++){
      //                   pdf.getPage(i).then(function(page){
      //                       page.getTextContent().then(function(content){
      //                           content.items.forEach(function(item){
      //                               text += "<p>" + item.str + "</p>";
      //                           });
      //                       });
      //                   });
      //               }
                    

      //               setTimeout(function(){
      //                   console.log(text);
      //               }, 1000);
      //           }).catch(error => {

      //             console.log('errr', error);
        
      //         });
      //       };
            
      //       reader.readAsArrayBuffer(file);

      
}}}

  
    
  }
   