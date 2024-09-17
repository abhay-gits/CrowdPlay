import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import passport from 'passport';

export const initializeAuth = (app)=>{
    // Set up session
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
    // Here you would typically find or create a user in your database
    return cb(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
}