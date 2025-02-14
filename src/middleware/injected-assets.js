const assetMiddleware = (req, res, next) => {
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

    next();
}

export default assetMiddleware;