import CryptoJS from "crypto-js";

export default class CryptoHelper {
    public static createSha512Hash(val: string) : string {
        const hash = CryptoJS.SHA512(val);
        return hash.toString(CryptoJS.enc.Hex);
    }
}