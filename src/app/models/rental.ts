export interface Rental {
    brandName:string;
    firstName:string;
    lastName:string;
    rentDate:Date;
    returnDate:Date;
    carId:number;
    modelYear:number;
    description:string;
    dailyPrice:number;
    colorName:string;
}

export interface AddRental {
    carId:number;
    customerId:number;
    rentDate:Date;
    returnDate:Date;

}