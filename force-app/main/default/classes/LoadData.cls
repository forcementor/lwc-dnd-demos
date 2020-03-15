public without sharing class LoadData {

    public static void buildData() {

		Map<String, Account> accounts = AccountsData.buildData();
		Map<String, Contact> contacts = ContactsData.buildData(accounts);
		
    }

	public static void clearData() {

		delete [SELECT Id FROM Contact];
		delete [SELECT Id FROM Account];
	}
}