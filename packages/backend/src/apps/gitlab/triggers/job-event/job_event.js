// Based on the GitLab Webhook events documentation:
// https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html#job-events

interface User {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
}

interface Commit {
  id: number;
  name: string;
  sha: string;
  message: string;
  author_name: string;
  author_email: string;
  status: string;
  duration?: number | null;
  started_at?: string | null;
  finished_at?: string | null;
}

interface Repository {
  name: string;
  description: string;
  homepage: string;
  git_ssh_url: string;
  git_http_url: string;
  visibility_level: number;
}

interface Runner {
  active: boolean;
  runner_type: string;
  is_shared: boolean;
  id: number;
  description: string;
  tags: string[];
}

export default {
  object_kind: 'build' as const, // using const assertions to make TypeScript infer the correct literal type
  ref: 'gitlab-script-trigger',
  tag: false,
  before_sha: '2293ada6b400935a1378653304eaf6221e0fdb8f',
  sha: '2293ada6b400935a1378653304eaf6221e0fdb8f',
  build_id: 1977,
  build_name: 'test',
  build_stage: 'test',
  build_status: 'created',
  build_created_at: '2021-02-23T02:41:37.886Z',
  build_started_at: null,
  build_finished_at: null,
  build_duration: null,
  build_queued_duration: 1095.588715, // duration in seconds
  build_allow_failure: false,
  build_failure_reason: 'script_failure',
  retries_count: 2, // the second retry of this job
  pipeline_id: 2366,
  project_id: 380,
  project_name: 'gitlab-org/gitlab-test',
  user: {
    id: 3,
    name: 'User',
    email: 'user@gitlab.com',
    avatar_url:
      'http://www.gravatar.com/avatar/e32bd13e2add097461cb96824b7a829c?s=80\u0026d=identicon',
  } as User,
  commit: {
    id: 2366,
    name: 'Build pipeline',
    sha: '2293ada6b400935a1378653304eaf6221e0fdb8f',
    message: 'test\n',
    author_name: 'User',
    author_email: 'user@gitlab.com',
    status: 'created',
    duration: null,
    started_at: null,
    finished_at: null,
  } as Commit,
  repository: {
    name: 'gitlab_test',
    description: 'Atque in sunt eos similique dolores voluptatem.',
    homepage: 'http://192.168.64.1:3005/gitlab-org/gitlab-test',
    git_ssh_url: 'git@192.168.64.1:gitlab-org/gitlab-test.git',
    git_http_url: 'http://192.168.64.1:3005/gitlab-org/gitlab-test.git',
    visibility_level: 20,
  } as Repository,
  runner: {
    active: true,
    runner_type: 'project_type',
    is_shared: false,
    id: 380987,
    description: 'shared-runners-manager-6.gitlab.com',
    tags: ['linux', 'docker'],
  } as Runner,
  environment: null,
};
