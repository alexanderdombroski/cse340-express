import express from 'express';
import path from 'path';

/** @type {Array<{route: string, dir: string}|string>} Static path configurations */
const staticPathsConfig = [
   { route: '/css', dir: 'public/css' },
   { route: '/js', dir: 'public/js' },
   { route: '/images', dir: 'public/images' }
];

const configureStaticPaths = (app) => {
    app.set('staticPaths', staticPathsConfig.map(p => p.route));
    staticPathsConfig.forEach((path) => {
        app.use(path.route, express.static(path.dir));
    });
};

export default configureStaticPaths;