public class Ejercicio {
    public static void Ejercicio(){
    Contact contacto1 = new Contact(FirstName='Manuel',LastName='Lopez');
    Contact contacto2 = new Contact(FirstName='Pedro',LastName='Ramirez');
    Contact contacto3 = new Contact(FirstName='Ricardo',LastName='Lopez');
    Contact contacto4 = new Contact(FirstName='Paola',LastName='Navarro');
        
        List<Contact> contacts = new List<Contact>{contacto1,contacto2,contacto3,contacto4};
           insert contacts;
        
        for(Integer i = 0;i < contacts.size(); i++){
            if(contacts[i].LastName == 'Lopez'){
                contacts[i].LastName = 'Cambiado';
            }
        }
        
         update contacts;
        
    }
}