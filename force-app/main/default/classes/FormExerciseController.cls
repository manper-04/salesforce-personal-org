public  class FormExerciseController {

    @AuraEnabled
    public static Contact getContactInformation(Id recordId){
        try{
            Contact contact =  [SELECT id,FirstName,LastName,Birthdate,Email,Department,Fax,CleanStatus,Phone FROM Contact WHERE id = :recordId];
            return contact;
        }catch(Exception e){}
        return null;
    }

}