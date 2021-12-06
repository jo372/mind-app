export default class User {
    public static askForLocation(onSuccess: PositionCallback, onError?: PositionErrorCallback | null | undefined) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }
}