import { Button, Card, Form, Input, message } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import { InternetError, list } from "../../services";
import { CreateBookModal } from "./CreateBookModal";
import UpdateBookModal from "./UpdateBookModal";

interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export default function BookManage() {
  const [bookList, setBookList] = useState<Array<Book>>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState(false);
  const [updateListCount, setUpdateListCount] = useState(0);
  const [name, setName] = useState('');
  const [updateId, setUpdateId] = useState(0);

  async function searchBook(values: { name: string; author: string }) {
    setName(values.name ?? '');
  }

  useEffect(() => {
    async function fetchData () {
      try {
        const data = await list(name);
  
        if (data.status === 201 || data.status === 200) {
          setBookList(data.data);
        }
      } catch (e) {
        const err = e as InternetError;
        message.error(err.response?.data.message);
      }
    }
    fetchData();
  }, [name, updateListCount]);

  return (
    <div id="bookManage">
      <CreateBookModal isOpen={isCreateModalOpen} handleClose={() => {
        setIsCreateModalOpen(false);
        setUpdateListCount((pre) => pre + 1);
      }} />
      <UpdateBookModal isOpen={isUpdateBookModalOpen} id={updateId} handleClose={() => {
        setIsUpdateBookModalOpen(false);
        setUpdateListCount((pre) => pre + 1);
      }} />
      <h1>图书管理系统</h1>
      <div className="content">
        <div className='book-search'>
          <Form
            name="search"
            layout='inline'
            colon={false}
            onFinish={searchBook}
          >
            <Form.Item label="图书名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                搜索图书
              </Button>
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ background: 'green' }} onClick={() => {
                setIsCreateModalOpen(true);
              }}>
                添加图书
              </Button>
          </Form>
        </div>
        <div className="book-list">
          {
            bookList.map(book => {
              return <Card
                key={book.id}
                className='card'
                hoverable
                style={{ width: 300 }}
                cover={<img alt="example" src={`http://localhost:3000/${book.cover}`} />}
              >
                <h2>{book.name}</h2>
                <div>{book.author}</div>
                <div className='links'>
                  <a href="#">详情</a>
                  <a onClick={() => {
                    setUpdateId(book.id);
                    setIsUpdateBookModalOpen(true);
                  }}>编辑</a>
                  <a href="#">删除</a>
                </div>
              </Card>
            })
          }
        </div>
      </div>
    </div>
  )
}