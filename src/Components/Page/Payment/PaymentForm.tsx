import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import{useState}from'react';
import{toastNotify}from'../../../Helper';
import{orderSummaryProps}from'../Order/OrderSummaryProps';
import { apiResponse, cartItemModel } from '../../../interfaces';
import{useCreateOrderMutation}from'../../../apis';
import { SD_Status } from '../../../Utility/SD';
import{useNavigate}from'react-router';

export const PaymentForm= ({data,userInput}:orderSummaryProps) => {
  const navigate=useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });
  
    if (result.error) {
      toastNotify("error", "error");
      setIsProcessing(false);
    } else {
      let grandTotal = 0;
      let totalItems = 0;
      const orderDetailsDTO: any = [];
      data.cartItems?.forEach((item: cartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["menuItemId"] = item.menuItem?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.menuItem?.name;
        tempOrderDetail["price"] = item.menuItem?.price;
        orderDetailsDTO.push(tempOrderDetail);
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;
      });
      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItems,
        orderTotal: grandTotal,
        stripePaymentIntentId:data.stripePaymentIntentId,
        applicationUserId:data.userId,
        status:result.paymentIntent.status==="succeeded"
        ?SD_Status.CONFIRMED
        :SD_Status.PENDING,
        orderDetailsDTO:orderDetailsDTO
      });
      
      if(response){
        if(response.data?.result.status===SD_Status.CONFIRMED){
          navigate(`/order/orderconfirmed/${response.data?.result.orderHeaderId}`)
        }else{
          navigate('/failed')
        }
      }
    }
    setIsProcessing(false)
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || isProcessing}
        className="btn btn-success mt-5 w-100"
      >
        <span className="button-text">
          {isProcessing?"Processing...":"Submit Order"}
        </span>
      </button>
    </form>
  );
};

