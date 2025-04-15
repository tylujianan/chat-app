import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/Messages/MessageContainer";

const home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default home;
