public without sharing class Lookup {

    @AuraEnabled(cacheable=true)  
   public static List<sobject> findRecords(String searchKey, String objectName) {  
     string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';  
     string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText;  
     return Database.query(query);  
   }  
}