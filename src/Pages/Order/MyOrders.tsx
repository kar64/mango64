import React from 'react'
import{useSelector}from'react-redux';
import{RootState}from'../../Storage';
import{useGetAllOrdersQuery}from'../../apis';
import{MainLoader}from'../../Components/Page/Common';
import { orderHeaderModel } from '../../interfaces';
import{OrderList}from'./OrderList';


// export interface MyOrdersProps {}
// export const MyOrders=({}:MyOrdersProps)=>(

export const MyOrders=()=>{
const userId=useSelector((state:RootState)=>state.userAuthStore.id)

const {data,isLoading}=useGetAllOrdersQuery(userId)

return (
  <>
  {isLoading?(<MainLoader/>):( <OrderList isLoading={isLoading} orderData={data.result}/>)}
 
  </>
);
}
