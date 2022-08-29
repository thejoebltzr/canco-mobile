// Set to false when deploying to prod
export const IS_STAGING = true;
export const BASE_URL = IS_STAGING ? "https://canco-convrtx-prod.herokuapp.com/Api/" : "https://admin.cancopetroleum.ca/Api/";
export const APPLE_WALLET_PASS_URL ="https://ios-wallets-convrtx.herokuapp.com/passkit-generator"
export const GOOGLE_WALLET_OBJECTS_API_URL="https://walletobjects.googleapis.com/walletobjects/v1/giftCardObject";