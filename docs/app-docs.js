/**
 * @swagger
 * /poseidons/wallet/{address}:
 *   get:
 *     summary: Returns the Poseidon NFTs from a wallet
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Solana Address
 *       - in: query
 *         name: number
 *         required: false
 *         schema:
 *           type: integer
 *         description: Poseidon Number
 *     responses:
 *       200:
 *         description: Poseidon NFTs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: integer
 *                   mintAddress:
 *                     type: string
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   badge:
 *                     type: boolean
 *                   power:
 *                     type: integer
 *                   rarity:
 *                     type: string
 *       404:
 *         description: No NFTs were found
 *       500:
 *         description: Error fetching Poseidon NFTs
 */
