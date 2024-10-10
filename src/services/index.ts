import axios from "axios";
import type {AxiosError} from "axios";
import { CreateBook } from "../pages/BookManage/CreateBookModal";
import { UpdateBook } from "../pages/BookManage/UpdateBookModal";

export type InternetError = AxiosError<{message:string}>;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000
});

/**
 * 注册
 * @param username 用户名
 * @param password 密码
 */
export async function register(username: string, password: string) {
  return await axiosInstance.post('/user/register', {
    username, password
  });
}

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export async function login(username: string, password: string) {
  return await axiosInstance.post('/user/login', {
    username, password
  })
}

/**
 * 获取图书列表
 */
export async function list(name: string) {
  return await axiosInstance.get('/book/list', {
    params: {
      name
    }
  });
}

/**
 * 新建图书
 * @param book 图书信息
 * @returns 
 */
export async function create(book: CreateBook) {
  return await axiosInstance.post('/book/create', book)
}

/**
 * 图书详细信息
 * @param id 图书id
 * @returns 图书详细信息
 */
export async function detail(id: number) {
  return await axiosInstance.get(`/book/${id}`);
}

/**
 * 更新图书信息
 * @param book 图书信息
 * @returns 
 */
export async function update(book: UpdateBook) {
  return await axiosInstance.put('/book/update', {
      id: book.id,
      name: book.name,
      author: book.author,
      description: book.description,
      cover: book.cover
  });
}