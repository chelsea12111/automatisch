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

type ObjectKind = 'build';
type RefType = 'gitlab-script-trigger';
type BuildStatus = 'created';
type VisibilityLevel = number;

type Build = {
  object_kind: ObjectKind;
  ref: RefType;
  tag: false;
  before_sha: string;
  sha: string;
  build_id: number;
  build_name: string;
  build_stage: string;
  build_status: BuildStatus;
  build_created_at: string;
  build_started_at: string | null;
  build_finished_at: string | null;
  build_duration: string | null;
  build_queued_duration: number;
  build_allow_failure: boolean;
  build_failure_reason: 'script_failure';
  retries_count: number;
  pipeline_id: number;
  project_id: number;
  project_name: string;
  user: User;
  commit: Commit;
  repository: Repository;
  runner: Runner;
  environment: string | null;
};

const build: Build = {
  object_kind: 'build' as const,
  ref: 'gitlab-script-trigger' as const,
  tag: false,
  before_sha: '2293ada6b400935a1378653304eaf6221e0fdb8f',
  sha: '2293ada6b400935a1378653304eaf6221e0fdb8f',
  build_id: 1977,
  build_name: 'test',
  build_stage: 'test',
  build_status: 'created' as const,
  build_created_at: '2021-02-23T02:41:37.886Z',
  build_started_at: null,
  build_finished_at: null,
  build_duration: null,
  build_queued_duration: 1095.588715,
  build_allow_failure: false,
  build_failure_reason: 'script_failure',
  retries_count: 2,
  pipeline_id: 2366,
  project_id: 380,
  project_name: 'gitlab-org/gitlab-test',
  user: {
    id: 3,
    name: 'User',
    email: 'user@gitlab.com',
    avatar_url:
      'http://www.gravatar.com/avatar/e32bd13e2add097461cb96824b7a829c?s=80\u0026d=identicon',
  },
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
  },
  repository: {
    name: 'gitlab_test',
    description: 'Atque in sunt eos similique dolores voluptatem.',
    homepage: `${
