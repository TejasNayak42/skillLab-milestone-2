import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { UserModel } from "./models/Users.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = new UserModel({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });

        // Assigning default role
        user.role = "user";

        await user.save();

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
