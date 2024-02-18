import React from 'react'


// export interface inputHelperProps {}
// export const inputHelper=({}:inputHelperProps)=>(

export const inputHelper=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>,data:any)=>{
const tempData:any={...data};
tempData[e.target.name]=e.target.value;
return tempData;

}
