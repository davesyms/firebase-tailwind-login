"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Import the custom hook for authentication context
import { useAuthContext } from "../../../context/authContext";

// Import the components for the sign in form
import AuthForm from "../(common)/(components)/AuthForm";
import Loading from "../../../components/Loading";

// Import custom types and utility functions for sign in form validation
import {
    PasswordError,
    isSignInError,
    isPasswordError,
} from "../../../types/SignInTypes";
import {
    validateEmail,
    validatePassword,
} from "../../../utils/(auth)/FieldValidations";
import {
    determineErrorMessage,
    ErrorMessage,
} from "../(common)/(util)/errorParsing";

export default function Page() {
    // useReducer for this page resulted in a lot of
    // boilerplate code and unnecessary complexity.
    // Use state to store email input value and error
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<ErrorMessage>();
    // Use state to store password input value and error
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<
        PasswordError | "Wrong Password"
    >();
    // Use state to store loading state
    const [loading, setLoading] = useState<boolean>(true);
    // Use the useRouter hook to access the router object
    const router = useRouter();
    // Use the custom hook for authentication context
    const { user, loading: authLoading, signIn } = useAuthContext();

    // useEffect hook is used to redirect the user to the homepage if the user is logged in
    useEffect(() => {
        if (user && !authLoading) {
            router.push("/");
        }
    }, [authLoading, router, user]);

    // useEffect hook is used to set the loading state to false when the authLoading state changes]
    // keeping the loading state in sync with the authLoading state
    useEffect(() => {
        if (!authLoading) {
            setLoading(false);
        }
    }, [authLoading]);

    // useEffect hook is used to validate the email input with a half second delay
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!email) {
                setEmailError(undefined);
                return;
            }
            const potentialEmailError = validateEmail(email);
            if (isSignInError(potentialEmailError)) {
                let error = determineErrorMessage(potentialEmailError);
                setEmailError(error);
                return;
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [email]);

    // useEffect hook is used to validate the email input with a 100 ms delay
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!password) {
                setPasswordError(undefined);
                return;
            }
            const potentialPasswordError = validatePassword(password);
            if (isPasswordError(potentialPasswordError)) {
                setPasswordError(potentialPasswordError);
                return;
            }
        }, 100);
        return () => clearTimeout(timeout);
    }, [password]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default behavior of the form submission
        e.preventDefault();
        // Set the loading state to true to indicate that the form is submitting
        setLoading(true);

        // Validate the email input and store the potential error
        const potentialEmailError = validateEmail(email);

        // If there is an email error, set the error message,
        // set the loading state to false and return
        if (potentialEmailError) {
            let error: ErrorMessage =
                determineErrorMessage(potentialEmailError);
            setEmailError(error);
            setLoading(false);
            return;
        }

        // Validate the password input and store the potential error
        const potentialPasswordError = validatePassword(password);

        // If there is an password error, set the error message,
        // set the loading state to false and return
        if (isPasswordError(potentialPasswordError)) {
            setPasswordError(potentialPasswordError);
            setLoading(false);
            return;
        }
        try {
            // Call the signIn function with the email and password input
            const response = await signIn(email, password);

            // If there is a sign in error
            if (isSignInError(response)) {
                //if the error is a password error, set the password error message
                if (isPasswordError(response)) {
                    setPasswordError(response);
                    setLoading(false);
                    return;
                }

                // Otherwise, determine the error message and set the appropriate error message
                let error: ErrorMessage = determineErrorMessage(response);
                if (error === "Wrong Password") {
                    setPasswordError("Wrong Password");
                } else {
                    setEmailError(error);
                }

                // Set the loading state to false and return to stop the function from running further
                setLoading(false);
                return;
            }
            // If there is no error, set the loading state to false and redirect to the homepage
            setLoading(false);
            //router.push("/");
        } catch (err: unknown) {
            console.log("error occured", err);
        }
    };

    return (
        <>
            {authLoading || loading ? (
                <div className="w-screen h-screen flex align-middle content-center">
                    <Loading className="m-auto" />
                </div>
            ) : (
                <AuthForm
                    type="Sign In"
                    email={email}
                    setEmail={setEmail}
                    emailError={emailError}
                    password={password}
                    setPassword={setPassword}
                    passwordError={passwordError}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
}
