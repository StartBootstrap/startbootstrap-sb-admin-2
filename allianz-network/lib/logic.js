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
 * pay bill
 * @param {de.tum.allianz.ics.Pay} pay - the pay to be processed
 * @transaction
 */
function pay(pay) {
    var outstanding = pay.bill.totalOutstanding;
    outstanding -= pay.amount;
    pay.bill.totalOutstanding = outstanding;
  	if (outstanding <= 0){
      pay.bill.status = "SETTELED";
    }
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('de.tum.allianz.ics.Bill');
    // Update the asset in the asset registry.
    await assetRegistry.update(pay.bill);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('de.tum.allianz.ics', 'OnPay');
    event.bill = bill;
    emit(event);
}

  /**
 * Calculate handling fee
 * @param {de.tum.allianz.ics.CalcHFee} calcHFee
 * @transaction
 */
function onCalcHFee(calcHFee){
  var bill = calcHFee.bill;
  var handlingFee = bill.totalAmount;
  handlingFee = (0.1 * handlingFee) ;
  bill.handlingFee = handlingFee;
  bill.totalOutstanding = bill.totalAmount + bill.handlingFee;
  return getAssetRegistry('de.tum.allianz.ics.Bill')
  		.then(function(assetRegistry){
    		return assetRegistry.update(bill);
  });
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
    bill.authDate = new Date().toISOString("YYYY-MM-DD");

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('de.tum.allianz.ics.Bill');
    // Update the asset in the asset registry.
    await assetRegistry.update(bill);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('de.tum.allianz.ics', 'OnAuthorize');
    event.bill = bill;
    emit(event);

}