import { OAuthStrategy, createClient } from "@wix/sdk";
import { products,collections } from "@wix/stores";
import { cookies } from "next/headers";

export const wixClientServer = async() => {
let refreshToken;
try {
    const cookiesStore = cookies();
    refreshToken = JSON.parse(cookiesStore.get("refreshToken")?.value || "{}");
  
} catch (error) {
    console.log(error)
}

const wixClient = createClient({
    modules: {
      products,
      collections
      //services
    },
    auth: OAuthStrategy({
      clientId: process.env.WIX_BASE_ID!,
      tokens: {
        refreshToken,accessToken: {value : "" , expiresAt: 0},
       },
    })
  });
    return wixClient;
}