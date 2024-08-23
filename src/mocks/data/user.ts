type User = {
  id: string;
  name: string;
  email: string;
};

const mockedUser: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
  },
];

export default mockedUser;
