import { LightningElement, wire, track } from 'lwc';
import getfinanceAccountList from '@salesforce/apex/AccountFinanace.getfinanceAccountList';

const columns = [
    { label: 'Account Name', fieldName: 'Name', sortable: true, type: 'text', editable: true },
    { label: 'Account Owner ', fieldName: 'AccountOwner', sortable: true, type: 'text', editable: false },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Website', fieldName: 'Website', type: 'text', editable: true },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', editable: true },
];

export default class AccountList extends LightningElement {

    @track accounts = [];
    @track error;

    accountList;

    columns = columns;
    rowOffset = 0;
    defaultSortDirection = 'asc';
    sortedDirection = 'asc';
    sortedBy;

    @wire(getfinanceAccountList)
    wiredAccounts({ error, data }) {
        if (data) {
           // this.accounts = data;
            console.log('---original data--',JSON.parse(JSON.stringify(data)));
            let d = [];
            data.forEach(res =>{
                let account = {};
                account.Id = res.Id;
                account.Name = res.Name;
                account.AccountOwner = res.Owner.Name;
                account.Phone = res.Phone;
                account.Website = res.Website;
                account.AnnualRevenue = res.AnnualRevenue; 
                account.Industry = res.Industry;
                d.push(account);

            });
            this.accounts = d;
            this.error = undefined;
            console.log(JSON.parse(JSON.stringify(this.accounts)));
           // this.mapAccountOwner();
            this.accountList = this.accounts;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    onHandleSort(event) {
    
        this.sortData(event.detail.fieldName, event.detail.sortDirection);

    }

    sortData(fieldname, direction) {
       
        let parseData = JSON.parse(JSON.stringify(this.accounts));

        let keyValue = (a) => {
            return a[fieldname];
        };

        let isReverse = direction === 'asc' ? 1 : -1;

        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : '';
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        this.accounts = parseData;

    }

    onNameSearch(event) {
        let searchValue = event.target.value;
        const cloneData = this.accountList;
        const searchresult = cloneData.filter(function (item) {
            return item.Name.toLowerCase().includes(searchValue.toLowerCase());
        });
        this.accounts = searchresult;
        console.log(searchresult);
    }
}