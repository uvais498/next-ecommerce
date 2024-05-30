"use client"

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

const WixClient = createClient({
    modules: {
      products,
      //services
    },
    auth: OAuthStrategy({
      clientId: process.env.WIX_BASE_ID!,
      tokens: {
        refreshToken,accessToken: {value : "" , expiresAt: 0},
       },
    })
  });

  export type WixClient = typeof WixClient;

  export const WixClientContext = createContext<WixClient>(WixClient);

  export const WixClientContextProvider  = ({
    children,
    } : {
        children : ReactNode 
    }) => {
    return (
        <WixClientContext.Provider value={WixClient}>
            {children}
        </WixClientContext.Provider>
    )
  };
