public with sharing class AccountFinanace {
    
    @AuraEnabled(Cacheable=true)
    public static List<Account> getfinanceAccountList() {
	return [SELECT Id, Name, Phone, Owner.name , Website, AnnualRevenue, Industry FROM Account where Industry = 'Finance'];        
    }
}
