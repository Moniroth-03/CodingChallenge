export default function handler(req, res) {
    const todos = [
      {
        id: '1',
        todo: 'Learn Next.js',
        isCompleted: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        todo: 'Build a Todo List',
        isCompleted: false,
        createdAt: new Date().toISOString(),
      },
    ];
    res.status(200).json(todos);
  }
  