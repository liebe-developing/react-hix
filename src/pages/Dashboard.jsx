import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userToken = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user_id);
  console.log(userToken);
  console.log(userId);
  return (
    <div>
      <Text>{userToken}</Text>
      <Text>{userId}</Text>
    </div>
  );
};

export default Dashboard;
