public with sharing class AccountFinanace {
    
    @AuraEnabled(Cacheable=true)
    public static List<Account> getfinanceAccountList() {
	return [SELECT Id, Name, Phone, Owner.name , Website, AnnualRevenue, Industry FROM Account where Industry = 'Finance'];        
    }

    @AuraEnabled(Cacheable=true)
    public static void updateAccount(String accountJSON){
        List<Account> accounts = (List<Account>) System.JSON.deserialize(accountJSON, Account.class);
        update accounts;
    }
}
