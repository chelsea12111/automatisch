import { Commit, User } from './types';

export interface TagEvent {
  object_kind: 'tag_push';
  event_name: 'tag_push';
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_avatar: string;
  project_id: number;
  project: {
    id: number;
    name: string;
    description: string;
    web_url: string;
    avatar_url: string | null;
    git_ssh_url: string;
    git_http_url: string;
    namespace: string;
    visibility_level: number;
    path_with_namespace: string;
    default_branch: string;
    homepage: string;
    url: string;
    ssh_url: string;
    http_url: string;
  };
  repository: {
    name: string;
    url: string;
    description: string;
    homepage: string;
    git_http_url: string;
    git_ssh_url: string;
    visibility_level: number;
  };
  commits: Commit[];
  total_commits_count: number;
  created_at: string; // ISO 8601 timestamp
  tagger: User;
}

// Example event
const tagEvent: TagEvent = {
  object_kind: 'tag_push',
  event_name: 'tag_push',
  before: '0000000000000000000000000000000000000000',
  after: '82b3d5ae55f7080f1e6022629cdb57bfae7cccc7',
  ref: 'refs/tags/v1.0.0',
  checkout_sha: '82b3d5ae55f7080f1e6022629cdb57bfae7cccc7',
  user_id: 1,
  user_name: 'John Smith',
  user_avatar: 'https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80',
  project_id: 1,
  project: {
    id: 1,
    name: 'Example',
    description: '',
    web_url: 'http://example.com/jsmith/example',
    avatar_url: null,
    git_ssh_url: 'git@example.com:jsmith/example.git',
    git_http_url: 'http://example.com/jsmith/example.git',
    namespace: 'Jsmith',
    visibility_level: 0,
    path_with_namespace: 'jsmith/example',
    default_branch: 'master',
    homepage: 'http://example.com/jsmith/example',
    url: 'git@example.com:jsmith/example.git',
    ssh_url: 'git@example.com:jsmith/example.git',
    http_url: 'http://example.com/jsmith/example.git',
  },
  repository: {
    name: 'Example',
    url: 'ssh://git@example.com/jsmith/example.git',
    description: '',
    homepage: 'http://example.com/jsmith/example',
    git_http_url: 'http://example.com/jsmith/example.git',
    git_ssh_url: 'git@example.com:jsmith/example.git',
    visibility_level: 0,
  },
  commits: [],
  total_commits_count: 0,
  created_at: '2023-03-22T12:34:56Z',
  tagger: {
    id: 1,
    name: 'John Smith',
    username: 'jsmith',
    avatar_url: 'https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80',
    email: 'john.smith@example.com',
  },
};
