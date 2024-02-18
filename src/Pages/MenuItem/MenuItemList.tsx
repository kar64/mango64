import React from 'react'
import{useDeleteMenuItemMutation, useGetMenuItemsQuery}from'../../apis';
import { MainLoader } from '../../Components/Page/Common';
import { menuItemModel } from '../../interfaces';
import{useNavigate}from'react-router'
import{toast}from'react-toastify';


// export interface MenuItemListProps {}
// export const MenuItemList=({}:MenuItemListProps)=>(
  export let logo=require('../../Assets/images/mango.png')

export const MenuItemList=()=>{
const navigate=useNavigate()
const{data,isLoading}=useGetMenuItemsQuery(null)
const[deleteMenuItem]=useDeleteMenuItemMutation()

const handleMenuItemDelete=async(id:number)=>{
  
   toast.promise(
    deleteMenuItem(id) ,
    {
      pending: 'Processing your request....',
      success: 'Menu Item Delete 👌',
      error: 'Error 🤯'
    },
    {
      theme:"dark"
    }
)
}
return (
  <>
    {isLoading ? (
      <MainLoader />
    ) : (
      <div className="table p-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="text-success">MenuItem List</h1>
          <button className="btn btn-success"
           onClick={()=>navigate('/menuitem/menuitemupsert')}
          >Add New Menu Item</button>
        </div>
        <div className="p-2">
          <div className="row border">
            <div className="col-2">Image</div>
            <div className="col-1">ID</div>
            <div className="col-2">Name</div>
            <div className="col-2">Category</div>
            <div className="col-1">Price</div>
            <div className="col-2">Special Tag</div>
            <div className="col-1">Action</div>
          </div>
          {data.result.map((item: menuItemModel) => (
            <div className="row border" key={item.id}>
              <div className="col-2" style={{position:'relative',width:'150px',height:'150px'}}>
               <img
                  src={logo}
                  
                  alt="no content"
                  style={{ width: "100%", maxWidth: "120px",position:'absolute' }}
                />
                <img
                  src={item.image}
                  // alt="no content"
                  style={{ width: "100%", maxWidth: "120px" ,position:'absolute'}}
                />
              </div>

              <div className="col-1">{item.id}</div>
              <div className="col-2">{item.name}</div>
              <div className="col-2">{item.category}</div>
              <div className="col-1">{item.price}</div>
              <div className="col-2">{item.specialTag}</div>
              <div
                className="col-1 "
                style={{ display: "flex", alignItems: "start" }}
              >
                <button className="btn btn-success"
                onClick={()=>navigate('/menuitem/menuitemupsert/'+item.id)}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button className="btn btn-danger mx-2" 
                onClick={()=>handleMenuItemDelete(item.id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);
}
