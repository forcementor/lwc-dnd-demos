import { LightningElement, api } from 'lwc';

export default class CaseItem extends LightningElement {
    @api caseRecord = {
        Subject:'Review DEX502', 
        Status:'New', 
        Priority:'Medium'
    };

    originalStatus;

    itemDragStart(evt) {

        this.originalStatus = this.caseRecord.Status;

        console.log('Handling DragStart for item: ' + this.caseRecord.Id);
        
        //let draggableElement = this.template.querySelector('.draggable');
        let draggableElement = this.template.querySelector('[data-id="' + this.caseRecord.Id + '"]');
                
        draggableElement.classList.add('drag');
        
        const event = new CustomEvent('itemdrag', {
            detail: this.caseRecord.Id 
        });

        this.dispatchEvent(event);
    }

    itemDragEnd(evt) {
        console.log('Handling DragEnd for item: ' + this.caseRecord.Id);
        
        if(this.caseRecord.Status == this.originalStatus) {
            //Reset the style as there was no successful drop
            //let draggableElement = this.template.querySelector('.draggable');
            let draggableElement = this.template.querySelector('[data-id="' + this.caseRecord.Id + '"]');
            draggableElement.classList.remove('drag');
        }
    }   

}