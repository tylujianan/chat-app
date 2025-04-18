import SerarchInput from "./SerarchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="flex flex-col p-4 border-r border-slate-500">
      <SerarchInput />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
