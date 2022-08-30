import { useState, useEffect, useRef } from "react";
import MessageChat from "./MessageChat";
import Notification from "./Notification";

import axios from "axios";

const WritingEmpty = {
    id: "",
    name: "",
    value: "",
};

const initialValue = [
    {
        id: "",
        name: "App-convert",
        message: "Bienvenido, ingrese un valor a convertir",
        type: "notification",
    },
];

const Chat = () => {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState(initialValue);
    const [loading, setLoading] = useState(false);

    const divRef = useRef(null);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            return;
        }
    };

    const fetData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/convert`,
                { value }
            );
            setMessages([
                ...messages,
                {
                    name: "me",
                    result: value,
                    type: "message",
                },
                data,
            ]);
            setLoading(false);
        } catch (error) {
            setMessages([
                ...messages,
                {
                    name: "App-convert",
                    message: error.response.data.msg,
                    type: "notification",
                },
            ]);

            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessages([...messages]);

        fetData();

        setValue("");
    };

    return (
        <div className="flex flex-col space-y-8 p-2 w-full lg:w-1/3 md:w-1/2 ">
            <div>
                <h1 className="text-4xl font-bold text-center text-indigo-600">
                    Conversion Chat
                </h1>

                <p className="text-center">
                    Convierta pesos a dolares al instante
                </p>
            </div>
            <div className="space-y-1">
                <div className="overflow-hidden rounded-xl bg-white flex flex-col max-h-52 shadow min-h-[50vh]   ">
                    <div className=" w-full   overflow-y-auto p-2 lg:p-6   space-y-4 focus:outline-none focus:border-0 ">
                        <>
                            {messages.map((message, index) => {
                                if (message.type === "message") {
                                    return (
                                        <MessageChat
                                            message={message}
                                            key={index}
                                        />
                                    );
                                }
                                if (message.type === "notification") {
                                    return (
                                        <Notification
                                            name={name}
                                            message={message}
                                            key={index}
                                        />
                                    );
                                }
                            })}

                            <div ref={divRef}></div>
                        </>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700">Valor:</label>
                            <input
                                className="focus:outline-none focus:border-0 p-4 overflow-hidden rounded-lg shadow"
                                type="number"
                                name="message"
                                id="message"
                                value={value}
                                min={0}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-600 py-2 px-4 text-white rounded-lg"
                        >
                            {loading ? "Loading" : "Send"}{" "}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
