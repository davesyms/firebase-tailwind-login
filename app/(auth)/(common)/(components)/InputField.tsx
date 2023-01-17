import React, { ChangeEventHandler } from "react";
import styles from "./InputFieldStyles.module.css";
type TextInputType =
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

export default function InputField(props: {
    type: TextInputType;
    value: string;
    placeholder: string;
    error: string | null;
    onChange?: ChangeEventHandler;
    required?: boolean;
}) {
    return (
        <div className={`w-full shadow-none h-full ${styles.input}`}>
            <input
                className={`autofill:bg-transparent bg-transparent 
            w-full h-[80%] rounded-md focus:outline-none  focus:border-transparent`}
                type={props.type ? props.type : "text"}
                value={props.value ? props.value : ""}
                onChange={props.onChange ? props.onChange : () => {}}
                placeholder={props.placeholder ? props.placeholder : ""}
                required={props.required ? props.required : false}
            />
            <div
                className={`w-100 h-[1px] ${
                    props.error ? "bg-red-600" : "bg-black"
                }`}
            ></div>
            <div
                className={`w-full h-[20%] ${
                    props.error ? "text-red-600" : "text-black"
                }`}
            >
                {props.error ? (
                    <p className="text-xs">{props.error}</p>
                ) : (
                    <p className="text-xs">{props.placeholder}</p>
                )}
            </div>
        </div>
    );
}
