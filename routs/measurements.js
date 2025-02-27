const express = require('express');
const router = express.Router();
const Midd = require('../midd/measurMidd');

/**
 * @swagger
 * /measurements/{user_id}:
 *   get:
 *     summary: Get all measurements for a user
 *     description: Retrieves all recorded measurements for a specific user.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose measurements are requested.
 *     responses:
 *       200:
 *         description: List of measurements for the user.
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
 *                   time:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-26T18:36:06.000Z"
 *                   lowValue:
 *                     type: integer
 *                     example: 65
 *                   highValue:
 *                     type: integer
 *                     example: 120
 *                   pulse:
 *                     type: integer
 *                     example: 75
 */
router.get('/:user_id', Midd.getMeasure, (req, res) => {
    res.status(200).json(res.measurements);
});

/**
 * @swagger
 * /measurements:
 *   post:
 *     summary: Add a new measurement
 *     description: Records a new measurement entry for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - date
 *               - lowValue
 *               - highValue
 *               - pulse
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-26"
 *               lowValue:
 *                 type: integer
 *                 example: 60
 *               highValue:
 *                 type: integer
 *                 example: 120
 *               pulse:
 *                 type: integer
 *                 example: 75
 *     responses:
 *       201:
 *         description: Measurement recorded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Measurement added successfully"
 *                 measurement_id:
 *                   type: integer
 *                   example: 2
 */
router.post('/', Midd.addMeasure, (req, res) => {
    res.status(201).json(res.newMeasurement);
});

/**
 * @swagger
 * /measurements/history/{user_id}:
 *   post:
 *     summary: Get measurement history for a user
 *     description: Retrieves a user's measurement history within a date range, including outliers.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_date
 *               - end_date
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-28"
 *     responses:
 *       200:
 *         description: User measurement history within the specified range.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 measurements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       time:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-26T18:54:25.000Z"
 *                       lowValue:
 *                         type: integer
 *                         example: 60
 *                       highValue:
 *                         type: integer
 *                         example: 100
 *                       pulse:
 *                         type: integer
 *                         example: 70
 *                 avgHigh:
 *                   type: number
 *                   example: 120.5
 */
router.post('/history/:user_id', Midd.getHistory, (req, res) => {
    const { measurements, avgHigh } = res.locals;
    res.json({ measurements, avgHigh });
});

/**
 * @swagger
 * /measurements/summary:
 *   post:
 *     summary: Get a summary of measurements for all users
 *     description: Retrieves the monthly averages of measurements for each user, along with the number of outliers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - month
 *               - year
 *             properties:
 *               month:
 *                 type: integer
 *                 example: 2
 *               year:
 *                 type: integer
 *                 example: 2025
 *     responses:
 *       200:
 *         description: Summary of user measurements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   avgLow:
 *                     type: number
 *                     example: 65.3
 *                   avgHigh:
 *                     type: number
 *                     example: 120.1
 *                   avgPulse:
 *                     type: number
 *                     example: 75.4
 *                   highOutliers:
 *                     type: integer
 *                     example: 2
 *                   lowOutliers:
 *                     type: integer
 *                     example: 1
 *                   pulseOutliers:
 *                     type: integer
 *                     example: 3
 */
router.post('/summary', Midd.getUsersSummary, (req, res) => {
    res.json(res.locals.usersSummary);
});

module.exports = router;