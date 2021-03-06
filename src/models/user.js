export default {
  name: 'user',
  tableName: 'users',
  properties: {
    id: {
      column: 'user_id',
      type: 'integer',
      primaryKey: true,
    },
    firstName: {
      column: 'first_name',
      type: 'text',
    },
    lastName: {
      column: 'last_name',
      type: 'text',
    },
    username: {
      column: 'username',
      type: 'text',
    },
    birthday: {
      column: 'birthday',
      type: 'date',
    },
  },
  relations: {
    emails: {
      type: 'one-to-many',
      join: {
        id: 'userId',
      },
    },
    notes: {
      type: 'one-to-many',
      join: {
        id: 'userId',
      },
    },
  },
};
