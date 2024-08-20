public with sharing class CinemaCatalogeParser {
    public class Theaters {
        @auraEnabled
        public Integer id;
        @auraEnabled
        public String name;
    }

    public class City {
        @auraEnabled
        public Integer id;
        @auraEnabled
        public String name;
        @auraEnabled
        public List<Theaters> theaters;
    }

    public class Catalog{
        @auraEnabled
        public City city;
    }
    @auraEnabled
    public List<Catalog> catalog;
    
    @auraEnabled(cacheable=true)
    public static CinemaCatalogeParser parse(String json) {
        return (CinemaCatalogeParser) System.JSON.deserialize(json, CinemaCatalogeParser.class);
    }
}