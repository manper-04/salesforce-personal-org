public class handlingErrorController {
    @AuraEnabled 
    public static wrapperAccount resetCase(string recordId){
        account cuenta = [SELECT id,name from account where id = '0011U00000BnmzNQAR'];
        wrapperAccount wrapperPrueba = new wrapperAccount();
        wrapperPrueba.AccountNumber = '123456';
        wrapperPrueba.Name = cuenta.Name;
        wrapperPrueba.Site = 'Sitio';
        wrapperPrueba.operacion = (Decimal)100 / 30;
        system.debug(wrapperPrueba);
        makeGetCallout();
        return wrapperPrueba;
		
    }
    
    @AuraEnabled(cacheable=true)
   public static List<Object> makeGetCallout() {
       String peticion = '1';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://pokeapi.co/api/v2/pokemon/' + peticion);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        system.debug(response);
       system.debug(response.getBody());
            // Deserializes the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
       system.debug(results);
            // Cast the values in the 'animals' key as a list
            List<Object> movimientos = (List<Object>) results.get('moves');
             //List<Object> movimiento = (List<Object>) movimientos.get('move');
             string json = JSON.serialize(movimientos);
              return null;
        
      
    }
    

}