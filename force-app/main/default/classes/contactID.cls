public with sharing class contactID {
    
        @AuraEnabled(cacheable=true)
            public static Account getContactTransactions(String contactId){
        try{
            Account personAccountTransactions;
			personAccountTransactions = [SELECT ID,Name  FROM Account
                                        WHERE Id = :contactId  
			                   			LIMIT 1];
			
			return personAccountTransactions;
            
        }catch(Exception ex){
            System.debug(ex.getMessage());
        }
        return null;
    }
    
}