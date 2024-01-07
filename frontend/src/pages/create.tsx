import { Form, Input, Button, Layout, message } from 'antd';
import axios from '../lib/axios';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';

const { Content } = Layout;

interface BookFormValues {
  title: string;
  author: string;
  ISBN?: string;
  status: string;
}

const CreateBook = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: BookFormValues) => {
    try {
      await axios.post('/books', values);
      message.success('Book added successfully');
      router.push('/');
    } catch (error) {
      message.error('An error occurred while adding the book');
    }
  };

  return (
    <Layout className='min-h-screen'>
      <div className="bg-slate-700 text-white text-xl">
        <h1 className='py-5 px-5'>My Book Management App</h1>
      </div>
      <Content className="p-4 m-5 rounded-xl">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Author" name="author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ISBN" name="ISBN">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4">
            Add Book
          </Button>
        </Form>
      </Content>
    </Layout>
  );
};

export default CreateBook;
