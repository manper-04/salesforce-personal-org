public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Industry, NumberOfEmployees, progress__c, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry 
        FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(Integer offSetCount){
        List<Opportunity> opportunityList = [SELECT Id ,Name FROM Opportunity
        order by Name asc LIMIT 10 OFFSET :offSetCount
                                     ];
        return opportunityList;
    }
}