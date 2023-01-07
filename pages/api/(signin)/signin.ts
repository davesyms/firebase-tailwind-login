import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../lib/firebaseApp";

import {
    validateEmail,
    validatePassword
} from "../../../utils/(auth)/FieldValidations";
import { isSignInRequest, SignInError } from "./SignInTypes";

import { FirebaseError } from "@firebase/util";
import {
    signInWithEmailAndPassword,
    User,
    UserCredential
} from "firebase/auth";

/**
 * This is the entry point for the login request.
 *
 * @param req The request data.
 * @param res The response data.
 *
 * @returns If the request method is not "POST", sends a "Method not allowed" response with a status code of 405.
 * @returns If the request is not a valid request, sends a "Invalid request" response with a status code of 400.
 * @returns If the email provided is not a valid email, sends the corresponding error message with a status code of 400.
 * @returns If the password provided is not a valid password, sends the corresponding error message with a status code of 400.
 * @returns If the sign in process is successful, sends the user object with a status code of 200.
 * @returns If there is an error during the sign in process and the error is a FirebaseError, sends the corresponding error message with a status code of 400 or 500 depending on the error code.
 * @returns If there is an error during the sign in process and the error is not a FirebaseError, sends a "unknown" error message with a status code of 500.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Verify that the request is a POST request.
    if (req?.method !== "POST") {
        res.status(405).send("Method not allowed");
        return;
    }

    // Check that the request is a valid request.
    if (!isSignInRequest(req.body)) {
        res.status(400).send("Invalid request");
        return;
    }

    // Get the email and password from the request.
    const { email, password } = req.body;

    // Validate the Email is a valid email.
    const emailError: SignInError | undefined = validateEmail(email);
    if (emailError) {
        res.status(400).send(emailError);
        return;
    }

    // Validate the password is a valid password.
    const passwordError: SignInError | undefined = validatePassword(password);
    if (passwordError) {
        res.status(400).send(passwordError);
        return;
    }

    // Attempt to sign in the user.
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // If the sign in is successful, get the user object and send it as a response.
        const user: User = userCredential.user;
        res.status(200).send(user);
    } catch (error: unknown) {
        // If the error is a FirebaseError, check the error code and send the corresponding error message.
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/invalid-email":
                    res.status(400).send("invalid-email");
                    break;
                case "auth/user-disabled":
                    res.status(400).send("user-disabled");
                    break;
                case "auth/user-not-found":
                    res.status(400).send("user-not-found");
                    break;
                case "auth/wrong-password":
                    res.status(400).send("wrong-password");
                    break;
                default:
                    res.status(500).send("unknown");
                    break;
            }
            return 
        }
        // If the error is not a FirebaseError, send a unknown error message.
        res.status(500).send("unknown");
    }
}
