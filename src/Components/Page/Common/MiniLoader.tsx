import React from 'react'


// export interface MiniLoaderProps {}
// export const MiniLoader=({}:MiniLoaderProps)=>(

export const MiniLoader=({type="warning",size=100})=>{

return(
    <div className={`spinner-border text-${type}`}
    style={{scale:`${size}%`}}
    ></div>
    )
}
