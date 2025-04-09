const express = require('express');
const homeRouter = express.Router();
const { provideTheHomePage,provideTheHomeAllAccess } = require('../controllers/home');
const { restrictToRoles } = require('../middlewares/index');

homeRouter.get('/', provideTheHomePage);
homeRouter.get('/admin',restrictToRoles(["ADMIN"]), provideTheHomeAllAccess);
homeRouter.get('/signup', (req, res) => res.render("signup"));
homeRouter.get('/login', (req, res) =>{ 
    if(!req.user)
        return res.render("login");
    res.redirect('/');
});
homeRouter.get('/logout', (req, res) => {
    res.clearCookie('sessionId', {
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        httpOnly: true,              // Not accessible via JS (for security)
        secure: false               // Set to true if using HTTPS
    });
    res.redirect(302,'/');
}

);

module.exports = homeRouter;