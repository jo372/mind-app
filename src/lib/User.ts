export default class User {
    public static askForUserLocation(onSuccess: PositionCallback, onError?: PositionErrorCallback | null | undefined) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }
}