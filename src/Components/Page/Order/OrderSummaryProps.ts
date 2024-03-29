import { SD_Status } from '../../../Utility/SD';
import{shoppingCartModel}from'../../../interfaces';

export interface orderSummaryProps{
    data:{
        id?:number;
        cartItems?:shoppingCartModel[];
        cartTotal?:number;
        userId?:string;
        stripePaymentIntentId?:string;
        status?:SD_Status;
    };
    userInput:{
        name:string;
        email:string;
        phoneNumber:string;
    };
}