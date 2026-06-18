import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Typography, message, Popconfirm, Tag, Card, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, LockOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';
import { list, create, update, destroy, getMe, updateProfile, changePassword } from '../api/client';

const roleLabels: Record<string, { label: string; color: string }> = {
  admin: { label: 'Admin', color: 'red' },
  editor: { label: 'Redaktor', color: 'blue' },
  viewer: { label: 'İzləyici', color: 'default' },
};

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [me, setMe] = useState<any>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data } = await list('users');
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch {}
    setLoading(false);
  };

  const loadMe = async () => {
    const { data } = await getMe();
    setMe(data);
    profileForm.setFieldsValue({ name: data.name, email: data.email });
  };

  useEffect(() => { loadUsers(); loadMe(); }, []);

  const openCreate = () => { setEditing(null); form.resetFields(); setModalOpen(true); };
  const openEdit = (record: any) => { setEditing(record); form.setFieldsValue({ ...record, password: '' }); setModalOpen(true); };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        if (!values.password) delete values.password;
        await update('users', editing.id, values);
        message.success('İstifadəçi yeniləndi');
      } else {
        await create('users', values);
        message.success('İstifadəçi yaradıldı');
      }
      setModalOpen(false);
      loadUsers();
    } catch {}
  };

  const handleDelete = async (id: number) => {
    try {
      await destroy('users', id);
      message.success('İstifadəçi silindi');
      loadUsers();
    } catch (e: any) {
      message.error(e.response?.data?.message || 'Xəta');
    }
  };

  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      const values = await profileForm.validateFields();
      const { data } = await updateProfile(values);
      setMe(data.user);
      message.success('Profil yeniləndi');
    } catch (e: any) {
      message.error(e.response?.data?.message || 'Xəta');
    }
    setProfileSaving(false);
  };

  const handlePasswordChange = async () => {
    setPasswordSaving(true);
    try {
      const values = await passwordForm.validateFields();
      await changePassword(values);
      message.success('Şifrə uğurla dəyişdirildi');
      passwordForm.resetFields();
    } catch (e: any) {
      message.error(e.response?.data?.message || 'Cari şifrə yanlışdır');
    }
    setPasswordSaving(false);
  };

  const columns = [
    { title: 'Ad', dataIndex: 'name', key: 'name' },
    { title: 'E-poçt', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'role', key: 'role', render: (r: string) => {
      const info = roleLabels[r] || { label: r, color: 'default' };
      return <Tag color={info.color}>{info.label}</Tag>;
    }},
    { title: 'Qoşulma tarixi', dataIndex: 'created_at', key: 'created_at', render: (v: string) => v ? new Date(v).toLocaleDateString('az-AZ') : '—' },
    {
      title: 'Əməliyyat', key: 'actions', width: 120,
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Bu istifadəçini silmək istəyirsiniz?" onConfirm={() => handleDelete(record.id)} okText="Bəli" cancelText="Xeyr">
            <Button size="small" icon={<DeleteOutlined />} danger disabled={record.id === me?.id} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Profile & Password */}
      <Typography.Title level={3}>Hesab tənzimləmələri</Typography.Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <Card title={<><UserOutlined /> Profil məlumatları</>} size="small">
          <Form form={profileForm} layout="vertical" onFinish={handleProfileSave}>
            <Form.Item name="name" label="Ad Soyad" rules={[{ required: true, message: 'Ad daxil edin' }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="email" label="E-poçt" rules={[{ required: true, type: 'email', message: 'Düzgün e-poçt daxil edin' }]}>
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={profileSaving}>Profili yenilə</Button>
          </Form>
        </Card>

        <Card title={<><KeyOutlined /> Şifrəni dəyiş</>} size="small">
          <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange}>
            <Form.Item name="current_password" label="Cari şifrə" rules={[{ required: true, message: 'Cari şifrəni daxil edin' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="new_password" label="Yeni şifrə" rules={[{ required: true, min: 6, message: 'Minimum 6 simvol' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="new_password_confirmation" label="Yeni şifrə (təkrar)" dependencies={['new_password']}
              rules={[{ required: true, message: 'Şifrəni təkrar daxil edin' }, ({ getFieldValue }) => ({
                validator(_, value) { return !value || getFieldValue('new_password') === value ? Promise.resolve() : Promise.reject('Şifrələr uyğun gəlmir'); }
              })]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={passwordSaving} danger>Şifrəni dəyiş</Button>
          </Form>
        </Card>
      </div>

      <Divider />

      {/* User management */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>İstifadəçilər</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Yeni istifadəçi</Button>
      </div>

      <Table dataSource={users} columns={columns} rowKey="id" loading={loading} size="small"
        locale={{ emptyText: 'İstifadəçi tapılmadı' }} pagination={false} />

      <Modal
        title={editing ? 'İstifadəçini redaktə et' : 'Yeni istifadəçi yarat'}
        open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)}
        okText="Yadda saxla" cancelText="Ləğv et" width={480}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Ad Soyad" rules={[{ required: true, message: 'Ad daxil edin' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" label="E-poçt" rules={[{ required: true, type: 'email', message: 'Düzgün e-poçt daxil edin' }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="password" label={editing ? 'Yeni şifrə (boş = dəyişməz)' : 'Şifrə'}
            rules={editing ? [] : [{ required: true, min: 6, message: 'Minimum 6 simvol' }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item name="role" label="Rol" initialValue="editor">
            <Select options={[
              { value: 'admin', label: 'Admin — tam icazə' },
              { value: 'editor', label: 'Redaktor — məzmun redaktəsi' },
              { value: 'viewer', label: 'İzləyici — yalnız baxış' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
