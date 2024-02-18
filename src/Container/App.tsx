import React, { useState } from "react";
import{Header,Footer}from'../Components/Layout';
import{Home,NotFound,MenuItemDetails,ShoppingCart,Login,Register}from'../Pages';
import{Routes,Route}from'react-router-dom';
import{useEffect}from'react';
import{useDispatch,useSelector}from'react-redux';
import{useGetShoppingCartQuery}from'../apis';
import{setShoppingCart,setLoggedInUser}from'../Storage';
import jwt_decode from 'jwt-decode'
import{userModel}from'../interfaces';
import{AccessDenied,AuthentationTest,AuthentationTestAdmin,Payment,OrderConfirmed,MyOrders,OrderDetails,
AllOrders,MenuItemList,MenuItemUpsert}from'../Pages';
import{withAuth,withAdminAuth}from'../HOC';
import{RootState}from'../Storage';





function App() {
const dispatch=useDispatch();

const userData=useSelector((state:RootState)=>state.userAuthStore)
const{data,isLoading}=useGetShoppingCartQuery(userData.id)


useEffect(()=>{
  const localToken=localStorage.getItem('token')
  if(localToken){
    const{fullName,id,email,role}:userModel=jwt_decode(localToken)
    dispatch(setLoggedInUser({fullName,id,email,role}))
  }
  
},[])

useEffect(()=>{
  if(!isLoading){
   
    dispatch(setShoppingCart(data.result?.cartItems))
  }
},[data])


let AShoppingCart=withAuth(ShoppingCart)
let AAuthentationTest=withAuth(AuthentationTest)
let AAuthentationTestAdmin=withAdminAuth(AuthentationTestAdmin)
let AMyOrders=withAuth(MyOrders);
let AAllOrders=withAdminAuth(AllOrders)
  return (
    <>
    
      <div>
        <Header />
        <div className="pb-5">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />}></Route>
            <Route path='/shoppingCart' element={<AShoppingCart/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/accessDenied' element={<AccessDenied/>}></Route>
            <Route path='/authentication' element={<AAuthentationTest/>}></Route>
            <Route path='/authorisation' element={<AAuthentationTestAdmin/>}></Route>
            <Route path='/payment' element={<Payment/>}></Route>
            <Route path='/order/orderconfirmed/:id' element={<OrderConfirmed/>}></Route>
            <Route path='/order/myOrders' element={<AMyOrders/>}></Route>
            <Route path='/order/allOrders' element={<AAllOrders/>}></Route>
            <Route path='/order/orderDetails/:id' element={<OrderDetails/>}></Route>
            <Route path='/menuitem/menuitemlist' element={<MenuItemList/>}></Route>
            <Route path='/menuitem/menuitemupsert/:id' element={<MenuItemUpsert/>}></Route>
            <Route path='/menuitem/menuitemupsert' element={<MenuItemUpsert/>}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
