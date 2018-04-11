export const fetchUsers = jest.fn().mockImplementation(() => Promise.resolve(
  [{
    userName: 'Pizza',
    email: 'pizza@pizza',
    password: 'p'
  }]
));

export const addUser = jest.fn().mockImplementation(() => Promise.resolve(1));

export const fetchOneUser = jest.fn()
  .mockImplementationOnce(() => Promise.rejects())
  .mockImplementation(() => Promise.resolve({ 
    id: 7,
    userName: 'Pizza',
    email: 'pizza@pizza',
    password: 'p'
}));