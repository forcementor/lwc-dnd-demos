import { LightningElement, track, wire } from 'lwc';
import getAllCases from '@salesforce/apex/CasePicker.getAllCases';
//import getCasesByStatus from '@salesforce/apex/CasePicker.getCasesByStatus';

/*
const caseData = [
    {
        Id:'Case001',
        Subject:'Review Material DEX502', 
        Status:'New', 
        Priority:'Medium'
    },
    {
        Id:'Case002',
        Subject:'Review Material ADX211', 
        Status:'New', 
        Priority:'Medium'
    },
    {
        Id:'Case003',
        Subject:'Review Material CCD102', 
        Status:'New', 
        Priority:'Medium'
    },
    {
        Id:'Case004',
        Subject:'Review Material DEX403', 
        Status:'New', 
        Priority:'Medium'
    },
    {
        Id:'Case005' ,
        Subject:'Review Material DEX502', 
        Status:'New', 
        Priority:'Medium'
    },

];
*/

const STATUS_NEW = 'New';
const STATUS_WORKING = 'Working';
const STATUS_ESCALATED = 'Escalated';

export default class CasePicker extends LightningElement {

    @track caseListAll; 

    //Filtered arrays
    @track caseListNew; 
    @track caseListWorking; 
    @track caseListEscalated;

    //@track caseListFiltered;

    @track newStatus = STATUS_NEW;
    @track workingStatus = STATUS_WORKING;
    @track escalatedStatus = STATUS_ESCALATED;

    //@track leftCases = [];
    //@track rightCases = [];
    @track draggingid = "";

    //caseStatus = 'New';
    //@wire( getCasesByStatus, { status: '$caseStatus'} )
    //wired_getCasesByStatus(result) {
    //    this.caseListFiltered = result;
    //}

    @wire( getAllCases )
    wired_getAllCases(result) {
        debugger;
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


    /*
    connectedCallback() {
        this.distributeCases();
    }

    distributeCases() {

        let curLeftCases = [];
        let curRightCases = [];
        this.caselist.forEach(function(c){
            if(c.status === "New") {
                curLeftCases.push(c);
            } else {
                curRightCases.push(c);
            }
        });

        this.leftCases = curLeftCases;
        this.rightCases = curRightCases;
    }
    */

    handleDragOver(evt) {
        evt.preventDefault();
    }

    handleListItemDrag(evt) {
        console.log('Dragged id is: ' + evt.detail);
        this.draggingid = evt.detail;
    }

    /*
    handleItemDrop(evt) {
        let draggedId = this.draggingid;
        let newStatus = evt.detail;

        let tempCases = this.caseList.filter((case) => {
			if (case.Id === draggedId) {
			    case.status = newStatus;           
			}              
			return case;       
		});

        this.caseList = tempCases;
        this.distributeTasks();
    }
    */
}