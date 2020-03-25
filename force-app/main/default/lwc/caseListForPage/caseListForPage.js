import { LightningElement, api, track, wire } from 'lwc';
import getAllCases from '@salesforce/apex/CasePicker.getAllCases';
import { updateRecord} from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//Required for PubSub
import { fireEvent } from 'c/pubsub';
import { registerListener } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

//The fields required for the update of the Drag target record
import FIELD_CASE_ID from '@salesforce/schema/Case.Id';
import FIELD_CASE_STATUS from '@salesforce/schema/Case.Status';

//Constants for the status picklist
const STATUS_NEW = 'New';
const STATUS_WORKING = 'Working';
const STATUS_ESCALATED = 'Escalated';

export default class CaseListForPage extends LightningElement {

    //Will be selected from the App Page
    @api selectedStatus = "";

    //A list of all cases for all status
    @track caseListAll = []; 

    //Filtered array
    @track caseListFiltered = [];

    //Status values for the lists
    @track newStatus = STATUS_NEW;
    @track workingStatus = STATUS_WORKING;
    @track escalatedStatus = STATUS_ESCALATED;

    //Vars to track the DRAG COURSE data
    @track draggingId = "";
    @track draggingStatus = "";

    //Var to force initilization of data
    isInitialized = false;

	connectedCallback() {
        registerListener('statusChange', this.handleStatusChange, this);
        registerListener('dragStarted', this.handleDragStarted, this);
        console.log('Connected Callback this.selectedStatus: ', this.selectedStatus);
    }
    
    renderedCallback() {

        if(!this.isInitialized) {

            //Should only be needed once on render
            this.isInitialized = true;

            //Attempt to build the filtered list
            //'Belt and Suspenders' redundant call as async behavior requires it
            this.buildFilteredList();    
        };
    }
    
    @wire(CurrentPageReference) pageRef;

    //Wired Apex method to fetch all records
    @wire( getAllCases )
    wired_getAllCases(result) {

        console.log('wired_getAllCases() this.selectedStatus: ', this.selectedStatus);

        //Capture the returned data and any errors
        this.caseListAll = result;
        
        //Attempt to build the filtered list
        //'Belt and Suspenders' redundant call as async behavior requires it
        this.buildFilteredList();
              
    }

    //Will build the filtered list from the all data list
    buildFilteredList() {
        
        //Only build if the data and status are present    
        if (this.caseListAll.data && this.selectedStatus != '') {
        
            this.caseListFiltered = 
                this.caseListAll.data.filter(
                    (caseItem) => {
                    return caseItem.Status === this.selectedStatus;       
                });

        }
    }

    //Handle the custom event dispatched originally from a DRAG SOURCE 
    //and proxied from a DROP TARGET
    handleListItemDrag(evt) {

        console.log('Setting draggingId to: ' + evt.detail);

        //Capture the detail passed with the event from the DRAG target
        this.draggingId = evt.detail.dragTargetId;
        this.draggingStatus = evt.detail.dragTargetStatus;

        //Fire an event to broadcast the drag and include the data
        fireEvent(this.pageRef, 'dragStarted', 
        {
            dragTargetId: this.draggingId,
            dragTargetStatus: this.draggingStatus  
        });
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

        } else if (this.newStatus == updatedStatus) { 
                   
            //Don't allow any record to be assigned to the New list
            this.showToast(this,'Drop Not Allowed','Case may not be reset as New!', 'error');

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

        //Fire an event to broadcast the need to refresh lists
        fireEvent(this.pageRef, 'statusChange');
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

    //Handler for a PubSub status change event
    handleStatusChange() {
        refreshApex(this.caseListAll);
    }

    //Handler for a PubSub drag started event
    handleDragStarted(detail) {
        this.draggingId = detail.dragTargetId;
        this.draggingStatus = detail.dragTargetStatus;
    }

}