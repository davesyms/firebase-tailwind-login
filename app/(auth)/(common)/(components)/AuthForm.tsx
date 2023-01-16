"use client";
import React, { FormEventHandler } from "react";
import InputField from "../(components)/InputField";
import Button from "../../../../components/Button";
import { PasswordError } from "../../../../types/SignInTypes";
import { ErrorMessage } from "../(util)/errorParsing";
import Logo from "../../../../components/Logo";

export default function AuthForm(props: {
    type: "Sign Up" | "Sign In";
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    emailError: ErrorMessage | undefined;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    passwordError: PasswordError | "Wrong Password" | undefined;
    children?: React.ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
    disableSubmit?: boolean;
}) {
    return (
        <div className="w-screen h-screen flex align-middle justify-center">
            <form
                className="m-auto w-full h-fit md:w-[50%] md:outline md:outline-1 md:p-[5%]"
                onSubmit={props.onSubmit}
            >
                <div className="w-full h-full px-5 flex align-middle flex-col flex-nowrap text-left">
                    <div className="w-full h-[150px] flex align-bottom">
                        <Logo className="w-auto h-auto max-h-[80px] m-auto" />
                    </div>
                    <div className="w-full h-[2rem] text-2xl font-header">
                        <h1>{props.type}</h1>
                    </div>
                    <div className="w-full h-[85px] pt-[8px]">
                        <InputField
                            type="email"
                            value={props.email}
                            placeholder="Email"
                            error={props.emailError ? props.emailError : null}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                props.setEmail(
                                    e.currentTarget.value
                                        ? e.currentTarget.value
                                        : ""
                                )
                            }
                            required
                        />
                    </div>
                    <div className="w-full h-[85px] pt-[8px]">
                        <InputField
                            type="password"
                            value={props.password}
                            placeholder="Password"
                            error={
                                props.passwordError ? props.passwordError : null
                            }
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                props.setPassword(
                                    e.currentTarget.value
                                        ? e.currentTarget.value
                                        : ""
                                )
                            }
                            required
                        />
                    </div>
                    {props.children && (
                        <div className="w-full h-[85px] pt-[8px]">
                            {props.children}
                        </div>
                    )}
                    <div className="w-full h-[60px] p-1">
                        <Button
                            type="submit"
                            text={props.type}
                            disabled={props.disableSubmit}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
