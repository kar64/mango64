import React from 'react'
import{useDispatch,useSelector}from'react-redux';
import{useGetMenuItemByIdQuery,useUpdateShoppingCartMutation}from'../apis';
import{useParams,useNavigate}from'react-router-dom'
import{useState}from'react';
import{MainLoader,MiniLoader}from'../Components/Page/Common';
import{apiResponse,userModel}from'../interfaces';
import{toastNotify}from'../Helper';
import{RootState}from'../Storage';


// USER ID b0f39bda-1017-44f7-b256-5539cfe81fda
// f8fec95c-f8aa-49e9-872b-dc5e8a544ced

// export interface MenuItemDetailsProps {}
// export const MenuItemDetails=({}:MenuItemDetailsProps)=>(

export const MenuItemDetails=()=>{
  const{menuItemId}=useParams()
  const dispatch=useDispatch();
  const{data,isLoading}=useGetMenuItemByIdQuery(menuItemId)
  const navigate=useNavigate()
  const[quantity,setQuantity]=useState(1)
  const[isAddingToCart,setIsAddingToCart]=useState<boolean>(false)
  const[updateShoppingCart]=useUpdateShoppingCartMutation()

  const userData:userModel=useSelector((state:RootState)=>state.userAuthStore)

  const handleAddToCart=async (menuItemId:number)=>{
    if(!userData.id){
      navigate('/login')
      return
    }
    setIsAddingToCart(true);
    const response:apiResponse= await updateShoppingCart({
      menuItemId:menuItemId,
      updateQuantityBy:quantity,
      userId:userData.id
    })
   if(response.data&&response.data.isSuccess){
    toastNotify('Item added to cart succesfully!')
   }
    setIsAddingToCart(false)
  }
 
if(isLoading){
  return <MainLoader/>
}
 
return(
    <div className="container pt-4 pt-md-5">
    <div className="row">
      <div className="col-7">
        <h2 className="text-success">{data.result?.name}</h2>
        <span>
          <span
            className="badge text-bg-dark pt-2"
            style={{ height: "40px", fontSize: "20px" }}
          >
            {data.result?.category}
          </span>
        </span>
        <span>
          <span
            className="badge text-bg-light pt-2"
            style={{ height: "40px", fontSize: "20px" }}
          >
            {data.result?.specialTag}
          </span>
        </span>
        <p style={{ fontSize: "20px" }} className="pt-2">
          {data.result?.description}
        </p>
        <span className="h3">${data.result?.price}</span> &nbsp;&nbsp;&nbsp;
        <span
          className="pb-2  p-3"
          style={{ border: "1px solid #333", borderRadius: "30px" }}
        >
          <i
            onClick={()=>setQuantity(quantity===1?1:quantity-1)}
            className="bi bi-dash p-1"
            style={{ fontSize: "25px", cursor: "pointer" }}
          ></i>
          <span className="h3 mt-3 px-3">{quantity}</span>
          <i
            onClick={()=>setQuantity(quantity+1)}
            className="bi bi-plus p-1"
            style={{ fontSize: "25px", cursor: "pointer" }}
          ></i>
        </span>
        <div className="row pt-4">
          <div className="col-5">
            {isAddingToCart?(<button disabled
              className="btn btn-success form-control"
            ><MiniLoader /></button>):(   <button 
            className="btn btn-success form-control"
            onClick={()=>handleAddToCart(data.result?.id)}
            >
              Add to Cart
            </button>)}
         
          </div>

          <div className="col-5 ">
            <button className="btn btn-secondary form-control"
            onClick={()=>navigate(-1)}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <div className="col-5">
        <img
          src={data.result?.image}
          width="100%"
          style={{ borderRadius: "50%" }}
          alt="No content"
        ></img>
      </div>
    </div>
  </div>
    )
}
