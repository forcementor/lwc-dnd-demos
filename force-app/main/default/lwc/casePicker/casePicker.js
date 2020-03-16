import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAllCases from '@salesforce/apex/CasePicker.getAllCases';
import { updateRecord} from 'lightning/uiRecordApi';

import FIELD_CASE_ID from '@salesforce/schema/Case.Id';
import FIELD_CASE_STATUS from '@salesforce/schema/Case.Status';

const STATUS_NEW = 'New';
const STATUS_WORKING = 'Working';
const STATUS_ESCALATED = 'Escalated';

export default class CasePicker extends LightningElement {

    @track caseListAll; 

    //Filtered arrays
    @track caseListNew; 
    @track caseListWorking; 
    @track caseListEscalated;
    @track newStatus = STATUS_NEW;
    @track workingStatus = STATUS_WORKING;
    @track escalatedStatus = STATUS_ESCALATED;
    @track draggingId = "";

    @wire( getAllCases )
    wired_getAllCases(result) {

        this.caseListAll = result;

        //Build filtered arrays if any data
        if(this.caseListAll.data) {

            this.caseListNew = 
                this.caseListAll.data.filter(
                    (caseItem) => {
                    return caseItem.Status === this.newStatus;       
                });

            this.caseListWorking = 
                this.caseListAll.data.filter(
                    (caseItem) => {
                    return caseItem.Status === this.workingStatus;       
                });

            this.caseListEscalated = 
                this.caseListAll.data.filter(
                    (caseItem) => {
                    return caseItem.Status === this.escalatedStatus;       
                });

            }
    }

    handleListItemDrag(evt) {
        console.log('Setting draggingId to: ' + evt.detail);
        this.draggingId = evt.detail;
    }

    handleItemDrop(evt) {
        let draggedId = this.draggingId;
        let newStatus = evt.detail;
        console.log('Dropped - Id is: ' + draggedId + ', Status is ' + newStatus);

        //Update the record with the new status    
        let fieldsToSave = {};
		fieldsToSave[FIELD_CASE_ID.fieldApiName] = draggedId;
		fieldsToSave[FIELD_CASE_STATUS.fieldApiName] = newStatus;
		
		const recordInput = { fields:fieldsToSave}

		updateRecord(recordInput)
			.then(() => {
                refreshApex(this.caseListAll);
			})
			.catch(error => {
				Utils.showToast(this,'Error updating record', error.body.message, 'error');
			});
    }
}