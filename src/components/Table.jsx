/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

const Table = ({ tableData }) => {
  return (
    <div className="overflow-hidden rounded-md">
      <table className="min-w-full">
        <thead className="bg-blue-500 border-b ">
          <tr className="text-white">
            <th scope="col" className="text-sm font-medium  text-center py-4">
              شمارنده
            </th>
            <th scope="col" className="text-sm font-medium  text-center py-4">
              عنوان
            </th>
            <th scope="col" className="text-sm font-medium  text-center py-4">
              موجود
            </th>
            <th scope="col" className="text-sm font-medium  text-center py-4">
              تست
            </th>
          </tr>
        </thead>
        <tbody className="border-2">
          {tableData.map((item) => {
            const { id, title, brand, description, image, price, status } =
              item;
            return (
              <tr
                key={item.id}
                bg={colorMode === "light" ? "gray.300" : "gray.700"}
                className="border-b "
              >
                <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">
                  {title}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
