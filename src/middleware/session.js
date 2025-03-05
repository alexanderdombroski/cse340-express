import session from 'express-session';
import sqlite from "connect-sqlite3";

const sqliteSessionStore = sqlite(session);

const sessionMiddleware = session({
    store: new sqliteSessionStore({
        db: "db.sqlite",           // SQLite database file
        dir: "./src/database/",    // Directory where the file is stored
        concurrentDB: true         // Allows multiple processes to use the database
    }),
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,                 // Prevents re-saving sessions that have not changed
    saveUninitialized: true,       // Saves new sessions even if unmodified
    name: "sessionId",
    cookie: {
        secure: false,             // Set to `true` in production with HTTPS
        httpOnly: true,            // Prevents client-side access to the cookie
    }
})

export default sessionMiddleware;