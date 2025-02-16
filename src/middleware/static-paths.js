import express from 'express';
import path from 'path';

/** @type {Array<{route: string, dir: string}|string>} Static path configurations */
const staticPaths = [
   { route: '/css', dir: 'public/css' },
   { route: '/js', dir: 'public/js' },
   { route: '/images', dir: 'public/images' }
];

const configureStaticPaths = (app) => {
    staticPaths.forEach((path) => {
        app.use(path.route, express.static(path.dir));
    });
};

export default configureStaticPaths;