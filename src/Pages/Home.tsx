import React from 'react'

import{Banner}from'../Components/Page/Common';
import { MenuItemList } from '../Components/Page/Home/MenuItemList';


// export interface HomeProps {}
// export const Home=({}:HomeProps)=>(

export const Home=()=>{

return(
        <div>
        <Banner/>
        <div className="container p-2">
          <MenuItemList/>  
        </div>
        
        </div>
    )
}
