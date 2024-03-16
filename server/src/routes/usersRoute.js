import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home Page");
});

router.get("/profile", (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export { router as userRouter };
