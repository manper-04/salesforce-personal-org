public class CaseDataController {
	@AuraEnabled
    public static List<List<Object>> getData(Id id){
       List<Case> dataCase = [SELECT Id,ContactId FROM Case WHERE id=:id LIMIT 1];
       List<User> dataCurrentUser = [select id from User where id =: userInfo.getUserId() LIMIT 1];
       List<List<Object>> lists= new List<List<Object>>();
        lists.add(dataCase);
        lists.add(dataCurrentUser);
        return lists;
    }
}