import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <div className={`flex gap-2 items-center hover:bg-sky-500 p-2 mb-2 cursor-pointer 
      ${!lastIdx ? 'border-b border-y-gray-600 ' : ' '}
      ${isSelected ? 'bg-sky-500' : ''}`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="avatar online">
        <div className="w-12">
          <img src={conversation.profilePic} alt="user avatar" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200">{conversation.fullname}</p>
          <span className="text-xl">{emoji}</span>
        </div>
      </div>
    </div>
  );
};
export default Conversation;
