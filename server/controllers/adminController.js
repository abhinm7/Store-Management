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

module.exports = { getDashboardStats };