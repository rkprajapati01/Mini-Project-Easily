// Middleware function to set last visit timestamp
export const setLastVisit = (req, res, next) => {
    // If a lastVisit cookie is set, extract its value and add it to res.locals
    if (req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    // Set a new lastVisit cookie with the current timestamp
    res.cookie(
        'lastVisit',
        new Date().toISOString(),
        {
            maxAge: 2 * 24 * 60 * 60 * 1000, // Set maxAge to 2 days
        }
    );
    // Call the next middleware in the chain
    next();
};