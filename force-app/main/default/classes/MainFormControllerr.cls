public without sharing class MainFormControllerr {
    @AuraEnabled
    public static String createCase(String firstName,String lastName, String email,String phone,String typeOfComment,String commentaries,String caseOrigin,String city,String cinema){
        Contact contact = getContactInformation(email);
        if(contact == null){
            contact = createContact(firstName,lastName,email,phone);
            
        }
        System.debug(contact);
        Case  newCase = createCase(contact, caseOrigin, typeOfComment, commentaries,city,cinema);
        
        return newCase.Id;
    }
    
    public static Contact getContactInformation(String email){
        try{
        Contact contact = [SELECT id, FirstName,LastName,Name,Email FROM Contact WHERE Email = :email LIMIT 1];
        return contact;
        }catch(Exception e){}
        return null;
    }
    
    public static Contact createContact(String firstName,String lastName, String email,String phone){
        Contact newContact = new Contact();
        Database.DMLOptions dml = new DataBase.DMLOptions();
        dml.DuplicateRuleHeader.allowSave = true;
        dml.DuplicateRuleHeader.runAsCurrentUser = true;
        newContact.FirstName = firstName;
        newContact.LastName = lastName;
        newContact.Email = email;
        newContact.Phone = phone;
        DataBase.SaveResult sr = Database.insert(newContact,dml);
        //insert newContact;
        return newContact;
    }
    
    public static Case createCase(Contact contact,String caseOrigin,String typeOfComment,String commentaries,String city,String cinema){
        
        Case webToCase = new Case();
        webToCase.Status = 'New';
        webToCase.Origin = caseOrigin;
        webToCase.ContactId = contact.Id;
        webToCase.Subject = typeOfComment;
        webToCase.Description = commentaries;
        webToCase.ciudad__c = city;
        webToCase.cinema__c = cinema;
        
        insert webToCase;
        return webToCase;
        
    }
    
    

}