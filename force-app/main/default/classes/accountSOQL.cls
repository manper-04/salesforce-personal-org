public class accountSOQL {
    public static void accountQuery(){
        
        Account[] accts = [SELECT Name,Phone FROM Account ORDER BY Name];
        System.debug(accts.size());
        
        System.debug(accts);
        
        
        
    }

}