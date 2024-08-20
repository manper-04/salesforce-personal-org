public class pokeapiREST {
    @AuraEnabled(cacheable=true)
    public static String getCallout(String pokeId) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://pokeapi.co/api/v2/pokemon/'+ pokeId);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        return response.getBody();
    }
}