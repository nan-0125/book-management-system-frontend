import axios from "axios";
import type {AxiosError} from "axios";

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