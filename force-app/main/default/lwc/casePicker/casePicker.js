import { LightningElement, track, wire } from 'lwc';
import getAllCases from '@salesforce/apex/CasePicker.getAllCases';
import resetAllCasesNew from '@salesforce/apex/CasePicker.resetAllCasesNew';
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
    
    //Vars to track the DRAG COURSE data
    @track draggingId = "";
    @track draggingStatus = "";

    //Wired Apex method to fetch all records
    @wire( getAllCases )
    wired_getAllCases(result) {

        //Capture the returned data and any errors
        this.caseListAll = result;

        //Build filtered arrays if data returned
        //These lists are bound to the DROP TARGET components
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

    //Manually reset all Cases to New    
    resetData() {
        resetAllCasesNew()
        .then( () => {
            this.refreshData();
        })
        .catch(error => {
            //Notify any error
            this.showToast(this,'Error Resetting Data', error.body.message, 'error');
        });
    }   

    //Manually refresh the data and the reactive DROP TARGET lists 
    refreshData() {
        refreshApex(this.caseListAll);
    }

    //Handle the custom event dispatched originally from a DRAG SOURCE 
    //and proxied from a DROP TARGET
    handleListItemDrag(evt) {

        console.log('Setting draggingId to: ' + evt.detail);

        //Capture the detail passed with the event from the DRAG target
        this.draggingId = evt.detail.dragTargetId;
        this.draggingStatus = evt.detail.dragTargetStatus;

    }

    //Handle the custom event dispatched from a DROP TARGET     
    handleItemDrop(evt) {

        //Set the DRAG SOURCE Id and new DROP TARGET Status for the update
        let draggedId = this.draggingId;
        let updatedStatus = evt.detail;
        
        console.log('Dropped - Id is: ' + draggedId + ', new Status is ' + updatedStatus);

        //Handle custom validations before allowing an update
        if (updatedStatus === this.draggingStatus) {

            //DO NOTHING if the DRAG status is NOT the DROP target Status

        } else if (updatedStatus == this.newStatus) { 
                   
            //Don't allow any record to be assigned to the New list
            this.showToast(this,'Status Not Allowed','Case may not be reset as New!', 'error');

        } else {

            //Update the DRAG SOURCE record with its new status    
            let fieldsToSave = {};
            fieldsToSave[FIELD_CASE_ID.fieldApiName] = draggedId;
            fieldsToSave[FIELD_CASE_STATUS.fieldApiName] = updatedStatus;
            const recordInput = { fields:fieldsToSave}

            updateRecord(recordInput)
            .then(() => {
                    //Force a refresh of all bound lists
                    refreshApex(this.caseListAll);
                })
                .catch(error => {
                    //Notify any error
                    this.showToast(this,'Error Updating Record', error.body.message, 'error');
                });
        }
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