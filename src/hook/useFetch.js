import { useState, useEffect } from "react";
import { apiGetRequest } from "../api/apiRequest";
import { useToast } from "@chakra-ui/react";



const useFetch = (url,token) => {
    const [data, setData] = useState(null);
    const toast = useToast 

    useEffect(() => {
        apiGetRequest(url, token).then(res => {
            setData(res.data)
        }).catch((error) =>{
            toast({
                description: "مشکلی پیش اماد آمده است!",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }, []);

    return [data];
};

export default useFetch;                      