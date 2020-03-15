public without sharing class CasePicker {

    @AuraEnabled(cacheable=true)
	public static List<Case> getAllCases() {
		string query = 'SELECT Id, Subject, Status, Priority FROM Case ORDER BY Subject';
		return Database.query(query);
    }

    /*
    @AuraEnabled(cacheable=true)
	public static List<Case> getCasesByStatus(String status) {

        if (status == null) {
            status = 'New';
        }

        query = 'SELECT Id, Subject, Status, Priority FROM Case WHERE Status = : ' + status + ' BY Subject';
		return Database.query(query);
    }
    */
}
