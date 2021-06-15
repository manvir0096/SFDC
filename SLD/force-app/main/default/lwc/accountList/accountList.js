import { LightningElement, wire, track } from 'lwc';
import getfinanceAccountList from '@salesforce/apex/AccountFinanace.getfinanceAccountList';

const columns = [
    { label: 'Account Name', fieldName: 'Name', sortable: true, type: 'text', editable: true },
    { label: 'Account Owner ', fieldName: 'AccountOwner', sortable: true, type: 'text', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Website', fieldName: 'Website', type: 'text', editable: true },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', editable: true },
];

export default class AccountList extends LightningElement {

    @track accounts;
    @track error;

    accountList;

    columns = columns;
    rowOffset = 0;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    @wire(getfinanceAccountList)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;

            this.error = undefined;
            console.log(this.accounts);
            // this.accounts.forEach((res) => {
            //     res.AccountOwner = res.Owner.Name;
            // });
            // Object.preventExtensions(accounts);


            this.accountList = accounts;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;

        console.log(event);
        const cloneData = [...this.accounts];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.accounts = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }

    onNameSearch(event) {
        console.log(event);
        let searchValue = event.target.value;
        console.log(searchValue);
        const cloneData = [...this.accountList];


        const searchresult = cloneData.filter(function (item) {
            return item.Name.includes(searchValue);
        });
        this.accounts = searchresult;
        console.log(searchresult);
    }
}