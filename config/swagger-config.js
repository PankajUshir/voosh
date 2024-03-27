/**
 * @swagger
 * components:
 *   schemas:
 *     UserCredentials:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     SignUpCredentials:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         bio:
 *           type: string
 *         mobile:
 *           type: string
 *         photo:
 *           type: string
 *         isPublic:
 *           type: boolean
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
 * /api/login:
 *   post:
 *     summary: Log in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCredentials'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error
 * /api/signup:
 *   post:
 *     summary: Sign up user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpCredentials'
 *     responses:
 *       '201':
 *         description: User signed up successfully
 *       '400':
 *         description: Bad Request - Invalid input
 *       '500':
 *         description: Internal server error
 * /logout:
 *   post:
 *     summary: Log out user
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '401':
 *         description: Unauthorized - User not logged in
 *       '500':
 *         description: Internal server error
 * /api/auth/users/{role}:
 *   get:
 *     summary: Get all users
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *         description: Role of the users to filter
 *     responses:
 *       '200':
 *         description: Successfully retrieved users
 *       '400':
 *         description: Bad request - Invalid input
 *       '500':
 *         description: Internal server error
 * /api/auth/users/:
 *   put:
 *     summary: Update user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpCredentials'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Bad Request - Invalid input
 *       '500':
 *         description: Internal server error
 * /api/auth/users/{email}:
 *   get:
 *     summary: Get user by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved user
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 * /api/auth/users/uploadphoto/{email}:
 *   put:
 *     summary: Upload user photo
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user to update photo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *             required:
 *               - photo
 *     responses:
 *       '200':
 *         description: Photo uploaded successfully
 *       '400':
 *         description: Bad Request - Invalid input
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
