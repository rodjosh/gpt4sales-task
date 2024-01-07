import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Form, Input, Button, Layout, message } from 'antd';
import 'tailwindcss/tailwind.css';
import fetcher from '@src/lib/fetcher';
import axios from '@src/lib/axios';

const { Content } = Layout;

interface BookDetails {
  id: number;
  title: string;
  author: string;
  ISBN?: string;
  status: string;
}

const EditBook = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const { data: book, error, mutate } = useSWR<BookDetails>(id ? `/books/${id}` : null, fetcher);

  useEffect(() => {
    if (book) {
      form.setFieldsValue(book);
    }
  }, [book, form]);

  const onFinish = async (values: BookDetails) => {
    try {
      await axios.put(`/books/${id}`, values);
      message.success('Book updated successfully');
      mutate();
      router.push('/');
    } catch (error) {
      message.error('An error occurred while updating the book');
    }
  };

  if (error) return <div>Failed to load the book details</div>;
  if (!book) return <div>Loading...</div>;

  return (
    <Layout className='min-h-screen'>
      <div className="bg-slate-700 text-white text-xl">
        <h1 className='py-5 px-5'>My Book Management App</h1>
      </div>
      <Content className="p-4 m-5 rounded-xl">
        <Form form={form} onFinish={onFinish} layout="vertical" initialValues={book}>
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
            Update Book
          </Button>
        </Form>
      </Content>
    </Layout>
  );
};

export default EditBook;
