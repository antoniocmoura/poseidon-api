// api.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import { readJsonFile } from "./fileUtils.js";
import { getNftsByWalletAddress } from "./heluisNftClient.js";
import { swaggerSpec } from "./swagger.js";
import { apiPort, publicUrl, apiKey } from "./config.js";

const app = express();

const badges = await readJsonFile("badges.json");
const powers = await readJsonFile("power.json");

const powerMap = new Map(powers.map((item) => [item.number, item]));
const badgeSet = new Set(badges);

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/poseidons/wallet/:address", async (req, res) => {
    try {
        const walletAddress = req.params.address;
        const queryNumber = req.query.number ? parseInt(req.query.number, 10) : null;

        const nfts = await getNftsByWalletAddress(apiKey, walletAddress);

        const result = nfts.items.reduce((acc, nft) => {
            const name = nft.content?.metadata?.name || "Unnamed NFT";
            const match = name.match(/#(\d+)/);
            const number = match ? parseInt(match[1], 10) : null;

            if (queryNumber !== null && number !== queryNumber) {
                return acc;
            }

            const nftInfo = powerMap.get(number);

            acc.push({
                number,
                mintAddress: nft.id,
                name,
                image: nft.content?.files?.[0]?.uri || "No image",
                badge: badgeSet.has(nft.id),
                power: nftInfo?.power,
                rarity: nftInfo?.rarity,
            });

            return acc;
        }, []);
        const statusCode = result.length > 0 ? 200 : 404; 
        res.status(statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
});

app.listen(apiPort, "0.0.0.0", () => {
    console.log(`Servidor rodando em ${publicUrl}`);
    console.log(`Swagger docs em ${publicUrl}/docs`);
});
