const getAppAuthClientMock = (appAuthClient) => {
  const { name, id, appConfigId, active } = appAuthClient;
  return {
    data: { name, id, appConfigId, active },
    meta: {
      count: 1,
      currentPage: null,
      isArray: false,
      totalPages: null,
      type: 'AppAuthClient',
    },
  };
};

export default getAppAuthClientMock;


import { AppAuthClient } from './app-auth-client'; // assuming this module exports the AppAuthClient type

const getAppAuthClientMock = (appAuthClient: AppAuthClient): { data: AppAuthClient; meta: { count: number; currentPage: number | null; isArray: boolean; totalPages: number | null; type: string } } => {
  const { name, id, appConfigId, active } = appAuthClient;
  return {
    data: { name, id, appConfigId, active },
    meta: {
      count: 1,
      currentPage: null,
      isArray: false,
      totalPages: null,
      type: 'AppAuthClient',
    },
  };
};

export default getAppAuthClientMock;
