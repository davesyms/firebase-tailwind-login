import React, { MouseEventHandler } from "react";

export default function Button(props: {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    highlighted?: boolean;
    disabled?: boolean;
    className?: string;
}) {
    return (
        <button
            type={props.type}
            className={`font-body text-xl
                        border border-black
                        rounded-lg py-2 px-5 w-full h-full
                        flex justify-center items-center
                        focus:bg-primary focus:text-white focus:border-none
                      disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed
                      hover:bg-primary hover:text-white hover:border-none
                      ${props.highlighted ? "text-white bg-primary" : ""} ${props.className ? props.className : ""}`}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
}
