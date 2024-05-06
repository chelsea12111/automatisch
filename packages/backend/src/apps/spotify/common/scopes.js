// This module exports an array of Spotify API scopes that the app needs
// to access the user's data and perform actions on their behalf.
// For more information, see: https://developer.spotify.com/documentation/general/guides/scopes/

const scopes = [
  'user-follow-read',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-modify',
  'user-follow-modify',
];

// Sort the array alphabetically for easier reading and comparison
scopes.sort();

// Export the array as the default export of this module
export default scopes;

