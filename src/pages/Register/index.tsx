import {Button, Form, Input, message} from 'antd';
import './index.css';
import {InternetError, register} from "../../services";
import {AxiosError} from "axios";

interface RegisterUser {
  username: string;
  password: string;
  passwordConfirm: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 20 }
}

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 }
}

async function registerHandler(username: string, password: string) {
  try {
    const res = await register(username, password);
    if (res.status === 201 || res.status === 200) {
      message.success('注册成功');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
  } catch (e) {
    const err = e as InternetError;
    if (err.code === AxiosError.ERR_NETWORK) {
      console.error(e);
      message.error("网络出现问题..");
    } else {
      message.error(err.response?.data?.message);
    }
  }
}

const onFinish = async (values: RegisterUser) => {
  const {password, passwordConfirm, username} = values;

  if(password !== passwordConfirm) {
    await message.error("两次密码不一致");
    return;
  }

  await registerHandler(username, password);
};


export default function Register() {
  return (
    <div id="register-container">
      <h1>图书管理</h1>
      <Form
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >

        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="passwordConfirm"
          rules={[{ required: true, message: '请输入确认密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout2}>
          <div className='links'>
            <a href='/login'>已有账号？去登录</a>
          </div>
        </Form.Item>

        <Form.Item
          {...layout2}
        >
          <Button className='btn' type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}