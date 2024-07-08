import { v4 as uuidv4 } from 'uuid';

let todos = [
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

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(todos);
      break;
    case 'POST':
      const newTodo = { id: uuidv4(), ...req.body };
      todos.push(newTodo);
      res.status(201).json({ success: true });
      break;
    case 'PUT':
      const { id } = req.body;
      todos = todos.map(todo => (todo.id === id ? req.body : todo));
      res.status(200).json({ success: true });
      break;
    case 'DELETE':
      todos = todos.filter(todo => todo.id !== req.query.id);
      res.status(200).json({ success: true });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
