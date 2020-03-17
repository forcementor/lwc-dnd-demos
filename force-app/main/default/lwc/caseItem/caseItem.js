import { LightningElement, api } from 'lwc';

export default class CaseItem extends LightningElement {
    @api caseRecord;

    //Property to track the original status of the DRAG target
    originalStatus;

    //DRAG SOURCE dragstart event handler
    itemDragStart(evt) {

        console.log('Handling DragStart for item: ' + this.caseRecord.Id);

        //Store the original status
        this.originalStatus = this.caseRecord.Status;
       
        //Fetch the element to set the style
        let draggableElement = this.template.querySelector('[data-id="' + this.caseRecord.Id + '"]');
        draggableElement.classList.add('drag');
        
        //Dispatch the custom event and pass the record Id and Status
        const event = new CustomEvent('itemdrag', {
            detail: {
                dragTargetId: this.caseRecord.Id,
                dragTargetStatus: this.originalStatus 
            },
            bubbles:true,
            composed:true
        });
        this.dispatchEvent(event);
    }

    //DRAG SOURCE dragend event handler
    itemDragEnd(evt) {

        console.log('Handling DragEnd for item: ' + this.caseRecord.Id);
 
        //Reset the style
        let draggableElement = this.template.querySelector('[data-id="' + this.caseRecord.Id + '"]');
        draggableElement.classList.remove('drag');
    }   

}