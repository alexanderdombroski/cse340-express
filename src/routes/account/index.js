import { Router } from "express";
import { registerUser, userExists, verifyUser } from "../../models/account/index.js";
import { body, validationResult } from "express-validator";
import { requireAuth } from "../../utils/index.js";

const router = new Router();

router.get("/", requireAuth, async (req, res) => {    
    res.render("account/index", {title: "Account"});
});

// ------------ Registration ------------

// Build an array of validation checks for the registration route
const registrationValidation = [
    body("email")
        .isEmail()
        .withMessage("Invalid email format."),
    body("password")
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
        .withMessage("Password must be at least 8 characters long, include one uppercase letter, one number, and one symbol.")
];
const clientValidation = async (req, res, next) => {
    res.locals.scripts.push('<script src="/js/registration.js" defer></script>');
    next();
} 
router.get("/register", clientValidation, async (req, res) => {
    res.render("account/register", { title: "Register" });
});
router.post("/register", registrationValidation, async (req, res) => {
    // Check if there are any validation errors
    const results = validationResult(req);
    if (results.errors.length > 0) {
        results.errors.forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect('/account/register');
        return;
    }


    if (await userExists(req.body.email)) {
        req.flash("error", "Already Registered")
        return;
    } else {
        await registerUser(req.body.email, req.body.password);
    }

    await res.redirect("/account/login");
    req.flash('success', "Account successfully created!")
});


// ------------ Login ------------

router.get("/login", async (req, res) => {
    res.render("account/login", {title: "login"});
    
});
router.post("/login", async (req, res) => {
    const user = await verifyUser(req.body.email, req.body.password);
    if (user) { 
        delete user.password;
        req.session.user = user;
        res.redirect("/account")
    } else {
        return res.status(400).send("Invalid Login.");
    }
});

router.get("/logout", requireAuth, async (req, res) => {
    req.session.destroy()
    res.redirect('/')
});


export default router;