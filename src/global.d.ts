declare module '*.svg' {
  const content: any;
  export default content;
}

interface Todo {
  id: string;
  label: string;
  checked: boolean;
  visible: boolean;
  created_at: string;
  completed_at: string;
}
