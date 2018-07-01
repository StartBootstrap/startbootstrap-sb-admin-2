/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {de.tum.allianz.ics.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('de.tum.allianz.ics.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('de.tum.allianz.ics', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
/**
 * create bill
 * @param {de.tum.allianz.ics.CreateBill} createBill - creation of Bills (Give OE ID to use this transaction)
 * @transaction
 */
async function CreateBill(make) {
    var handlingFee = calculateHandlingFee(make.claims);
    var totalAmount = [];
    //var hoe= getCurrentParticipant();
    var factory = getFactory();
    make.claims.forEach(element => {
        totalAmount.push(element.totalAmount);
    });
    let asset = await getAssetRegistry('de.tum.allianz.ics.Bill');
    var bill  = factory.newResource('de.tum.allianz.ics', 'Bill', make.billId);
    bill.hoe= make.hoe;
    bill.ooe = make.ooe;
    bill.claims = make.claims;
    bill.handlingFee=handlingFee.reduce((a,b) => a+b,0);
    bill.totalOutstanding = totalAmount.reduce((a,b) => a+b,0) + handlingFee.reduce((a,b) => a+b,0);
    bill.status = 'PENDING';
    bill.dueDate = make.dueDate;

    await asset.add(bill);
}



/**
 * Add two numbers.
 * @param {array} claims Gets the claims.
 * @returns {array} The calculated Handling fee for each claim.
 */
function calculateHandlingFee(claims){
    var handlingFee = [];
    claims.forEach(element => {
        handlingFee.push(element.totalAmount * 15/100);
    });
    return handlingFee;
}

// function calculatePenalty(bill){}

// function calculateDueDate(bill){}




/**
 * pay bill
 * @param {de.tum.allianz.ics.Pay} pay - the pay to be processed
 * @transaction
 */
async function pay(pay) {
    var outstanding = pay.bill.totalOutstanding;
    outstanding -= pay.amount;
    pay.bill.totalOutstanding = outstanding;
    if (outstanding <= 0){
        pay.bill.status = 'SETTELED';
    }
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('de.tum.allianz.ics.Bill');
    // Update the asset in the asset registry.
    await assetRegistry.update(pay.bill);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('de.tum.allianz.ics', 'OnPay');
    event.bill = pay.bill;
    emit(event);
}

/**
 * Authoriize bill
 * @param {de.tum.allianz.ics.Authorize} tx
 * @transaction
 */
async function onAuthorize(tx){
    var bill = tx.bill;
    var user = tx.user;

    bill.authorizor = user;
    bill.authDate = tx.authDate;
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('de.tum.allianz.ics.Bill');
    // Update the asset in the asset registry.
    await assetRegistry.update(bill);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('de.tum.allianz.ics', 'OnAuthorize');
    event.bill = bill;
    emit(event);

}