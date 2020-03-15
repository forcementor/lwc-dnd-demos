public without sharing class LoadData {

    public static void buildData() {

		Map<String, Account> accounts = AccountsData.buildData();
		Map<String, Contact> contacts = ContactsData.buildData(accounts);
		Map<String, Case> cases = CasesData.buildData();
		
    }

	public static void clearData() {

		delete [SELECT Id FROM Case];
		delete [SELECT Id FROM Contact];
		delete [SELECT Id FROM Account];

	}
}