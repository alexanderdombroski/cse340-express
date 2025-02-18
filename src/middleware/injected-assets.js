import { getNav } from "../utils/navigation.js";

const assetMiddleware = async (req, res, next) => {
    res.locals.scripts = []
    res.locals.styles = []
    
    res.addScript = (scriptPath) => {
        if (!res.locals.scripts.includes(scriptPath)) {
            res.locals.scripts.push(scriptPath);
        }
    };
    
    res.addStyle = (stylePath) => {
        if (!res.locals.styles.includes(stylePath)) {
            res.locals.styles.push(stylePath);
        }
    };
    res.addStyle("/css/main.css")

    res.locals.navHTML = await getNav();

    next();
}

export default assetMiddleware;