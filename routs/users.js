const express = require('express');
const router = express.Router();
const usersMidd = require('../midd/usersMidd');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: A JSON array of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 */
router.get('/', usersMidd.getUsers, (req, res) => {
    res.status(200).json(res.users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     description: Creates a new user and returns the created user object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *     responses:
 *       201:
 *         description: The created user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User added successfully"
 *                 user_id:
 *                   type: integer
 *                   example: 2
 */
router.post('/', usersMidd.addUser, (req, res) => {
    res.status(201).json(res.newUser);
});

/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: Confirmation of user deletion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *                 user_id:
 *                   type: integer
 *                   example: 1
 */
router.delete('/:user_id', usersMidd.deleteUser, (req, res) => {
    res.status(200).json(res.deletedUser);
});

/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     summary: Update a user
 *     description: Updates a user's information.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *     responses:
 *       200:
 *         description: The updated user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user_id:
 *                   type: integer
 *                   example: 1
 */
router.put('/:user_id', usersMidd.updateUser, (req, res) => {
    res.status(200).json(res.updatedUser);
});

module.exports = router;