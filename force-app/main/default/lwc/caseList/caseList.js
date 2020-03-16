import { LightningElement, api, track } from 'lwc';

export default class CaseList extends LightningElement {

    @api caseList;
    @api caseStatus;

    //Getter indicates if any items in the list
    get areCases() {
        if(this.caseList) {
           return this.caseList.length>0;
        } else {
           return false; 
        }
    }

    //Function to cancel drag n drop events
    cancel(evt) {
        if (evt.stopPropagation) evt.stopPropagation();
        if (evt.preventDefault) evt.preventDefault();
        return false;
    };

    //DRAG target drag event handler dispatched from the child component
    handleItemDrag(evt) {
        
        console.log('Drag event from the drag target: ' + evt.detailinto + ' for drop target: ' + this.caseStatus);
        this.cancel(evt);

        //Dispatch the custom event to raise the detail payload up one level
        const event = new CustomEvent('listitemdrag', {
            detail: evt.detail
        });
        this.dispatchEvent(event);
    }

    //DROP target dragenter event handler
    handleDragEnter(evt) {

        console.log('Drag Enter event for ' + this.caseStatus);

        //Cancel the event
        this.cancel(evt);

    }

    //DROP target dragover event handler
    handleDragOver(evt) {
        
        console.log('Drag Over event for ' + this.caseStatus);
        
        //Cancel the event
        this.cancel(evt);

        //Set the style to indicate the element is being dragged over
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.add('over');

    }

    //DROP target dragover event handler
    handleDragLeave(evt) {
        
        console.log('Drag Leave event for ' + this.caseStatus);
        
        //Cancel the event
        this.cancel(evt);

        //Reset the style as the drag is being dragged off the element
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.remove('over');

    }

    //DROP target drop event handler
    handleDrop(evt) {
            
        console.log('Handling Drop into drop tagert for status: ' + this.caseStatus);
        this.cancel(evt);

        const event = new CustomEvent('itemdrop', {
            detail: this.caseStatus
        });
        this.dispatchEvent(event);

        //Reset the style
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.remove('over');
        
    }
}