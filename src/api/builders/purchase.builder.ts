/**
 * Class: PurchaseBuilder
 * Builds JSON body required for POSTing a buy-dag/purchase.
 * By: Cesar Miranda - June 11, 2021
 */

///////////////////////////
// ANCHOR Class
//////////////////////////

class PurchaseBuilder{

    ///////////////////////////
    // ANCHOR Properties
    //////////////////////////

    public authToken: string;
    public orderAsset: string;
    public orderNetwork: string;
    public orderQuantity: number;
    public roundedOrderAmountUsd: number;
    public orderTokenAddress: number;
    public orderStatement: string;
    public customerEmail: string;
    public cardNumber: string;
    public cardCvv: string;
    public cardName: string;
    public cardZipCode: string | null = null;
    public expYear: number;
    public expMonth: number;

    ///////////////////////////
    // ANCHOR Accessors
    //////////////////////////

    public set orderAmountUsd(amountUsd: number){
        this.roundedOrderAmountUsd = Math.floor(amountUsd * 100);;
    }

    public set cardExpiration(expiryDate: string){
      // this.cardExpiration = expiryDate;
      this.expMonth = Number(expiryDate.split("/")[0]);
      this.expYear = Number(`20${expiryDate.split("/")[1]}`);
    }

    ///////////////////////////
    // ANCHOR Methods
    //////////////////////////

    /**
     * Constructs the body required to post a buy-dag/purchase.
     * @returns A stringified body.
     */
    public getBody(): string{
      return JSON.stringify({
        auth: {
          token: this.authToken,
        },
        order: {
          asset: this.orderAsset,
          network: this.orderNetwork,
          quantity: this.orderQuantity,
          amountUSD: this.roundedOrderAmountUsd,
          tokenAddress: this.orderTokenAddress,
          statement: this.orderStatement,
        },
        customer: {
          email: this.customerEmail,
        },
        paymethod: {
          number: this.cardNumber,
          cvv: this.cardCvv,
          name: this.cardName,
          expYear: this.expYear,
          expMonth: this.expMonth,
          zip: this.cardZipCode,
        }
      });
    }
}

export default PurchaseBuilder;