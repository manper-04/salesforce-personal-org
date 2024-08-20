public class registerUser {
@AuraEnabled
    public static Contact registerUser(String firstname,String lastname,String email,String phone){
          String password;
       	  Integer length = 10;
          Blob blobKey = crypto.generateAesKey(128);
          String key = EncodingUtil.convertToHex(blobKey);
          password = key.substring(0,length);
  
        
        Contact contact = new Contact();
        contact.FirstName = firstname;
        contact.LastName = lastname;
        contact.Email = email;
        contact.Phone = phone;
        contact.Password__c = password;
        insert contact;
        return contact;
    }
    
    
    @AuraEnabled
    public static Contact validate(String email,String password){
         
        
        Contact contact = [SELECT id,FirstName,Password__c,Email,LastName,Phone FROM Contact WHERE Email = :email AND Password__c = : password ];
        if(contact != null){
            return contact;
        }
        else{
            return null;
        }
    }

}