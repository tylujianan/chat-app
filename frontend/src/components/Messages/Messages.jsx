import Message from './Message.jsx'
import messageList from '../../utils/messages.js' // Import the messageList array from MessageList.jsx to ma

const Messages = () => {
    return (
        <div className='p-5'>
            {messageList.map((message, index) => <Message key={index} {...message} />)}
        </div>
    )
}

export default Messages
