import { useState } from "react";
import { Icon } from "@iconify/react";

const MessageInput = () => {
    const loading = false;
    const [message, setMessage] = useState(''); // State to manage the message input value
    const handleSubmit = () => {
        console.log('Submit'); // Handle the submit event her
    }
    return (
        <form className='px-4 my-3 absolute bottom-0 w-auto' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {loading ? <div className='loading loading-spinner'></div> : <Icon icon="tabler:send" className="text-2xl text-slate-500" />}
                </button>
            </div>
        </form>
    )
}

export default MessageInput
