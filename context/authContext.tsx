import { User } from "firebase/auth";
import { createContext, useContext } from "react";
import { SignInError } from "../types/SignInTypes";
import { useAuth } from "./useAuth";

const AuthContext = createContext({
    user: undefined as User | undefined,
    loading: false as boolean,
    signIn: async (
        email: string,
        password: string
    ): Promise<User | SignInError> => {
        return "unknown";
    },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
