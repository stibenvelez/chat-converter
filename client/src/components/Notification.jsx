import React, { FC, useEffect, useState } from "react";

const Notification = ({ message, name }) => {
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
                    itsMe ? "bg-indigo-100" : ""
                } py-1 lg:py-2 text-gray-400 text-sm px-4 rounded-full max-w-fit`}
            >
                <span>{message.message}</span>
            </div>
        </div>
    );
};
export default Notification;
