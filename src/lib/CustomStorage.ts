export default class CustomStorage {
    public static getValueByKey(key: string) : string | null {
        return localStorage.getItem(key);
    }
    public static setKeyValue(key: string, value: string) : void {
        localStorage.setItem(key, value);
    }
    public static hasKey(key: string) : boolean {
        return CustomStorage.getValueByKey(key) != null;
    }
}