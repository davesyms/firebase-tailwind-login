import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { isSignInError, SignInError } from "../pages/api/(signin)/SignInTypes";
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
            return emailError;
        }

        const passwordError: SignInError | undefined =
            validatePassword(password);
        if (passwordError) {
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
                return user;
            } else {
                // If the user was not signed in successfully, return the error
                const error = await res.json();
                return error;
            }
        } catch (error) {
            // If there was an error signing in, check if it was a sign in error
            if (isSignInError(error)) {
                return error;
            }
            return "unknown";
        }
    };

    return { user, loading, signIn };
};
