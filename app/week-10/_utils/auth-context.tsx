"use client";

import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  User,
  UserCredential
} from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
type AuthContextType = {
  user: User | null;
  gitHubSignIn: () => Promise<UserCredential>;
  firebaseSignOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
type AuthContextProviderProps = {
  children: ReactNode;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const googleSignIn = () =>{
    const provider =  new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("userAuth must be used within AuthContextProvider");
  }
  return context;
};