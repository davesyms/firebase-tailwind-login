import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebaseApp";

import {
    validateEmail,
    validatePassword,
} from "../../utils/(auth)/FieldValidations";
import { isSignUpRequest, SignUpError } from "../../types/SignUpTypes";

import { FirebaseError } from "@firebase/util";
import {
    createUserWithEmailAndPassword,
    User,
    UserCredential,
} from "firebase/auth";

/**
 * This is the entry point for the signup request.
 *
 * @param req The request data.
 * @param res The response data.
 *
 * @returns If the request method is not "POST", sends a "Method not allowed" response with a status code of 405.
 * @returns If the request is not a valid request, sends a "Invalid request" response with a status code of 400.
 * @returns If the email provided is not a valid email, sends the corresponding error message with a status code of 400.
 * @returns If the password provided is not a valid password, sends the corresponding error message with a status code of 400.
 * @returns If the sign up process is successful, sends the user object with a status code of 200.
 * @returns If there is an error during the sign up process and the error is a FirebaseError, sends the corresponding error message with a status code of 400 or 500 depending on the error code.
 * @returns If there is an error during the sign up process and the error is not a FirebaseError, sends a "unknown" error message with a status code of 500.
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
    if (!isSignUpRequest(req.body)) {
        res.status(400).send("Invalid request");
        return;
    }

    // Get the email and password from the request.
    const { email, password } = req.body;

    // Validate the Email is a valid email.
    const emailError: SignUpError | undefined = validateEmail(email);
    if (emailError) {
        res.status(400).send(emailError);
        return;
    }

    // Validate the password is a valid password.
    const passwordError: SignUpError | undefined = validatePassword(password);
    if (passwordError) {
        res.status(400).send(passwordError);
        return;
    }

    // Attempt to sign up the user.
    try {
        const userCredential: UserCredential =
            await createUserWithEmailAndPassword(auth, email, password);

        // If the sign up is successful, get the user object and send it as a response.
        const user: User = userCredential.user;
        res.status(200).send(user);
    } catch (error: unknown) {
        // If the error is a FirebaseError, check the error code and send the corresponding error message.
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    res.status(400).send("email-already-in-use");
                    break;
                case "auth/invalid-email":
                    res.status(400).send("invalid-email");
                    break;
                case "auth/operation-not-allowed":
                    res.status(400).send("operation-not-allowed");
                    break;
                case "auth/weak-password":
                    res.status(400).send("weak-password");
                    break;
                default:
                    res.status(500).send("unknown");
                    break;
            }
            return;
        }
        // If the error is not a FirebaseError, send a unknown error message.
        res.status(500).send("unknown");
    }
}
