import { useState } from 'react';
import { Button, Card, Form, Input, message, Typography, theme } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { login } from '../api/client';

const { useToken } = theme;

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { token } = useToken();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data } = await login(values.email, values.password);
      localStorage.setItem('rc_token', data.token);
      window.location.href = '/admin';
    } catch {
      message.error('Email və ya şifrə yanlışdır');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: token.colorBgLayout }}>
      <Card style={{ width: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Typography.Title level={3} style={{ color: '#FF4D14', margin: 0, fontStyle: 'italic' }}>RC DRIVEHUB</Typography.Title>
          <Typography.Text type="secondary">Admin Panel</Typography.Text>
        </div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="email" rules={[{ required: true, message: 'Email daxil edin' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Şifrə daxil edin' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Şifrə" size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Daxil ol
          </Button>
        </Form>
      </Card>
    </div>
  );
}
