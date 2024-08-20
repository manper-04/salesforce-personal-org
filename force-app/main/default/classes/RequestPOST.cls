public class RequestPOST {
    public static void requestPOST(){
        Http http = new Http();
        HttpRequest request = new HttpRequest(); 
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('POST');
        
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBody('{"name":"shark"}');
        
        HttpResponse response = http.send(request);
        
        if(response.getStatusCode() != 201){
            System.debug('Status no esperado :c' + response.getStatusCode() + ' ' + response.getStatus());
            
        }else{
            System.debug(response.getBody());
        }
    }

}