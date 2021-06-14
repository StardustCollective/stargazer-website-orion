export default interface IPruchase {
  authToken: string;
  orderAsset: string;
  orderNetwork: string;
  orderQuantity: number;
  orderAmountUsd: number;
  orderTokenAddress: number;
  orderStatement: string;
  customerEmail: string;
  cardNumber: string;
  cardCvv: string;
  cardName: string;
  cardZipCode: string | null;
  cardExpiration: string;
}
