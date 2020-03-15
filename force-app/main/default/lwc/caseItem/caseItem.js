import { LightningElement, api } from 'lwc';

export default class CaseItem extends LightningElement {
    @api caseRecord = {
        Subject:'Review DEX502', 
        Status:'New', 
        Priority:'Medium'
    };

    itemDragStart() {
        const event = new CustomEvent('itemdrag', {
            detail: this.caseRecord.id
        });

        this.dispatchEvent(event);
    }
}   