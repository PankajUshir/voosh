/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Description of the error
 *           example: An error occurred
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/resource:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieves a list of resources
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
