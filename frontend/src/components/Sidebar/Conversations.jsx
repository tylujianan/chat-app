import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { isloading, conversations } = useGetConversations();
  return (
    <div className="flex justify-center items-center h-full">
      {
        !isloading && <div className="h-full w-full">
          {conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              emoji={getRandomEmoji()}
              lastIdx={idx === conversations.length - 1}
            />
          ))}
        </div>
      }
      {isloading ? <span className='loading loading-bars text-info'></span> : null}
    </div>
  );
};

export default Conversations;
