public without sharing class LeadsData {

	public static Map<String, Lead> buildData () {

		Map<String, lead> leads = new Map<String, Lead>{
        'JohnS'=>  new Lead(EMAIL='john@smith.com',FIRSTNAME='John',LASTNAME='Smith',TITLE='Developer',COMPANY='Tech Co.',STATUS='Open - Not Contacted'),
        'TimH'=>  new Lead(EMAIL='tim@harrington.com',FIRSTNAME='Tim', LASTNAME='Harrington',TITLE='Administrator',COMPANY='Global Inc.',STATUS='Open - Not Contacted'),        
        'SallyR'=>  new Lead(EMAIL='sally@rogers.com',FIRSTNAME='Sally',LASTNAME='Rogers',TITLE='QA Lead',COMPANY='QA Co.',STATUS='Open - Not Contacted'),
        'MannyW'=>  new Lead(EMAIL='manny@williams.com',FIRSTNAME='Manny',LASTNAME='Williams',TITLE='Developer',COMPANY='IBM',STATUS='Open - Not Contacted'),
        'HarryK'=>  new Lead(EMAIL='harry@kelly.com',FIRSTNAME='Harry',LASTNAME='Kelly',TITLE='DevOps Manager',COMPANY='Google',STATUS='Open - Not Contacted'),
        'CharlieR'=>  new Lead(EMAIL='charlie@robinson.com',FIRSTNAME='Charlie',LASTNAME='Robinson',TITLE='Documentation Director',COMPANY='Salesforce',STATUS='Open - Not Contacted')
		};
		insert leads.values();
		
		return leads;
	}
}