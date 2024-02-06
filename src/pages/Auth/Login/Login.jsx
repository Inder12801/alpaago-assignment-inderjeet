import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useFirebase } from "../../../hooks/useFirebase.js";
import { auth } from "../../../lib/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useMyContext } from "../../../providers/ContextProvider.jsx";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser, user } = useMyContext();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("user")) ? true : false
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user: userCredential } = await signInWithEmailAndPassword(
        auth,
        formData?.email,
        formData?.password
      );
      const db = getFirestore();
      const docRef = doc(collection(db, "users"), userCredential.uid);
      const userDoc = await getDoc(docRef);
      console.log(docRef);
      const q = query(
        collection(db, "users"),
        where("uid", "==", userCredential.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUser({
          name: data.name,
          email: data.email,
          uid: data.uid,
          isAdmin: data.isAdmin,
        });
        localStorage.setItem("user", JSON.stringify(data));
      });

      console.log(user);

      navigate("/home"); // Redirect to desired page after login
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password. Please try again.");
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "", // Add your desired background color here
      }}
    >
      <Grid item xs={4} className="p-12 rounded-xl shadow-lg">
        <Typography
          component="h1"
          variant="h5"
          mt={2}
          fontWeight={"700"}
          className="text-center"
        >
          Log In
        </Typography>
        <form className="" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              p: 1,
            }}
            style={{
              background: "#271340",
            }}
          >
            Log In
          </Button>
          <Typography variant="subtitle1" mt={1} textAlign={"center"}>
            Don't have an account?
            <NavLink to="/signup" className={"text-fuzzy-bg"}>
              {" "}
              Sign up
            </NavLink>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
