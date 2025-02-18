import { Router } from 'express';
import { getNav } from '../utils/navigation.js';

const router = Router();
 
router.use(async (req, res, next) => {
    const nav = await getNav();
    res.locals.nav = nav;
    next();
});

// The home page route
router.get('/', async (req, res) => {
    res.render('index', { title: 'Home Page' });
});

router.get('/about', async (req, res) => {
    res.render('about', { title: 'About Page' });
});

export default router;