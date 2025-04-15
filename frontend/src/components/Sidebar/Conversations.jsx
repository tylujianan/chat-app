import { conversationList } from "../../utils/conversation";
import Conversation from "./Conversation";

const Coversations = () => {
  return (
    <div>
      {conversationList.map((item, index) => (
        <Conversation {...item} />
      ))}
    </div>
  );
};

export default Coversations;
