import { useEffect, useState } from "react";
import { isSignInError, SignInError } from "../types/SignInTypes";
import { User } from "firebase/auth";
import {
    validateEmail,
    validatePassword,
} from "../utils/(auth)/FieldValidations";
import { isSignUpError, SignUpError } from "../types/SignUpTypes";

export const useAuth = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set the loading to false
        setLoading(false);
    }, []);

    const signIn = async (
        email: string,
        password: string
    ): Promise<SignInError | User> => {
        setLoading(true);

        // Validate the email and password
        const emailError: SignInError | undefined = validateEmail(email);
        if (emailError) {
            setLoading(false);
            return emailError;
        }

        const passwordError: SignInError | undefined =
            validatePassword(password);
        if (passwordError) {
            setLoading(false);
            return passwordError;
        }

        try {
            // Try to sign in the user
            const res = await fetch("/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // If the user was signed in successfully, return the user
            if (res && res.status === 200) {
                const user = await res.json();
                // Check if the user is a valid user
                setUser(user);
                setLoading(false);
                return user;
            } else {
                // If the user was not signed in successfully, return the error
                const error = await res.text();
                setLoading(false);
                return error as SignInError;
            }
        } catch (error) {
            // If there was an error signing in, check if it was a sign in error
            if (isSignInError(error)) {
                setLoading(false);
                return error;
            }
            // If it was not a sign in error, return an unknown error
            setLoading(false);
            return "unknown";
        }
    };


    const signUp = async (
        email: string,
        password: string
    ): Promise<SignUpError | User> => {
        setLoading(true);

        // Validate the email and password
        const emailError: SignUpError | undefined = validateEmail(email);
        if (emailError) {
            setLoading(false);
            return emailError;
        }

        const passwordError: SignUpError | undefined =
            validatePassword(password);
        if (passwordError) {
            setLoading(false);
            return passwordError;
        }

        try {
            // Try to sign up the user
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // If the user was signed up successfully, return the user
            if (res && res.status === 200) {
                const user = await res.json();
                // Check if the user is a valid user
                setUser(user);
                setLoading(false);
                return user;
            } else {
                // If the user was not signed up successfully, return the error
                const error = await res.text();
                setLoading(false);
                return error as SignUpError;
            }
        } catch (error) {
            // If there was an error signing up, check if it was a sign up error
            if (isSignUpError(error)) {
                setLoading(false);
                return error;
            }
            // If it was not a sign up error, return an unknown error
            setLoading(false);
            return "unknown";
        }
    };

    return { user, loading, signIn, signUp };
};
