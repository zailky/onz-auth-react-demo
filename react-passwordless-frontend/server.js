const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

app.use(cors());

app.use('/adminInfo', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    // Verify JWT Token Signature
    let decodedToken = jwt.decode(token, { complete: true });
    let kid = decodedToken.header.kid;
    let client = jwksClient({
        jwksUri: 'https://auth.onzauth.com/.well-known/jwks.json',
        requestHeaders: {}, // Optional
        timeout: 30000 // Defaults to 30s
    });
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();

    jwt.verify(token, signingKey, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log('Successfully verified token', user);
        res.send({
            user: user
        });
    });    
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/adminInfo'));
