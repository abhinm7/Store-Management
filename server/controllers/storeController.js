const prisma = require('../prisma/client');

const addStore = async (req, res) => {
    const { name, email, address, ownerId } = req.body;

    if (!ownerId) {
        return res.status(400).json({ error: "store owner id not found" });
    }

    try {
        const ownerExists = await prisma.user.findUnique({
            where: { id: Number(ownerId), role: "STORE_OWNER" }
        });

        if (!ownerExists) {
            return res.status(404).json({ error: "store owner not found" });
        }

        const storeEmail = await prisma.store.findUnique({
            where: { email }
        });

        if (storeEmail) {
            return res.status(400).json({ error: "store email already exists" });
        }

        const newStore = await prisma.store.create({
            data: {
                name,
                email,
                address,
                ownerId: Number(ownerId)
            }
        });

        res.status(201).json({ message: "Store created successfully", store: newStore });

    } catch (err) {
        res.status(500).json({ error: "Failed to add store" });
    }
};

const getStores = async (req, res) => {
    const { name, email, address } = req.query;

    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };

    try {
        const stores = await prisma.store.findMany({
            where,
            include: {
                ratings: true // Fetch ratings to calculate average
            }
        });

        // Calculate Average Rating manually 
        const formattedStores = stores.map(store => {
            const total = store.ratings.reduce((sum, r) => sum + r.value, 0);
            const avg = store.ratings.length > 0 ? (total / store.ratings.length).toFixed(1) : 0;

            return {
                id: store.id,
                name: store.name,
                email: store.email,
                address: store.address,
                rating: avg
            };
        });

        res.json(formattedStores);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stores" });
    }
};

const submitRating = async (req, res) => {

}

module.exports = { addStore, getStores, submitRating };