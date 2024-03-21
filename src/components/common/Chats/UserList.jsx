import { CircleCheck } from "../../../constants/icons"



function UserList() {
  return (
    <div className="flex gap-3 mt-4 p-2 cursor-pointer border-b-2 border-gray-300">
        <img src="/avatar.webp" alt="not-found" width={30}/>
        <div className="flex-col ">
              <h3 className="font-bold text-sm tracking-tight my-1">امیر رضا جلالی 
                  <span><CircleCheck className="text-red-600 inline text-xl mr-10" /></span>
              </h3>
              <p className="text-sm">اخرین متن میتونید دریافت ...</p>
        </div>
    </div>
  )
}

export default UserList
