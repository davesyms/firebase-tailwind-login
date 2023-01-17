// Declare Types/Interfaces + Type Guards
export type PasswordError =
    | "Password should be at least 6 characters"
    | "Password should contain at least one uppercase letter"
    | "Password should contain at least one number";
// Type Guard for PasswordError
export function isPasswordError(data: any): data is PasswordError {
    return (
        data === "Password should be at least 6 characters" ||
        data === "Password should contain at least one uppercase letter" ||
        data === "Password should contain at least one number"
    );
}

export type SignUpError =
    | "invalid method"
    | "invalid request data"
    | "invalid-email"
    | "email-already-in-use"
    | "unknown"
    | PasswordError;
// Type Guard for SignUpError
export function isSignUpError(data: any): data is SignUpError {
    return (
        isPasswordError(data) ||
        data === "invalid method" ||
        data === "invalid request data" ||
        data === "invalid-email" ||
        data === "email-already-in-use" ||
        data === "unknown"
    );
}

export interface SignUpRequest {
    email: string;
    password: string;
}
// Type Guard for SignUpRequest
export function isSignUpRequest(data: unknown): data is SignUpRequest {
    return (
        typeof data === "object" &&
        data !== null &&
        "email" in data &&
        "password" in data &&
        typeof (data as SignUpRequest).email === "string" &&
        typeof (data as SignUpRequest).password === "string"
    );
}
