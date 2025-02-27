const express = require('express');
const router = express.Router();
const userMidd = require('../midd/usersMidd');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Main page
 *     description: Renders the main page with a list of users.
 *     responses:
 *       200:
 *         description: Renders the main page.
 */
router.get('/', userMidd.getUsers, (req, res) => {
    res.render('main', { users: res.users });
});

/**
 * @swagger
 * /history/{user_id}:
 *   get:
 *     summary: User history page
 *     description: Renders the history page for a specific user.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose history is displayed.
 *     responses:
 *       200:
 *         description: Renders the user history page.
 *       404:
 *         description: User not found.
 */
router.get('/history/:user_id', (req, res) => {
    res.render('history', { user_id: req.params.user_id });
});

/**
 * @swagger
 * /summary:
 *   get:
 *     summary: User summary page
 *     description: Renders the summary page for all users.
 *     responses:
 *       200:
 *         description: Renders the summary page.
 */
router.get('/summary', (req, res) => {
    res.render('usersSummary');
});

module.exports = router;