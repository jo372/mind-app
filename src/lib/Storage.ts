export default class Storage {
    public static getValueByKey(key: string) : string | null {
        return localStorage.getItem(key);
    }
    public static setValue(key: string, value: string) : void {
        localStorage.setItem(key, value);
    }
    public static hasKey(key: string) : boolean {
        return Storage.getValueByKey(key) != null;
    }
}