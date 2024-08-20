public with sharing class CinepolisService_MainController {
   @AuraEnabled(cacheable=true)
	public static Map<String, List<CinemaCatalogeParser.Theaters>> getCinemasCatalog() {
		Map<String, List<CinemaCatalogeParser.Theaters>> cinemas = new Map<String, List<CinemaCatalogeParser.Theaters>> ();
		Http http = new Http();
		HttpRequest request = new HttpRequest();
		request.setEndpoint('https://mul-exp-cinemas-production.us-e1.cloudhub.io/v1/exp/cinemas');
		request.setMethod('GET');
		HttpResponse response = http.send(request);
		if (response.getStatusCode() == 200) {
			CinemaCatalogeParser parsedResponse = CinemaCatalogeParser.parse(response.getBody());
			for (CinemaCatalogeParser.catalog newCatalog : parsedResponse.catalog) {
				cinemas.put(newCatalog.city.name, newCatalog.city.theaters);
			}
		}
		return cinemas;
	}
}