import { getCategories } from '../models/category/index.js';

const getNav = async (isLoggedIn) => {
    const categories = await getCategories();
    let nav = '<nav><ul>';
    categories.forEach((row) => {
        const id = row.category_id;
        const name = row.category_name;
        nav += `<li><a href="/category/view/${id}">${name}</a></li>`
    });
    
    if (isLoggedIn) {
        nav += `
            <li><a href="/game/add">Add Game</a></li>
            <li><a href="/category/add">Add Category</a></li>
            <li><a href="/category/delete">Delete Category</a></li>
            <li><a href="/account">Account</a></li>
            <li><a href="/account/logout">Logout</a></li>
        `;
    } else {
        nav += `
            <li><a href="/account/login">Login</a></li>
            <li><a href="/account/register">Register</a></li>
        `;
    }

    nav += `
            <li><a href="/About">About Me</a></li>
        </ul>
    </nav>`


    return nav;
};

const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        req.flash("error", "You must be logged in to access this page.");
        return res.redirect("/login");
    }
    next();
};

export { getNav, requireAuth };
