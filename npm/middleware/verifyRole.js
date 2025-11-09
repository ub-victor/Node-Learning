const verifyRole = (...allowedRoles)=>{
    return (req, res, next)=>{
        if(!req?.roles) return res.sendStatus(401); // Unauthorized if no roles found in request
        const rolesArray = [...allowedRoles]; // array of allowed roles
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if(!result) return res.sendStatus(403); // Forbidden if no matching role found
        next(); // proceed to next middleware or route handler
    }