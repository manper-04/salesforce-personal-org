public class upsertContact {
    public static void uContact(){
       Contact juan = new Contact(FirstName='Juan',LastName='Gallegos',Department='Finanzas');
        insert juan;
        
        juan.Description='El registro de juan se modifico';
        
       Contact kiko = new Contact(FirstName='Kiko',LastName='Lopez',Department='Tecnologia');
        
        List<Contact> contacts = new List<Contact>{juan,kiko};
            upsert contacts;
    }

}