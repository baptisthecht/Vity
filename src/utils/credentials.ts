const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
export const BASE_URL = `http://wfdmakv.mmastertv.xyz/player_api.php?username=${USERNAME}&password=${PASSWORD}&action=`;

export enum ACTION {
    GET_SERIES_CATEGORIES = "get_series_categories",
    GET_MOVIES_CATEGORIES = "get_vod_categories",
    GET_LIVE_CATEGORIES = "get_live_categories",
    GET_SERIES = "get_series",
    GET_MOVIES = "get_vod_streams",
    GET_LIVE = "get_live_streams",
    GET_SERIE_DATA = "get_series_info",
}
