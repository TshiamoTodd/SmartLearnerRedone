import { View, ActivityIndicator } from 'react-native';
import { firebaseAuth } from "@/lib/firebase";
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState, } from "react";

const AuthContext = createContext<{
    user: FirebaseAuthTypes.User | null;
    isAuthenticated: boolean;
    username: string;
    setUsername?: React.Dispatch<React.SetStateAction<string>>;
}>({
    user: null,
    isAuthenticated: false,
    username: '',
    setUsername: () => { }
});

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const subscriber = firebaseAuth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                // Ideally fetch username from DB here if needed, 
                // or use user.displayName if available
                setUsername(user.displayName || '');
            }
            setIsReady(true);
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    if (!isReady) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size='large' color='purple' />
            </View>
        )
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);