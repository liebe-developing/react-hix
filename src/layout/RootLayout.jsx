import { useEffect, useState } from "react";
import { apiGetRequest } from "../api/apiRequest";
import { Loader, SidebarWithHeader } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Footer } from "../pages";

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

        setuser(res.data.data);
        if (!res.data.data.plan) {
          if (!res.data.data.user.operator_user_plan_id)
            navigate("/price-plan");
          else {
            navigate("/chats");
          }
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
      <>
        <SidebarWithHeader
          userContent={user}
          userAuth={userToken}
          logOut={() => {
            setuser(null);
          }}
        />
        <Footer userContent={user} />
      </>
    )
  );
};

export default RootLayout;
