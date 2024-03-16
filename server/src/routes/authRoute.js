import express from "express";
import passport from "passport";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// router.post("/register", async (req, res) => {
//   try {
//     // Extract necessary user information from the request body
//     const { googleId, displayName, email, role } = req.body;

//     // Check if the user already exists in the database
//     const existingUser = await UserModel.findOne({ googleId });

//     // If the user already exists, send an error response
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     // Create a new user instance with the provided role
//     const newUser = new UserModel({ googleId, displayName, email, role });

//     // Save the new user to the database
//     await newUser.save();

//     // Send a success response
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     // If any error occurs, send a 500 internal server error response
//     console.error("Error registering user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
export { router as authRouter };
