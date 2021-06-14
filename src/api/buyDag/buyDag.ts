/**
 * Class: BuyDag
 * Defines API actions for the buy-dag collection.
 * By: Cesar Miranda - June 11, 2021
 */

///////////////////////////
// ANCHOR Module Imports
///////////////////////////

import api from '../api';

///////////////////////////
// ANCHOR Builder Imports
///////////////////////////

import PurchaseBuilder from "api/builders/purchase.builder";

///////////////////////////
// ANCHOR Interface Imports
///////////////////////////

import IPurchase from '../types/purchase';

///////////////////////////
// ANCHOR Class
///////////////////////////

class BuyDag {

    ///////////////////////////
    // ANCHOR Static Properties
    ///////////////////////////
  
    public static endPoint = "buy-dag/purchase/";
  
    ///////////////////////////
    // ANCHOR Methods
    ///////////////////////////
  
    public static purchase(purchaseData: IPurchase){
    
      const purchase = new PurchaseBuilder();
      purchase.authToken = purchaseData.authToken;
      purchase.orderAsset = purchaseData.orderAsset;
      purchase.orderNetwork = purchaseData.orderNetwork;
      purchase.orderQuantity = purchaseData.orderQuantity;
      purchase.orderAmountUsd = purchaseData.orderAmountUsd;
      purchase.orderTokenAddress = purchaseData.orderTokenAddress;
      purchase.orderStatement = purchaseData.orderStatement;
      purchase.customerEmail = purchaseData.customerEmail;
      purchase.cardNumber = purchaseData.cardNumber;
      purchase.cardCvv = purchaseData.cardCvv;
      purchase.cardName = purchaseData.cardName;
      purchase.cardExpiration = purchaseData.cardExpiration;
      purchase.cardZipCode = purchaseData.cardZipCode;
  
      const body = purchase.getBody();

      return api.post(BuyDag.endPoint, body);
    }
      
  
  }

  export default BuyDag