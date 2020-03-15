import { LightningElement, api, track } from 'lwc';

export default class CaseList extends LightningElement {

    @api caseList;
    @api caseStatus;

    //@track filteredCaseList = [];
    isLoaded = false;
    
    /*
    connectedCallback() {
        debugger;    
        if (this.caseList.length > 0) {
            this.setFilteredCaseList();
        }
    }

    renderedCallback() {
        debugger;    
        if ( !this.isLoaded && this.caseList) {
            this.isLoaded = true;

            this.filteredCaseList = 
                this.caseList.filter(
                    (caseItem) => {
	    	    	    return caseItem.Status === this.caseStatus;       
                })
        }
    }
    */

    /*
    setFilteredCaseList() {
        debugger;
        this.filteredCaseList = [];
        for (i=0; i<this.caseList.length; i++) {
            if(this.caseList[i].Status === this.caseStatus){
                this.filteredCaseList.add(this.caseList[i]);                    
            }        
        }
    }
    */

    get areCases() {
        if(this.caseList) {
           return this.caseList.length>0;
        } else {
           return false; 
        }
    }

    handleDragOver(evt) {
        evt.preventDefault();
    }

    handleItemDrag(evt) {
        const event = new CustomEvent('listitemdrag', {
            detail: evt.detail
        });

        this.dispatchEvent(event);
    }

    handleDrop(evt) {
        const event = new CustomEvent('itemdrop', {
            detail: this.caseStatus
        });
        
        this.dispatchEvent(event);
    }
}