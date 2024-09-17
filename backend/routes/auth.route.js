import express from "express";
import passport from "passport";

const router = express.Router();

router.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect : "/"}),(req,res)=>{
    res.redirect("http://localhost:5173/home")}
)

router.get('/api/user',(req,res)=>{
    res.json(req.user || null);
})

router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
    })
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
})

export default router;