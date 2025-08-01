export const getNftsByWalletAddress = async (apiKey, ownerAddress, limit = 100) => {
    try {
        const baseUrl = "https://mainnet.helius-rpc.com";
        const response = await fetch(`${baseUrl}/?api-key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: "1",
                method: "searchAssets",
                 tokenType: "all",
                params: {
                    ownerAddress,
                    grouping: ["collection", "69CLccefLRmvDSAJP7Er632dvn878qkpdcnvq5ZUspSm"],
                    page: 1,
                    limit                   
                },
            }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.result;
    } catch (error) {
        console.error("Error fetching NFTs:", error.message);
        throw error;
    }
};
