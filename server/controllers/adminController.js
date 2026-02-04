const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');

const getDashboardStats = async (req, res) => {
    try {

        const [users, stores, ratings] = await Promise.all([
            prisma.user.count(),
            prisma.store.count(),
            prisma.rating.count()
        ]);
        res.json({ totalUsers: users, totalStores: stores, totalRatings: ratings });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};

const addUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                address,
                role: role || 'NORMAL_USER'
            }
        });
        res.status(201).json({ message: "User added", user: newUser });
    } catch (err) {
        res.status(400).json({ error: "Could not add user. Email might exist." });
    }
};

const getUsers = async (req, res) => {
    const { name, email, address, role } = req.query;

    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };
    if (role) where.role = role; 

    try {
        const users = await prisma.user.findMany({
            where,
            select: { id: true, name: true, email: true, address: true, role: true }
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};


module.exports = { getDashboardStats, addUser, getUsers };