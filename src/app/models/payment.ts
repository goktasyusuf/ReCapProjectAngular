export interface Payment {
    paymentId:number;
    customerId:number;
    userId:number;
    creditCardId:number;
    firstName:string;
    lastName:string;
    email:string;
    companyName:string;
}

export interface AddPaymentModel {
    creditCardId:number;
    customerId:number;
    cvv:string;
    expirationDate:string;

}