export default {
  logInWithSpotify: () => {
    let client_id = "0d3fec8fd3d14d0f96a20a448789e6e7";
    let redirect_uri = "http://localhost:3000/";
    let scopes = "user-read-private user-read-email user-read-playback-state user-library-read user-read-recently-played streaming user-read-birthdate playlist-read-private playlist-read-collaborative";
    let scopes_encoded = scopes.replace(" ", "%20");

    window.location = [
      "https://accounts.spotify.com/authorize",
      `?client_id=${client_id}`,
      `&redirect_uri=${redirect_uri}`,
      `&scope=${scopes_encoded}`,
      "&response_type=token",
      "&show_dialog=true"
    ].join("");
  }
};