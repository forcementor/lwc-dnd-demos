public without sharing class CasePicker {

    //Fetch all Cases
    @AuraEnabled(cacheable=true)
      public static List<Case> getAllCases() {
		  string query = 'SELECT Id, Subject, Status, Priority FROM Case ORDER BY Subject';
		  return Database.query(query);
    }

    //Reset all Cases to New status
    @AuraEnabled
    public static void resetAllCasesNew() {
      list<Case> allCases = [SELECT Id, Status FROM Case];
      for (Case c : allCases) {
        c.Status = 'New';
      }
		  Database.update(allCases);
    }

}
