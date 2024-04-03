import { useEffect, useState } from "react";
import {apiGetRequest} from "../api/apiRequest";
import { SidebarWithHeader } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  const [user, setuser] = useState()
  const userToken = useSelector((state) => state?.user?.currentUser?.token);

  const navigate = useNavigate();

  useEffect(() => {
    apiGetRequest('api/user_plan/current',
      userToken
    ).then(res => {
      setuser(res.data.data);
      if (!res.data.data.plan) {
        navigate('/price-plan');
      }
    }).catch(error => console.log(error))
  }, [])
  return user && <SidebarWithHeader userContent={user} userAuth={userToken} />;
};

export default RootLayout;
