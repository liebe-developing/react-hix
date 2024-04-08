// Chats.jsx
import { Flex, Avatar } from "@chakra-ui/react";
import { CircleCheck } from "../../constants/icons";

function UserList({ name, id, email }) {
  const uiHandler = () => {
    <Message text={email} />;
  };
  return (
    <div
      className="flex items-center gap-3 mt-4 p-2 cursor-pointer border-b-2 border-gray-300"
      onClick={uiHandler}
    >
      <Avatar src="/avatar.webp" name={name} className="w-10 h-10 mt-3" />
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-sm tracking-tight my-1">
          {name}
          <span>
            <CircleCheck className="text-red-600 inline text-xl mr-10" />
          </span>
        </h3>
        <p className="text-xs text-gray-600">اخرین متن میتونید دریافت ...</p>
      </div>
    </div>
  );
}

export default UserList;
