import { useState } from "react";

export function useStoreLocal(innitial,key){
    const [value,setter]=useState(()=>{
        const stored=localStorage.getItem(key);
        return stored?JSON.parse(stored):innitial});
    localStorage.setItem(key,JSON.stringify(value));
    return [value,setter];
}