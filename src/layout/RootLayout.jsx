import { useEffect, useState } from "react";
import { apiGetRequest } from "../api/apiRequest";
import { Loader, SidebarWithHeader } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  const [user, setuser] = useState();

  const userToken = useSelector((state) => state?.user?.currentUser?.token);

  const navigate = useNavigate();

  // checked auth for token all page
  const chekAuth = async () => {
    if (!userToken) {
      navigate("/sign-in");
      return false;
    }
    return true;
  };
  useEffect(() => {
    const effect = async () => {
      const hasAuth = await chekAuth();

      if (!hasAuth)
        return;
      try {
        const res = await apiGetRequest("api/user_plan/current", userToken);

        console.log(res.data);
        setuser(res.data.data);
        if (!res.data.data.plan) {
          navigate("/price-plan");
        }
      } catch (error) {
        localStorage.clear();
        navigate("/");
      }
    }

    effect();
  }, []);

  return (
    !user ? <Loader /> : (
      <SidebarWithHeader
        userContent={user}
        userAuth={userToken}
        logOut={() => {
          setuser(null);
        }}
      />
    )
  );
};

export default RootLayout;
