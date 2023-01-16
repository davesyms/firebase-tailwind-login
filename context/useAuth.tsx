import { useEffect, useState } from "react";
import { isSignInError, SignInError } from "../types/SignInTypes";
import { User } from "firebase/auth";
import { auth } from "../lib/firebaseApp";
import {
    validateEmail,
    validatePassword,
} from "../utils/(auth)/FieldValidations";

export const useAuth = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    // Update the loading state when the component is done mounting
    useEffect(() => {
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
            if (res.status === 200) {
                const user = await res.json();
                // Check if the user is a valid user
                setUser(user);
                setLoading(false);
                return user;
            } else {
                // If the user was not signed in successfully, return the error
                const error = await res.json();
                setLoading(false);
                return error;
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

    return { user, loading, signIn };
};
