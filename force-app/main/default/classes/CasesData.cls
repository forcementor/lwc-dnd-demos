public without sharing class CasesData {
    
    public static Map<String, Case> buildData () {

		Map<String, Case> cases = new Map<String, Case>{
            'Case001'=> new Case(SUBJECT='Review Material DEX602',STATUS='New',PRIORITY='Medium'),
            'Case002'=> new Case(SUBJECT='Review Material ADX211',STATUS='New',PRIORITY='Medium'),
            'Case003'=> new Case(SUBJECT='Review Material CCD102',STATUS='New',PRIORITY='Medium'),
            'Case004'=>	new Case(SUBJECT='Review Material DEX403',STATUS='New',PRIORITY='Medium'),
            'Case005'=> new Case(SUBJECT='Review Material DEX502',STATUS='New',PRIORITY='Medium')
		};
		insert cases.values();
		
		return cases;
    }
}