import { useState } from "react";
import { Icon } from "@iconify/react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const { isloading, sendMessage } = useSendMessage();
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() == '') return
        await sendMessage(message);
        setMessage('');
    }
    return (
        <form className='px-4 my-3 absolute bottom-0 w-full' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border outline-none text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {isloading ? <div className='loading loading-spinner'></div> : <Icon icon="tabler:send" className="text-2xl text-slate-500" />}
                </button>
            </div>
        </form>
    )
}

export default MessageInput
