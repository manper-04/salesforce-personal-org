public class StringArray {
    public static List<String> generateArray(Integer num){
        List<String> myArray = new List<String>();
        
        for(Integer i = 1; i <= num ; i++){
            myarray.add('List '+i);
            System.debug(myArray[i-1]);
        }
        
        return myArray;
        
    }

}