public without sharing class ContactsData {

	public static Map<String, Contact> buildData (Map<String, Account> accounts) {

		Map<String, Contact> contacts = new Map<String, Contact>{
		'PeterG'=>  new Contact(EMAIL='peter@manhattentech.com',FIRSTNAME='Peter',LASTNAME='Grapple',MAILINGCITY='Reno',MAILINGCOUNTRY='United States', MAILINGPOSTALCODE='92030',MAILINGSTATE='Nevada',MAILINGSTREET='150 Main Street',PHONE='1-465-555-2123',MOBILEPHONE='',TITLE='Technical Instructor',ACCOUNTID=accounts.get('Account 001').Id),
		'JoeF' 	=>  new Contact(EMAIL='joe@manhattentech.com',FIRSTNAME='Joe',LASTNAME='Tulip',MAILINGCITY='Arlington',MAILINGCOUNTRY='United States', MAILINGPOSTALCODE='54909',MAILINGSTATE='Virginia',MAILINGSTREET='2910 Broadway',PHONE='1-375-555-2123',MOBILEPHONE='',TITLE='Technical Instructor',ACCOUNTID=accounts.get('Account 001').Id),
		'FredZ' =>  new Contact(EMAIL='fred@manhattentech.com',FIRSTNAME='Fred',LASTNAME='Zappa',MAILINGCITY='Pleasonton',MAILINGCOUNTRY='United States', MAILINGPOSTALCODE='58390',MAILINGSTATE='California',MAILINGSTREET='86 Robertson Road',PHONE='1-856-555-2123',MOBILEPHONE='',TITLE='Technical Instructor',ACCOUNTID=accounts.get('Account 001').Id),
		'DanG' 	=>	new Contact(EMAIL='dan@trainthemyoung.com',FIRSTNAME='Dan',LASTNAME='Gould',MAILINGCITY='Los Angeles',MAILINGCOUNTRY='United States', MAILINGPOSTALCODE='30949',MAILINGSTATE='California',MAILINGSTREET='7 William Street',PHONE='1-510-666-6627',MOBILEPHONE='',TITLE='Technical Instructor',ACCOUNTID=accounts.get('Account 002').Id),
		'AdamD' =>  new Contact(EMAIL='adam@trainthemyoung.com',FIRSTNAME='Adam',LASTNAME='Downey',MAILINGCITY='Madison',MAILINGCOUNTRY='United States',MAILINGPOSTALCODE='79009',MAILINGSTATE='Wisconsin',MAILINGSTREET='7809 Waller Way',PHONE='1-766-897-3456',MOBILEPHONE='',TITLE='Technical Instructor',ACCOUNTID=accounts.get('Account 002').Id)
		};
		insert contacts.values();
		
		return contacts;
	}
}
