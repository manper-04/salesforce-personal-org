public with sharing class testClass {
    @AuraEnabled(cacheable=true)
    public static Id getInformationContact(String email){
        try{
            Contact contact = [SELECT Id FROM Contact WHERE Email = :email LIMIT 1];
            Id id = contact.Id;
            return id; 
        }catch(Exception ex){
            System.debug(ex.getMessage());
        }
            return null;
    } 
}