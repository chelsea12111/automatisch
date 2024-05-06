// Configuration for a GitLab webhook event payload, specifically a 'note' event
// for a commit comment.

const commitCommentEventPayload = {
  // The kind of GitLab object that triggered the event.
  objectKind: 'note',

  // The type of event that occurred.
  eventType: 'note',

  // Details about the user who created the note.
  user: {
    id: 1,
    name: 'Administrator',
    username: 'root',
    avatarUrl:
      'http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon',
    email: 'admin@example.com',
  },

  // The ID of the project associated with the note.
  projectId: 5,

  // Details about the project associated with the note.
  project: {
    id: 5,
    name: 'Gitlab Test',
    description: 'Aut reprehenderit ut est.',
    webUrl: 'http://example.com/gitlabhq/gitlab-test',
    avatarUrl: null,
    gitSshUrl: 'git@example.com:gitlabhq/gitlab-test.git',
    gitHttpUrl: 'http://example.com/gitlabhq/gitlab-test.git',
    namespace: 'GitlabHQ',
    visibilityLevel: 20,
    pathWithNamespace: 'gitlabhq/gitlab-test',
    defaultBranch: 'master',
    homepage: 'http://example.com/gitlabhq/gitlab-test',
    url: 'http://example.com/gitlabhq/gitlab-test.git',
    sshUrl: 'git@example.com:gitlabhq/gitlab-test.git',
    httpUrl: 'http://example.com/gitlabhq/gitlab-test.git',
  },

  // Details about the repository associated with the note.
  repository: {
    name: 'Gitlab Test',
    url: 'http://example.com/gitlab-org/gitlab-test.git',
    description: 'Aut reprehenderit ut est.',
    homepage: 'http://example.com/gitlab-org/gitlab-test',
  },

  // Details about the note itself.
  objectAttributes: {
    id: 1243,
    note: 'This is a commit comment. How does this work?',
    noteableType: 'Commit',
    authorId: 1,
    createdAt: '2015-05-17 18:08:09 UTC',
    updatedAt: '2015-05-17 18:08:09 UTC',
    projectId: 5,
    attachment: null,
    lineCode: 'bec9703f7a456cd2b4ab5fb3220ae016e3e394e3_0_1',
    commitId: 'cfe32cf61b73a0d5e9f13e774abde7ff789b1660',
    noteableId: null,
    system: false,
    stDiff: {
      diff: '--- /dev/null\n+++ b/six\n@@ -0,0 +1 @@\n+Subproject commit 409f37c4f05865e4fb208c771485f211a22c4c2d\n',
      newPath: 'six',
      oldPath: 'six',
      aMode: '0',
      bMode: '160000',
      newFile: true,
      renamedFile: false,
      deletedFile: false,
    },
    url: 'http://example.com/gitlab-org/gitlab-test/commit/cfe32cf61b73a0d5e9f13e774abde7ff789b1660#note_1243',
  },

  // Details about the commit associated with the note.
  commit: {
    id: 'cfe32cf61b73a0d5e9f13e774abde7ff789b1660',
    message:
      'Add submodule\n\nSigned-off-by: Example User \u003cuser@example.com.com\u003e\n',
    timestamp: '2014-02-27T10:06:20+02:00',
    url: 'http://example.com/gitlab-org/gitlab-test/commit/cfe32cf61b73a0d5e9f13e774abde7ff789b1660',
    author: {
      name: 'Example User',
      email: 'user@example.com',
    },
  },
};

module.exports = commitCommentEventPayload;
