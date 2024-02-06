import React, { useEffect, useState } from "react";
import { auth } from "../lib/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useMyContext } from "../providers/ContextProvider";

const useFirebase = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setUser, user } = useMyContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setError(null);
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const signup = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(user);
      console.log(user);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return { loading, error, login, logout, signup };
};

export { useFirebase };
