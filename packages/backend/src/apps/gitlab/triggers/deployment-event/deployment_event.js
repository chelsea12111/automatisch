// Configuration for a successful GitLab deployment

const deploymentEventConfig = {
  // The kind of GitLab event that triggered this configuration
  object_kind: 'deployment',
  
  // The status of the deployment
  status: 'success',

  // The timestamp when the status was last changed
  status_changed_at: '2021-04-28 21:50:00 +0200',

  // The ID of the deployment
  deployment_id: 15,

  // The ID of the deployable object
  deployable_id: 796,

  // The URL for the deployable object
  deployable_url: 'http://10.126.0.2:3000/root/test-deployment-webhooks/-/jobs/796',

  // The name of the environment where the deployment was made
  environment: 'staging',

  // The slug for the environment where the deployment was made
  environment_slug: 'staging',

  // The external URL for the environment where the deployment was made
  environment_external_url: 'https://staging.example.com',

  // Detailed information about the project where the deployment was made
  project: {
    id: 30,
    name: 'test-deployment-webhooks',
    description: '',
    web_url: 'http://10.126.0.2:3000/root/test-deployment-webhooks',
    avatar_url: null,
    git_ssh_url: 'ssh://vlad@10.126.0.2:2222/root/test-deployment-webhooks.git',
    git_http_url: 'http://10.126.0.2:3000/root/test-deployment-webhooks.git',
    namespace: 'Administrator',
    visibility_level: 0,
    path_with_namespace: 'root/test-deployment-webhooks',
    default_branch: 'master',
    ci_config_path: '',
    homepage: 'http://10.126.0.2:3000/root/test-deployment-webhooks',
    url: 'ssh://vlad@10.126.0.2:2222/root/test-deployment-webhooks.git',
    ssh_url: 'ssh://vlad@10.126.0.2:2222/root/test-deployment-webhooks.git',
    http_url: 'http://10.126.0.2:3000/root/test-deployment-webhooks.git',
  },

  // The short SHA for the commit associated with the deployment
  short_sha: '279484c0',

  // Information about the user who triggered the deployment
  user: {
    id: 1,
    name: 'Administrator',
    username: 'root',
    avatar_url: 'https://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=80&d=identicon',
    email: 'admin@example.com',
  },

  // The URL for the user who triggered the deployment
  user_url: 'http://10.126.0.2:3000/root',

  // The URL for the commit associated with the deployment
  commit_url: 'http://10.126.0.2:3000/root/test-deployment-webhooks/-/commit/279484c09fbe69ededfced8c1bb6e6d24616b468',

  // The title of the commit associated with the deployment
  commit_title: 'Add new file',
};

module.exports = deploymentEventConfig;
