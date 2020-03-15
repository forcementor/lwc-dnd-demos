public without sharing class AccountsData {

	public static Map<String, Account> buildData () {
	
		Map<String, Account> accounts = new Map<String, Account>{
		'Account 001' => new Account(ANNUALREVENUE=50000,BILLINGCITY='New York',BILLINGCOUNTRY='United States',BILLINGPOSTALCODE='10012',BILLINGSTATE='New York',BILLINGSTREET='1500 Broadway',FAX='',INDUSTRY='',NAME='Manhatten Technologies',NUMBEROFEMPLOYEES=20,PHONE='(212) 799-5000',SHIPPINGCITY='New York',SHIPPINGCOUNTRY='United States',SHIPPINGPOSTALCODE='10012',SHIPPINGSTATE='New York',SHIPPINGSTREET='1500 Broadway',TYPE='',WEBSITE='https://www.manhattentech.com'),
		'Account 002' => new Account(ANNUALREVENUE=15000,BILLINGCITY='San Francisco',BILLINGCOUNTRY='United States',BILLINGPOSTALCODE='94117',BILLINGSTATE='California',BILLINGSTREET='568 Clayton Street',FAX='',INDUSTRY='',NAME='Train Them Young',NUMBEROFEMPLOYEES=30,PHONE='(415) 354-6780',SHIPPINGCITY='San Francisco',SHIPPINGCOUNTRY='United States',SHIPPINGPOSTALCODE='94117',SHIPPINGSTATE='California',SHIPPINGSTREET='568 Clayton Street',TYPE='',WEBSITE='https://www.trainthemyoung.com')
		};

		insert accounts.values();
		
		return accounts;
	}
}