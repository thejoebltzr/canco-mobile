import { exp } from "react-native-reanimated";
var rs = require('jsrsasign');
import { SERVICE_ACCOUNT_PRIVATE_KEY,SERVICE_ACCOUNT_CLIENT_EMAIL} from '@env'

export function animationInitialValues() {

  var imgH = 40
  var imgHvar = 218
  var imgWvar = 276

  var initialValue = [
    {
      imgH: 40,
      imgHvar: 218,
      imgWvar: 276,
    }
  ]


  return imgH;
}
// generating random number
export function generateUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function formatAmount(amount) {
  return '$' + parseFloat(amount).toFixed(2)
}

 
export function Days(day) {
  if (day == "1") {
    return "Monday"
  }
  else if (day == "2") {
    return "Tuesday"
  }
  else if (day == "3") {
    return "Wednesday"
  }
  else if (day == "4") {
    return "Thursday"
  }
  else if (day == "5") {
    return "Friday"
  }
  else if (day == "6") {
    return "Saturday"
  }
}


export function generateJWTFromCardObject(objectID) {

  const pHeader = { "alg": "RS256" }
  const sHeader = JSON.stringify(pHeader);

  const pClaim = {};
  pClaim.aud = "google";
  pClaim.typ = "savetoandroidpay";
  pClaim.iss = SERVICE_ACCOUNT_CLIENT_EMAIL;

  console.log("service account email",SERVICE_ACCOUNT_CLIENT_EMAIL)
  pClaim.payload = {
      "giftCardObjects": [
          {
              "id": objectID
          }
      ]
  }
  pClaim.iat = rs.KJUR.jws.IntDate.get("now");
  pClaim.exp = rs.KJUR.jws.IntDate.get("now + 1hour");

  const sClaim = JSON.stringify(pClaim);

  const jwt = rs.KJUR.jws.JWS.sign(null, sHeader, sClaim, SERVICE_ACCOUNT_PRIVATE_KEY);

  return jwt;
}

export function generateAuthJWT(){
  const pHeader = { "alg": "RS256", "typ": "JWT" }
  const sHeader = JSON.stringify(pHeader);

  const pClaim = {};

  pClaim.iss = SERVICE_ACCOUNT_CLIENT_EMAIL;
  pClaim.sub = SERVICE_ACCOUNT_CLIENT_EMAIL;
  pClaim.scope = "https://www.googleapis.com/auth/wallet_object.issuer";
  pClaim.aud = "https://oauth2.googleapis.com/token";

  pClaim.iat = rs.KJUR.jws.IntDate.get("now");
  pClaim.exp = rs.KJUR.jws.IntDate.get("now + 1hour");

  const sClaim = JSON.stringify(pClaim);

  const jwt = rs.KJUR.jws.JWS.sign(null, sHeader, sClaim, SERVICE_ACCOUNT_PRIVATE_KEY);

  return jwt;
}