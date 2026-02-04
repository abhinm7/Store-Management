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

const getOwnerDashboard = async (req, res) => {
    const ownerId = req.user.id;

    try {
        const store = await prisma.store.findFirst({
            where: { ownerId: ownerId },
            include: {
                ratings: {
                    include: {
                        user: {
                            select: { name: true, email: true } 
                        }
                    },
                    orderBy: { value: 'desc' } // show highest ratings first
                }
            }
        });

        if (!store) {
            return res.status(404).json({ error: "store not found" });
        }

        // calculate average rating
        const totalRatings = store.ratings.length;
        const sumRatings = store.ratings.reduce((sum, r) => sum + r.value, 0);
        const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;

        res.json({
            storeName: store.name,
            address: store.address,
            averageRating,
            totalRatings,
            ratings: store.ratings.map(r => ({
                rating: r.value,
                user: r.user.name,
                email: r.user.email
            }))
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "failed to fetch dashboard data" });
    }
};

module.exports = { getDashboardStats, getOwnerDashboard };