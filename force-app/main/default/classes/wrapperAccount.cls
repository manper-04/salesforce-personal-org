global class wrapperAccount {
    @AuraEnabled
    global String AccountNumber {get; set;}
    @AuraEnabled
    global String Site {get; set;}
    @AuraEnabled
    global String Name {get; set;}
    @AuraEnabled
    global Double operacion {get; set;}
}