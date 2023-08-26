import axios from "axios";
import { useEffect, useState } from "react";
import { getUserFromToken } from "../services/service";

const url = "http://localhost:8080" 
//note instead of passing url like this we can also do this
//   ** axios.defaults.baseURL = "http://localhost:8080" **


// custom hook ;
export default  function useFetch (query) {
 
     const [getData , setData] = useState({ isLoading : false , apiData : undefined , status : null , serverError : null });  

     useEffect(()=> {
        
        

        const fetchData = async ()=> {
             try {
   
                setData(prev => ({...prev , isLoading : true}));
                const { username} = await getUserFromToken();
               
                const { data , status }  = !query ? await axios.get(`${url}/user/${username}`) : await axios.get(`${url}${query}`);

                 console.log("27");
                if(status === 201 ){
         
                  setData(prev => ({...prev , isLoading : false }))
                  setData( prev => ({...prev , apiData : data , status : status}) )
                }
                setData(prev => ({...prev , isLoading : false}));
             } catch (error) {

               console.log(error , "35" , getData);
                setData(prev=> ( {...prev , isLoading : false , serverError : error}))
             }
        }
        fetchData();

        
      }, [query])

      return [ getData   ];

   }