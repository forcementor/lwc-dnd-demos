import { LightningElement, api } from 'lwc';

export default class CaseItem extends LightningElement {
    @api caseRecord = {
        Subject:'Review DEX502', 
        Status:'New', 
        Priority:'Medium'
    };

    originalStatus;

    itemDragStart(evt) {

        console.log('Handling DragStart for item: ' + this.caseRecord.Id);

        //Store the original status
        this.originalStatus = this.caseRecord.Status;
       
        //Fetch the element to set the style
        let draggableElement = this.template.querySelector('[data-id="' + this.caseRecord.Id + '"]');
        draggableElement.classList.add('drag');
        
        //Dispatch the custom event
        const event = new CustomEvent('itemdrag', {
            detail: this.caseRecord.Id 
        });
        this.dispatchEvent(event);
    }

    itemDragEnd(evt) {

        console.log('Handling DragEnd for item: ' + this.caseRecord.Id);
        
        //Reset the style if there was no successful drop
        if(this.caseRecord.Status == this.originalStatus) {
            let draggableElement = this.template.querySelector('[data-id="' + this.caseRecord.Id + '"]');
            draggableElement.classList.remove('drag');
        }
    }   

}