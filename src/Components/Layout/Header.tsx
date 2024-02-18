import React from 'react'
import{useSelector,useDispatch}from 'react-redux'
import{NavLink,useNavigate}from'react-router-dom';
import{cartItemModel,userModel}from'../../interfaces';
import{RootState}from'../../Storage';
import{setLoggedInUser,emptyUserState}from'../../Storage';
import{SD_Roles}from'../../Utility/SD';



export let logo=require('../../Assets/images/mango.png')





export const Header=()=>{

const navigate=useNavigate();
const dispatch=useDispatch();

const shoppingCartFromStore:cartItemModel[]=useSelector((state:RootState)=>state.shoppingCartStore.cartItems??[]);
const userData:userModel=useSelector((state:RootState)=>state.userAuthStore);

const handleLogout=()=>{
  localStorage.removeItem('token');
  dispatch(setLoggedInUser({...emptyUserState}))
  navigate('/')
}

    return (
      <div>
        <nav className="navbar navbar-expand-lg  bg-dark navbar-dark">
          <div className="container-fluid">
            <NavLink className="nav-link " aria-current="page" to="/">
              <img src={logo} style={{ height: "40px" }} className="m-1" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                {userData.role==SD_Roles.ADMIN?(
                     <li className="nav-item dropdown">
                     <a
                       className="nav-link dropdown-toggle"
                       href="#"
                       role="button"
                       data-bs-toggle="dropdown"
                       aria-expanded="false"
                     >
                       Admin Panel
                     </a>
                     <ul className="dropdown-menu">
                     <li className='dropdown-item'
                     style={{cursor:'pointer'}}
                     onClick={()=>navigate('menuitem/menuitemlist')}
                     >
                        Menu Item
                       </li>
                       <li 
                       style={{cursor:'pointer'}}
                       className='dropdown-item'
                        onClick={()=>navigate('order/myOrders')}>
                           My Orders
                       </li>
                       <li 
                       style={{cursor:'pointer'}}
                       className='dropdown-item'
                        onClick={()=>navigate('order/allOrders')}>
                           All Orders
                       </li>
                     
                     </ul>
                   </li>
                ):(
                     <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="/order/myOrders">
                    Orders
                  </NavLink>
                </li>
)}
             

                  
                    

             
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/shoppingCart"
                  >
                    <i className="bi bi-cart"></i>
                    {userData.id&&`(${shoppingCartFromStore.length})`}
                  
                  </NavLink>
                </li> 
                <div className="d-flex" style={{ marginLeft: "auto" }}>
                  {userData.id && (
                    <>
                      <li className="nav-item">
                        <button
                          className="nav-link active"
                          style={{
                            cursor: "pointer",
                            background: "transparent",
                            border: 0,
                          }}
                        >
                          Welcome, {userData.fullName}
                        </button>
                      </li>
                      <li className="nav-item ">
                        <button
                          className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                          style={{
                            border: "none",
                            height: "40px",
                            width: "100px",
                          }}
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                  {!userData.id && (
                    <>
                      {" "}
                      <li className="nav-item text-white">
                        <NavLink className="nav-link" to="/register">
                          Register
                        </NavLink>
                      </li>
                      <li className="nav-item text-white">
                        <NavLink
                          className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                          to="/login"
                          style={{
                            border: "none",
                            height: "40px",
                            width: "100px",
                          }}
                        >
                          Login
                        </NavLink>
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
}
