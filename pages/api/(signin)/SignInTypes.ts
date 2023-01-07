// Declare Types/Interfaces + Type Guards
export type PasswordError =
    | "Password should be at least 6 characters"
    | "Password should contain at least one uppercase letter"
    | "Password should contain at least one number";
// Type Guards
export function isPasswordError(data: any): data is PasswordError {
    return (
        data === "Password should be at least 6 characters" ||
        data === "Password should contain at least one uppercase letter" ||
        data === "Password should contain at least one number"
    );
}

export type SignInError =
    | "invalid method"
    | "invalid request data"
    | "invalid-email"
    | "user-disabled"
    | "user-not-found"
    | "wrong-password"
    | "unknown"
    | PasswordError;
export function isSignInError(data: any): data is SignInError {
    return (
        isPasswordError(data) ||
        data === "invalid method" ||
        data === "invalid request data" ||
        data === "invalid-email" ||
        data === "user-disabled" ||
        data === "user-not-found" ||
        data === "wrong-password" ||
        data === "unknown"
    );
}

export interface SignInRequest {
    email: string;
    password: string;
}
export function isSignInRequest(data: unknown): data is SignInRequest {
    return (
        typeof data === "object" &&
        data !== null &&
        "email" in data &&
        "password" in data &&
        typeof (data as SignInRequest).email === "string" &&
        typeof (data as SignInRequest).password === "string"
    );
}
