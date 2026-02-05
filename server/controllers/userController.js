const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');

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
                role: role || 'NORMAL'
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
            where, include: {
                stores: {
                    include: { ratings: true }
                }
            }
        });
        // formating users for getting average rating
        const formattedUsers = users.map(user => {
            let ownerRating = null;

            if (user.stores.length > 0) {
                let totalStars = 0;
                let totalCount = 0;

                user.stores.forEach(store => {
                    store.ratings.forEach(r => {
                        totalStars += r.value;
                        totalCount++;
                    });
                });
                ownerRating = totalCount > 0 ? (totalStars / totalCount).toFixed(1) : 'No Ratings';
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role,
                rating: ownerRating
            };
        })
        res.json(formattedUsers);

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

module.exports = { addUser, getUsers };