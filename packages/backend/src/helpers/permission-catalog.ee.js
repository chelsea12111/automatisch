type Subject = {
  label: string;
  key: string;
};

type Condition = {
  name: string;
  key: string;
};

type Action = {
  label: string;
  key: string;
  subjects: Subject[];
};

type Permission = {
  conditions: Condition[];
  actions: Action[];
  subjects: Subject[];
};

const Connection: Subject = {
  label: 'Connection',
  key: 'Connection',
};

const Flow: Subject = {
  label: 'Flow',
  key: 'Flow',
};

const Execution: Subject = {
  label: 'Execution',
  key: 'Execution',
};

const permissionCatalog: Permission = {
  conditions: [
    {
      name: 'Is creator',
      key: 'isCreator',
    },
  ],
  actions: [
    {
      label: 'Create',
      key: 'create',
      subjects: [Connection, Flow],
    },
    {
      label: 'Read',
      key: 'read',
      subjects: [Connection, Execution, Flow],
    },
    {
      label: 'Update',
      key: 'update',
      subjects: [Connection, Flow],
    },
    {
      label: 'Delete',
      key: 'delete',
      subjects: [Connection, Flow],
    },
    {
      label: 'Publish',
      key: 'publish',
      subjects: [Flow],
    },
  ],
  subjects: [Connection, Flow, Execution],
};

export default permissionCatalog;
