import { getClassifications } from '../models/index.js';
import path from "path";
import fs from "fs"

const getNav = async () => {
    const classifications = await getClassifications();
    let nav = '<nav><ul>';
    classifications.forEach((row) => {
        const id = row.classification_id;
        const name = row.classification_name;
        nav += `<li><a href="/category/view/${id}">${name}</a></li>`
    });
    return `
    ${nav}
        <li><a href="/category/add">Add Game</a></li>
        <li><a href="/category/add-category">Add Category</a></li>
        <li><a href="/category/delete-category">Delete Category</a></li>
        <li><a href="/About">About Me</a></li>
        </ul>
    </nav>`;
};

const deleteImageFile = (filename) => {
    return new Promise((resolve, reject) => {
        if (!filename) {
            return reject(new Error("Filename cannot be empty or null."));
        }

        const fullPath = filename; // IMPORTANT: Use path.join!

        // Security: Check if the file is within the allowed directory.
        // This is a basic check; you might need a more robust solution.
        const allowedDir = path.normalize('/public/images');
        const normalizedPath = path.normalize(fullPath);

        if (!normalizedPath.includes(allowedDir)) {
          return reject(new Error(`File is outside the allowed directory: ${fullPath}`));
        }


        fs.unlink(fullPath, (err) => {
            if (err) {
                // More detailed error handling:
                if (err.code === 'ENOENT') {
                    // File not found (might have already been deleted)
                    console.warn(`File not found: ${fullPath}`);
                    resolve(); // Resolve anyway (treat as success)
                } else {
                    console.error(`Error deleting file: ${fullPath}`, err);
                    reject(err); // Reject with the error
                }
            } else {
                resolve(); // Resolve on success
            }
        });
    });
};


export { getNav, deleteImageFile };
