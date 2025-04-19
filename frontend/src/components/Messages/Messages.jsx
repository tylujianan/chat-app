import React, { useState, useEffect, useRef } from 'react'
import Message from './Message.jsx'
import useGetMessages from '../../hooks/useGetMessages.js'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useListenMessages from '../../hooks/useListenMessages.js'

const Messages = () => {
    const { messages, isloading } = useGetMessages();
    const lastMessageRef = useRef();
    const containerRef = useRef(null);
    // const [isFirstRender, setIsFirstRender] = useState(true);

    useListenMessages();
    let isFirstRender = true;
    useEffect(() => {
        // console.log(isloading)
        if (containerRef.current && isFirstRender) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
            if (!isloading) isFirstRender = false;
        }
    }, [isloading]);

    useEffect(() => {
        if (lastMessageRef.current) {
            setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages]);
    return (
        <div className='py-12 px-5 pt-20 flex-1 overflow-auto' ref={containerRef}>
            {!isloading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}
            {isloading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {
                !isloading && messages.length === 0 && <p className='text-center text-white'>Send a message to start the conversation</p>
            }
        </div>
    )
}

export default Messages
