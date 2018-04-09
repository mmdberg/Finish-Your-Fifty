export const fetchUsers = jest.fn().mockImplementation(() => Promise.resolve(
  [{
    name: 'Pizza',
    email: 'pizza@pizza',
    password: 'p'
  }]
));

export const addUser = jest.fn().mockImplementation(() => Promise.resolve({
  ok: true,
  json: () => (1)
}));