import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import useShowToast from "./useShowToast";
const useGetUserProfile = () => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const {username} = useParams();
    const showToast = useShowToast();


    useEffect(()=>{

        const getUser = async()=>{
            try{
              const res = await fetch(`https://threads-backend-8pii.onrender.com/api/users/profile/${username}`);
              const data= await res.json();
              if(data.error){
                showToast("Error",data.error,"error");
                return;
              };
      
              setUser(data);
            
            }catch(error){
              showToast("Error",error,"error");
            }finally{
              setLoading(false);
            }
          };

          getUser();
    },[username,showToast]);

  return {loading,user}
}

export default useGetUserProfile;