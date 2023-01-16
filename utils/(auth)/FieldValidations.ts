import { PasswordError, SignInError } from "../../types/SignInTypes";
export const validateEmail = (email: string): "invalid-email" | undefined => {
    const re: string =
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    return email.match(re) ? undefined : "invalid-email";
};

export const validatePassword = (password: string): PasswordError | undefined => {
    // Check if password is at least 8 characters long
    if (password.length < 6) {
        return "Password should be at least 6 characters";
    }
    // Check if password contains at least one uppercase letter
    if (!password.match(/[A-Z]/)) {
        return "Password should contain at least one uppercase letter";
    }
    // Check if password contains at least one number
    if (!password.match(/\d/)) {
        return "Password should contain at least one number";
    }

    return undefined;
};
