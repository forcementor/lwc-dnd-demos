import { LightningElement, api, track } from 'lwc';

export default class CaseList extends LightningElement {

    @api caseList;
    @api caseStatus;

    get areCases() {
        if(this.caseList) {
           return this.caseList.length>0;
        } else {
           return false; 
        }
    }

    cancel(evt) {
        if (evt.stopPropagation) evt.stopPropagation();
        if (evt.preventDefault) evt.preventDefault();
        return false;
    };

    handleDragOver(evt) {
        console.log('Drag Over no action');
        this.cancel(evt);
    }

    handleItemDrag(evt) {
        
        console.log('Handling Drag in List for status: ' + this.caseStatus);
        console.log('and marshalling detail up: ' + evt.detail);
        
        const event = new CustomEvent('listitemdrag', {
            detail: evt.detail
        });

        this.dispatchEvent(event);
    }

    handleDrop(evt) {
            
        this.cancel(evt);
        console.log('Handling Drop in List for status: ' + this.caseStatus);
        
        const event = new CustomEvent('itemdrop', {
            detail: this.caseStatus
        });
        
        this.dispatchEvent(event);
    }
}