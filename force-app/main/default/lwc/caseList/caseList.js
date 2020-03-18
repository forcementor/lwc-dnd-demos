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

    //DRAG SOURCE drag event handler dispatched from the child component
    handleItemDrag(evt) {
        
        console.log('Drag event from the drag target: ' + evt.detailinto + ' for drop target: ' + this.caseStatus);
        this.cancel(evt);

        //Dispatch the custom event to raise the detail payload up one level
        const event = new CustomEvent('listitemdrag', {
            detail: evt.detail
        });
        this.dispatchEvent(event);
    }

    //DROP TARGET dragenter event handler
    handleDragEnter(evt) {

        console.log('Drag Enter event for ' + this.caseStatus);

        //Cancel the event
        this.cancel(evt);

    }

    //DROP TARGET dragover event handler
    handleDragOver(evt) {
        
        console.log('Drag Over event for ' + this.caseStatus);
        
        //Cancel the event
        this.cancel(evt);

        this.addDragOverStyle()
 
    }

    //DROP TARGET dragleave event handler
    handleDragLeave(evt) {
        
        console.log('Drag Leave event for ' + this.caseStatus);
        
        //Cancel the event
        this.cancel(evt);
        
        this.removeDragOverStyle();

    }

    //DROP TARGET drop event handler
    handleDrop(evt) {
            
        console.log('Handling Drop into drop tagert for status: ' + this.caseStatus);
        
        //Cancel the event
        this.cancel(evt);

        //Dispatch the custom event to raise the detail payload up one level        
        const event = new CustomEvent('itemdrop', {
            detail: this.caseStatus
        });
        this.dispatchEvent(event);

        this.removeDragOverStyle();
 
    }

    //Set the style to indicate the element is being dragged over
    addDragOverStyle() {
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.add('over');
    }

    //Reset the style
    removeDragOverStyle() {
        let draggableElement = this.template.querySelector('[data-role="drop-target"]');
        draggableElement.classList.remove('over');
    }

}