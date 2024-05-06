/** Google API authentication scopes. */
const googleAuthScopes = [
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
] as const;

/** The exported Google API authentication scopes. */
export default googleAuthScopes;
