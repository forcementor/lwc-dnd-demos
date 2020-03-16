import { LightningElement, track, wire } from 'lwc';
import getAllCases from '@salesforce/apex/CasePicker.getAllCases';
import { updateRecord} from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//The fields required for the update of the Drag target record
import FIELD_CASE_ID from '@salesforce/schema/Case.Id';
import FIELD_CASE_STATUS from '@salesforce/schema/Case.Status';

//Constants for the status picklist
const STATUS_NEW = 'New';
const STATUS_WORKING = 'Working';
const STATUS_ESCALATED = 'Escalated';

export default class CasePicker extends LightningElement {

    //A list of all cases for all status
    @track caseListAll; 

    //Filtered arrays
    @track caseListNew; 
    @track caseListWorking; 
    @track caseListEscalated;

    //Status values for the lists
    @track newStatus = STATUS_NEW;
    @track workingStatus = STATUS_WORKING;
    @track escalatedStatus = STATUS_ESCALATED;
    @track draggingId = "";

    //Wired Apex method to fetch all records
    @wire( getAllCases )
    wired_getAllCases(result) {

        //Capture the returned data and any errors
        this.caseListAll = result;

        //Build filtered arrays if data returned
        //These lists are bound to the drop targetcomponents
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

    //Handle the custom event dispathed from a DROP target 
    handleListItemDrag(evt) {

        console.log('Setting draggingId to: ' + evt.detail);

        //Capture the detail passed with the event from the DRAG target
        this.draggingId = evt.detail;
    }

    //Handle the custom event dispathed from a DROP target     
    handleItemDrop(evt) {

        //Set the DRAG target Id and DROP target Status values for the update
        let draggedId = this.draggingId;
        let newStatus = evt.detail;
        
        console.log('Dropped - Id is: ' + draggedId + ', Status is ' + newStatus);

        //Update the DRAG target record with its new status    
        let fieldsToSave = {};
		fieldsToSave[FIELD_CASE_ID.fieldApiName] = draggedId;
		fieldsToSave[FIELD_CASE_STATUS.fieldApiName] = newStatus;
		const recordInput = { fields:fieldsToSave}

		updateRecord(recordInput)
        .then(() => {
                //Force a refresh of all bound lists and notify success
                refreshApex(this.caseListAll);
                this.showToast(this,'Update Successful', 'Case Status changed to ' + newStatus, 'success');
			})
			.catch(error => {
                //Notify any error
                this.showToast(this,'Error updating record', error.body.message, 'error');
			});
    }

    //Notification utility function
    showToast = (firingComponent, toastTitle, toastBody, variant)  => {
        const evt = new ShowToastEvent({
            title: toastTitle,
            message: toastBody,
            variant: variant
        });
        firingComponent.dispatchEvent(evt);
    }
}