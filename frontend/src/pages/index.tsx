import { Table, Button, Layout, message, Popconfirm } from 'antd';
import Link from 'next/link';
import useSWR from 'swr';

import axios from '@src/lib/axios';
import fetcher from '@src/lib/fetcher';

const { Header, Content, Footer } = Layout;

interface Book {
  id: string;
  title: string;
  author: string;
  ISBN?: string; 
  status: string;
}

const IndexPage = () => {
  const { data: books, error, mutate } = useSWR<Book[]>('/books', fetcher);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/books/${id}`);
      message.success("Successfully deleted")
      mutate();
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'ISBN',
      dataIndex: 'ISBN',
      key: 'ISBN',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },{
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Book) => (
        <div className="flex items-center space-x-2">
          <Link href={`/edit/${record.id}`} passHref>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this book?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <div className="bg-slate-700 text-white text-xl">
        <h1 className='py-5 px-5'>My Book Management App</h1>
      </div>
      <Content className="p-4">
        {error && <div>Failed to load books</div>}
        {!books && <div>Loading...</div>}
        {books && <Table dataSource={books} columns={columns} rowKey="id" />}
        <Link href="/create" passHref>
          <Button type="primary" className="mt-4">
            Add New Book
          </Button>
        </Link>
      </Content>
      <Footer className="text-center">
        Book App ©2024 Created by Joshua Rodriguez
      </Footer>
    </Layout>
  );
};

export default IndexPage;
