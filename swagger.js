// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import { publicUrl } from "./config.js";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Poseidon NFT API",
        version: "1.0.0",
        description: "API for listing Poseidons by wallet address",
    },
    servers: [
        {
            url: `${publicUrl}`,
            description: "Poseidons API",
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./app.js", "./docs/app-docs.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
