// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { Order, OrderItem } = require('../models/Order'); // assuming you track purchases
const User = require('../models/User');
const Product = require('../models/Product');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { Op } = require('sequelize');

// ✅ Get all reviews (admin page)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                { model: User, as: 'userDetails', attributes: ['name'] },
                { model: Product, as: 'productDetails', attributes: ['name'] }
            ]
        });
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
});

// ✅ Get all reviews for a product
router.get('/product/:productId', authenticateToken, async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { productId: req.params.productId },
            include: [{ model: User, as: 'userDetails', attributes: ['name'] }]
        });
        // console.log(`Fetching reviews for product ${req.params.productId}`);
        res.json({ reviews, userId: req.user.userId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch product reviews' });
    }
});

// ✅ Check if user can review (must have purchased)
router.get('/can-review/:productId', authenticateToken, async (req, res) => {
    try {
        // console.log(req.user)
        const userId = req.user.userId;
        const productId = req.params.productId;
        // console.log(`Checking if user ${userId} can review product ${productId}`);

        // Check if user has an order with this product and payment status is 'paid'
        const order = await Order.findOne({
            where: {
                userId: userId,
                paymentStatus: 'paid'
            },
            include: [{
                model: OrderItem,
                as: 'items',
                where: { productId: productId }
            }]
        });

        const hasPurchased = !!order;

        // console.log(`User ${userId} has purchased product ${productId}: ${hasPurchased}`);

        const userIsAdmin = req.user.role === 'admin';

        res.json({
            canReview: hasPurchased,
            isAdmin: userIsAdmin,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to check review permissions' });
    }
});

// ✅ Post a new review (user)
router.post('/:productId', authenticateToken, async (req, res) => {
    try {
        const { rating, message } = req.body;
        const { productId } = req.params;

        const alreadyReviewed = await Review.findOne({
            where: {
                userId: req.user.userId,
                productId: productId
            }
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        const newReview = await Review.create({
            userId: req.user.userId,
            productId: productId,
            rating,
            message,
        });

        res.status(201).json({ message: 'Review submitted', review: newReview });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to post review' });
    }
});

// ✅ Update a review by ID (admin or user — auth handled)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { rating, message } = req.body;
        const review = await Review.findByPk(req.params.id);

        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Optional: Restrict to owner or admin in middleware
        // Review.userId is integer, req.user.userId is integer (from jwt payload if properly set)
        if (review.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to edit this review' });
        }

        if (rating) review.rating = rating;
        if (message) review.message = message;
        await review.save();

        res.json({ message: 'Review updated', review });
    } catch (err) {
        console.log({ err });
        res.status(500).json({ message: 'Failed to update review' });
    }
});

// ✅ Delete a review by ID (admin or user)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);

        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.destroy();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete review' });
    }
});

exports.reviewRouter = router;
