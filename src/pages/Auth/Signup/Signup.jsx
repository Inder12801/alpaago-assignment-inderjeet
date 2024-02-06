import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFirebase } from "../../../hooks/useFirebase.js";
import { auth } from "../../../lib/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useMyContext } from "../../../providers/ContextProvider.jsx";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false, // Initialize isAdmin to false
  });
  const { signup } = useFirebase();
  const { setUser, user } = useMyContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const val = type === "checkbox" ? checked : value; // For checkbox, use checked property

    setformData((prevformData) => ({
      ...prevformData,
      [name]: val,
    }));
  };

  const createFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear().toString().padStart(4, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user: createdUser } = await createUserWithEmailAndPassword(
        auth,
        formData?.email,
        formData?.password
      );
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "users"), {
        name: formData?.name,
        email: formData?.email,
        uid: createdUser.uid,
        isAdmin: formData?.isAdmin,
        createdAt: createFormattedDate(new Date(createdUser.createdAt)),
        status: "active",
      });

      setUser({
        name: formData?.name,
        email: formData?.email,
        uid: createdUser.uid,
        isAdmin: formData?.isAdmin,
        createdAt: createFormattedDate(new Date(createdUser.createdAt)),
        status: "active",
      });
      localStorage.setItem("user", JSON.stringify(formData));

      navigate("/home");

      alert("formData created successfully!");

      setformData({ name: "", email: "", password: "", isAdmin: false });
    } catch (error) {
      console.error("Error creating formData:", error);
      alert("There was an error creating your account. Please try again.");
    }
  };

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
      <Grid item xs={4} className=" p-12 rounded-xl shadow-lg">
        <Typography
          component="h1"
          variant="h5"
          mt={2}
          fontWeight={"700"}
          className="text-center"
        >
          Sign Up
        </Typography>
        <form className="" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
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
          {/* Checkbox for isAdmin */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isAdmin}
                onChange={handleChange}
                name="isAdmin"
              />
            }
            label="Admin"
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
            Sign Up
          </Button>
          {/* // Add a link to the login page */}
          <Typography variant="subtitle1" mt={1} textAlign={"center"}>
            Already have an account?
            <NavLink to="/login" className={"text-fuzzy-bg"}>
              {" "}
              Login
            </NavLink>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
};

export default Signup;
