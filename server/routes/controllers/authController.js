const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/client');

const signup = async (req, res) => {
    const { email, password, name, address } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashPassword,
                address,
                name,
                role: 'NORMAL'
            }
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, email: newUser.email }
        });

    } catch (err) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'email or password' });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid details' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid details' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            role: user.role,
            name: user.name
        });
    } catch (error) {
        console.error(error);
        res.json({ error: 'internal server error', status: 500 });
    }


}

module.exports = { login, signup };