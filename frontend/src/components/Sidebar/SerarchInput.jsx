import { Icon } from "@iconify/react";
import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const SerarchInput = () => {
  const [searchParams, setSearchParams] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchParams == "") return;
    if (searchParams.length < 3) {
      return toast.error("Search query must be at least 3 characters long");
    }

    const conversation = conversations.find(
      (c) => c.fullname.toLowerCase().includes(searchParams.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearchParams("");
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row justify-between gap-3 border-b border-y-gray-600 pb-5 mb-5">
      <input
        type="text"
        className="border outline-none text-sm rounded-full block w-full p-2.5 bg-gray-900 border-gray-600 text-white"
        placeholder="Search"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <Icon
          icon="material-symbols:search"
          className="text-white text-2xl w-10"
        />
      </button>
    </form>
  );
};

export default SerarchInput;
