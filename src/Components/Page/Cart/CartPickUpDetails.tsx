import React,{useState,useEffect} from 'react'
import{useSelector} from 'react-redux'
import{cartItemModel,apiResponse}from'../../../interfaces';
import{RootState}from'../../../Storage';
import{inputHelper}from'../../../Helper';
import{MiniLoader}from'../../../Components/Page/Common';
import{useInitiatePaymentMutation}from'../../../apis';
import{useNavigate}from'react-router'



export const CartPickUpDetails=()=>{
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData = useSelector((state: RootState) => state.userAuthStore);
  let grandTotal = 0;
  let totalItems = 0;

  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  };

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState(initialUserData);
  const [loading, setLoading] = useState(false);
  const [initiatePayment] = useInitiatePaymentMutation();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  useEffect(()=>{
    setUserInput({
      name: userData.fullName,
      email: userData.email,
      phoneNumber: "",
    })
  },[userData])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data }: apiResponse = await initiatePayment(userData.id);

    navigate("/payment", {
      state: { apiResult: data?.result, userInput },
    });
  };

return (
  <div className="border pb-5 pt-3">
    <h1 style={{ fontWeight: "300" }} className="text-center text-success">
      Pickup Details
    </h1>
    <hr />
    <form onSubmit={handleSubmit} className="col-10 mx-auto">
      <div className="form-group mt-3">
        Pickup Name
        <input
          type="text"
          value={userInput.name}
          onChange={handleUserInput}
          className="form-control"
          placeholder="name..."
          name="name"
          required
        />
      </div>
      <div className="form-group mt-3">
        Pickup Email
        <input
          type="email"
          value={userInput.email}
          onChange={handleUserInput}
          className="form-control"
          placeholder="email..."
          name="email"
          required
        />
      </div>

      <div className="form-group mt-3">
        Pickup Phone Number
        <input
          type="number"
          value={userInput.phoneNumber}
          onChange={handleUserInput}
          className="form-control"
          placeholder="phone number..."
          name="phoneNumber"
          required
        />
      </div>
      <div className="form-group mt-3">
        <div className="card p-3" style={{ background: "ghostwhite" }}>
          <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
          <h5>No of items : {totalItems}</h5>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-success form-control mt-3"
        disabled={loading}
      >
        {loading ? <MiniLoader /> : " Looks Good? Place Order!"}
      </button>
    </form>
  </div>
);
}
