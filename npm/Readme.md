🧩 Step 1: When user logs in
const accessToken = jwt.sign(
    { "username": foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
);
res.json({ accessToken });


👉 This line:

Creates a token (using the user’s name + secret key).

Sends it to Postman (or frontend) as JSON.

Example response:

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}


This token proves that the user has successfully logged in.
You can think of it like a ticket 🎟️ you get after logging in.
You’ll need to show that ticket later to access protected routes.

🧩 Step 2: The client stores the token

Now, in Postman, you copy that token (the value of "accessToken")
and use it in another request — for example:

GET http://localhost:3500/employees


In this request, you go to the Headers tab and add:

Key: Authorization
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...


That’s what sends the token back to your server.

🧩 Step 3: The middleware (verifyJWT) receives it

When your route is defined like this:

router.route('/')
    .get(verifyJWT, employeesController.getAllEmployees)


it means:

Before running employeesController.getAllEmployees,
Express must first run verifyJWT.

So when Postman sends your GET request, Express first runs this code:

const authHeader = req.headers['authorization'];


🧠 The req.headers object contains all HTTP headers.
The 'authorization' header holds your token string from Postman:

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...

🧩 Step 4: Extracting the token from the header
const token = authHeader.split(' ')[1];


Let’s break that:

"Bearer eyJhbGciOi..." → .split(' ') → ["Bearer", "eyJhbGciOi..."]

[1] → selects the second item, which is just the token:

eyJhbGciOiJIUzI1NiIsInR5cCI6...


Now you’ve isolated the token for verification ✅

🧩 Step 5: Verifying the token
jwt.verify(
  token,
  process.env.ACCESS_TOKEN_SECRET,
  (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = decoded.username;
    next();
  }
)


Here’s what happens:

jwt.verify() takes the token and your secret key from .env.

It decodes the token — checking if:

It was signed with the same secret key.

It hasn’t expired yet.

If the token is valid:

It stores the username from inside the token into req.user.

Calls next() → which tells Express to move on to the next handler (employeesController.getAllEmployees).

If it’s invalid or expired:

It stops and sends a 403 Forbidden response.

So this is basically your security guard 👮‍♂️ checking the token.

🧩 Step 6: Passing the baton to your controller

If the token is valid, verifyJWT calls:

next();


This tells Express:

“Okay, everything looks good. Let’s move to the next middleware or route handler.”

Then Express calls:

employeesController.getAllEmployees(req, res);


Now inside that controller, you can even use:

console.log(req.user); // The username from the token


So you know exactly who made the request.

🔁 In summary
Step	Code / Place	What happens
1️⃣	res.json({ accessToken })	Login controller creates and sends a token
2️⃣	req.headers['authorization']	Client sends token in Authorization header
3️⃣	authHeader.split(' ')[1]	Extracts just the token from “Bearer …”
4️⃣	jwt.verify()	Checks if the token is valid using the secret
5️⃣	req.user = decoded.username	Stores user info in request for later
6️⃣	next()	Passes control to the protected route (e.g., /employees)
🧠 Visualization
[ CLIENT ]            [ SERVER ]
Login -------------->  Generates token -----> res.json({ accessToken })
                      ↓
Next request --------> Authorization: Bearer <token>
                      ↓
                  verifyJWT checks token
                      ↓
                If valid → next() → run employeesController
