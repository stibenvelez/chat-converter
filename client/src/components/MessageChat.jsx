import { useEffect, useState } from "react";


const MessageChat = ({ message, name }) => {
    const [itsMe, setItsMe] = useState(false);
    useEffect(() => {
        if (message.name === "me") {
            return setItsMe(true);
        }
        setItsMe(false);
    }, [message, name]);

    return (
        <div
            className={`${!itsMe ? "flex justify-start" : "justify-end"} flex `}
        >
            <div
                className={`${
                    itsMe ? "bg-indigo-100" : "bg-green-100"
                } py-1 lg:py-2 px-4  shadow rounded-xl max-w-fit`}
            >
                <span className="text-gray-700 ">
                    {!itsMe && `Equivale a: `}
                </span>
                <span className="text-gray-700">
                    <span className={`${!itsMe && "font-bold"}`}>
                        {message.result}
                    </span>{" "}
                    {itsMe && `COP `}
                </span>
            </div>
        </div>
    );
};

export default MessageChat;
