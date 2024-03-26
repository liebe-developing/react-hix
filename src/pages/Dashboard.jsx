import { DesktopIcons, FaFacebook } from "../constants/icons";
import { SimpleGrid } from '@chakra-ui/react'
import { BoxUiContentHero, BoxUiContentBottom } from "../components/index"

const Dashboard = () => {


  return (
    <div className="flex flex-col">
      <div className=" w-full md:h-[400px]  rounded-md grid grid-cols-1 lg:grid-cols-7 gap-2">
        {/* RGITH - CONTENT */}
        <div className="box_border col-span-5 w-full  md:h-1/2 p-2
      shadow-lg bg-orange-500 rounded-lg flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col justify-around">
              <h3>سلام متیونم کمکتون کنم ممنون میشم راهنمایی به من بدید ممنون میشم خیلی باید تلاش کننم تا به اهدافم برسی</h3>
              <div className="mr-10">
                <span className="mx-3"><DesktopIcons className="inline-flex text-3xl lg:text-5xl cursor-pointer hover:bg-purple-500 text-white bg-purple-700 rounded-full p-2" /></span>
                <span><FaFacebook className="inline-flex text-3xl lg:text-5xl cursor-pointer hover:bg-purple-500 text-white bg-purple-700 rounded-full p-2" /></span>
              </div>
            </div>
            <img src="/taking-note.png" alt="not-found" className=" h-[70%] mx-10" />
          </div>
        </div>
        {/* </>*/}

        {/* LFET - CONTENT -- COM */}
        <div className="col-span-2">
          <SimpleGrid columns={2} spacing={10} paddingTop={5} paddingLeft={3}>
            <BoxUiContentHero /> 
            <BoxUiContentHero /> 
            <BoxUiContentHero /> 
            <BoxUiContentHero /> 
          </SimpleGrid>
        </div>
      </div>
      {/* CONTENT-NEW BOTTOM - COTNAINER --COM */}
      <div className="max-w-3xl md:mr-[120px] mt-10 ">
        <SimpleGrid columns={[1, 2, 2]} spacing={10}>
          <BoxUiContentBottom />
          <BoxUiContentBottom />
        </SimpleGrid>
      </div>
    </div>
  );
};

export default Dashboard;


// Style

