import {
    SignInError,
    isSignInError,
    isPasswordError,
    PasswordError,
} from "../../../../types/SignInTypes";

import {
    SignUpError,
    isSignUpError,
} from "../../../../types/SignUpTypes";

export type ErrorMessage =
    | PasswordError
    | "Invalid Email"
    | "User Disabled"
    | "User Not Found"
    | "Wrong Password"
    | "Unknown Error";

export function determineErrorMessage(error: SignInError | SignUpError): ErrorMessage {
    if (!isSignInError(error) && !isSignUpError(error)) {
        return "Unknown Error";
    }
    if (isPasswordError(error)) {
        // The password errors are already very descriptive.
        return error;
    }

    // Although SignInError has more than just the messages
    // below, the messages below are the only ones that
    // will be shown on the UI. The other messages are
    // used for internal error handling.
    switch (error) {
        case "invalid-email":
            return "Invalid Email";
        case "user-disabled":
            return "User Disabled";
        case "user-not-found":
            return "User Not Found";
        case "wrong-password":
            return "Wrong Password";
        default:
            return "Unknown Error";
    }
}
