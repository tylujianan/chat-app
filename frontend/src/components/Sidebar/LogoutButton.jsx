import { Icon } from "@iconify/react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {
        !loading ? <Icon
          icon="simple-line-icons:logout"
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        /> : <span className="loading loading-spinner loading-lg"></span>
      }
    </div>
  );
};

export default LogoutButton;
