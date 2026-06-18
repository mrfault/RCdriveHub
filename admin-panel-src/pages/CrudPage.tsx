import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Switch, Space, Typography, message, Popconfirm, Select, Tag, Upload, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, UploadOutlined, PictureOutlined } from '@ant-design/icons';
import { list, create, update, destroy, upload } from '../api/client';

const fieldLabels: Record<string, string> = {
  title: 'Başlıq', name: 'Ad', slug: 'Slug', description: 'Təsvir',
  price: 'Qiymət', old_price: 'Köhnə qiymət', brand_id: 'Brend ID', category_id: 'Kateqoriya ID',
  scale: 'Miqyas', speed: 'Sürət', badge_tone: 'Badge tonu', badge_label: 'Badge yazısı',
  rating: 'Reytinq', review_count: 'Rəy sayı', sku: 'SKU kodu', stock_status: 'Stok statusu',
  sort_order: 'Sıralama', is_active: 'Aktivdir', is_featured: 'Seçilmişdir', is_primary: 'Əsasdır',
  icon: 'İkon', type: 'Növ', product_count: 'Məhsul sayı', logo_url: 'Logo',
  url: 'URL / Fayl', image_url: 'Şəkil', fit: 'Uyğunluq', label: 'Yazı', route: 'Marşrut',
  color: 'Rəng', lang: 'Dil', has_animation: 'Animasiyalı', subtitle: 'Alt yazı',
  step_number: 'Addım nömrəsi', builder_step_id: 'Addım ID',
  order_number: 'Sifariş nömrəsi', status: 'Status', status_tone: 'Status tonu',
  status_label: 'Status yazısı', tracking_step: 'İzləmə addımı', tracking_code: 'İzləmə kodu',
  subtotal: 'Aralıq cəm', shipping: 'Çatdırılma', total: 'Cəmi',
  shipping_address: 'Çatdırılma ünvanı', user_id: 'İstifadəçi ID',
  key: 'Açar', value: 'Dəyər', group: 'Qrup',
  brand: 'Brend', quantity: 'Miqdar', created_at: 'Yaradılma tarixi',
  footer_group_id: 'Footer qrup ID', address_line: 'Ünvan', city: 'Şəhər',
  postal_code: 'Poçt kodu', country: 'Ölkə', phone: 'Telefon',
};

const getLabel = (key: string) => fieldLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const isMediaField = (key: string) => ['url', 'image_url', 'logo_url'].includes(key);
const SITE_URL = 'https://rchub.023.az';
const fullUrl = (v: string) => !v ? '' : v.startsWith('http') ? v : SITE_URL + v;
const isVideo = (v: string) => /\.(mp4|webm|mov|avi)$/i.test(v);
const isAudio = (v: string) => /\.(mp3|ogg|wav)$/i.test(v);

interface CrudPageProps {
  resource: string;
  title: string;
}

// Image upload component
function ImageUploadField({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');

  useEffect(() => { setPreview(value || ''); }, [value]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { data } = await upload(file);
      const fullUrl = data.url.startsWith('http') ? data.url : `https://rchub.023.az${data.url}`;
      onChange?.(fullUrl);
      setPreview(fullUrl);
      message.success('Şəkil yükləndi');
    } catch {
      message.error('Yükləmə xətası');
    }
    setUploading(false);
    return false;
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => { handleUpload(file); return false; }}
            accept="image/*,video/*,audio/*"
          >
            <Button icon={<UploadOutlined />} loading={uploading}>Fayl yüklə</Button>
          </Upload>
          <Input
            placeholder="və ya URL daxil edin"
            value={preview}
            onChange={(e) => { setPreview(e.target.value); onChange?.(e.target.value); }}
            style={{ width: 350 }}
          />
        </Space>
        {preview && (() => {
          const src = fullUrl(preview);
          if (isVideo(src)) return <video src={src} style={{ maxHeight: 120, borderRadius: 6 }} controls muted />;
          if (isAudio(src)) return <audio src={src} controls style={{ width: '100%' }} />;
          return <Image src={src} alt="" style={{ maxHeight: 120, borderRadius: 6 }} />;
        })()}
      </Space>
    </div>
  );
}

export default function CrudPage({ resource, title }: CrudPageProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });

  const load = async (page = 1) => {
    setLoading(true);
    try {
      const { data: res } = await list(resource, { page, per_page: 20 });
      if (res.data) {
        setData(res.data);
        setPagination({ current: res.current_page, pageSize: res.per_page, total: res.total });
      } else {
        setData(Array.isArray(res) ? res : []);
      }
    } catch { message.error('Məlumat yüklənmədi'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, [resource]);

  const openCreate = () => { setEditing(null); form.resetFields(); setModalOpen(true); };
  const openEdit = (record: any) => { setEditing(record); form.setFieldsValue(record); setModalOpen(true); };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await update(resource, editing.id, values);
        message.success('Uğurla yeniləndi');
      } else {
        await create(resource, values);
        message.success('Uğurla yaradıldı');
      }
      setModalOpen(false);
      load(pagination.current);
    } catch { /* validation */ }
  };

  const handleDelete = async (id: number) => {
    await destroy(resource, id);
    message.success('Uğurla silindi');
    load(pagination.current);
  };

  const exclude = ['id', 'created_at', 'updated_at', 'brand', 'category', 'images', 'lines', 'user', 'options', 'links'];
  const firstRecord = data[0] || {};
  const fieldKeys = Object.keys(firstRecord).filter(k => !exclude.includes(k));

  const columns = fieldKeys.slice(0, 8).map(key => {
    const col: any = { title: getLabel(key), dataIndex: key, key, ellipsis: true };
    if (typeof firstRecord[key] === 'boolean') {
      col.render = (v: boolean) => v ? <Tag color="green">Bəli</Tag> : <Tag>Xeyr</Tag>;
      col.width = 80;
    }
    if (isMediaField(key)) {
      col.render = (v: string) => {
        if (!v) return <PictureOutlined style={{ fontSize: 20, color: '#999' }} />;
        const src = fullUrl(v);
        if (isVideo(src)) return <video src={src} style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 4 }} muted />;
        if (isAudio(src)) return <span title={v}>🎵</span>;
        return <img src={src} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 4 }} />;
      };
      col.width = 70;
    }
    if (key === 'price' || key === 'old_price' || key === 'total' || key === 'subtotal') {
      col.render = (v: number) => v != null ? `${v} ₼` : '—';
    }
    if (key === 'badge_tone' || key === 'status_tone') {
      col.render = (v: string) => v ? <Tag color={v === 'sale' ? 'gold' : v === 'new' ? 'orange' : v === 'stock' ? 'green' : v === 'danger' ? 'red' : 'blue'}>{v}</Tag> : '—';
    }
    return col;
  });

  // Show primary image from relations
  if (firstRecord.images && firstRecord.images.length > 0) {
    columns.splice(0, 0, {
      title: 'Şəkil', dataIndex: 'images', key: 'primary_image', width: 70,
      render: (imgs: any[]) => imgs?.[0]?.url ? <img src={fullUrl(imgs[0].url)} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 4 }} /> : <PictureOutlined style={{ fontSize: 20, color: '#999' }} />,
    });
  }

  if (firstRecord.brand) {
    columns.splice(1, 0, { title: 'Brend', dataIndex: ['brand', 'name'], key: 'brand_name' });
  }
  if (firstRecord.category) {
    columns.splice(2, 0, { title: 'Kateqoriya', dataIndex: ['category', 'name'], key: 'cat_name' });
  }

  columns.push({
    title: 'Əməliyyat', key: 'actions', width: 120,
    render: (_: any, record: any) => (
      <Space>
        <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
        <Popconfirm title="Bu elementi silmək istəyirsiniz?" onConfirm={() => handleDelete(record.id)} okText="Bəli" cancelText="Xeyr">
          <Button size="small" icon={<DeleteOutlined />} danger />
        </Popconfirm>
      </Space>
    ),
  });

  const renderFormFields = () => {
    return fieldKeys.map(key => {
      if (key === 'id') return null;
      const val = firstRecord[key];
      const label = getLabel(key);

      // Image/file upload fields
      if (isMediaField(key)) {
        return <Form.Item key={key} name={key} label={label}><ImageUploadField /></Form.Item>;
      }
      if (typeof val === 'boolean') {
        return <Form.Item key={key} name={key} label={label} valuePropName="checked"><Switch /></Form.Item>;
      }
      if (typeof val === 'number' && !key.endsWith('_id')) {
        return <Form.Item key={key} name={key} label={label}><InputNumber style={{ width: '100%' }} /></Form.Item>;
      }
      if (key === 'type') {
        return <Form.Item key={key} name={key} label={label}>
          <Select options={[
            {value:'product', label:'Məhsul'},{value:'part', label:'Hissə'},
            {value:'video', label:'Video'},{value:'image', label:'Şəkil'},
            {value:'text', label:'Mətn'},{value:'number', label:'Rəqəm'},
          ]} />
        </Form.Item>;
      }
      if (key === 'badge_tone' || key === 'status_tone') {
        return <Form.Item key={key} name={key} label={label}>
          <Select allowClear options={[
            {value:'sale', label:'Endirim'},{value:'new', label:'Yeni'},
            {value:'stock', label:'Stokda'},{value:'preorder', label:'Sifariş üzrə'},
            {value:'danger', label:'Təcili'},{value:'neutral', label:'Adi'},
          ]} />
        </Form.Item>;
      }
      if (key === 'stock_status') {
        return <Form.Item key={key} name={key} label={label}>
          <Select options={[
            {value:'in_stock', label:'Stokda'},{value:'out_of_stock', label:'Stokda yoxdur'},
            {value:'preorder', label:'Sifariş üzrə'},
          ]} />
        </Form.Item>;
      }
      if (key === 'icon') {
        return <Form.Item key={key} name={key} label={label}>
          <Select showSearch options={[
            'truck','gauge','zap','flag','wrench','package','bolt','shield','cart','heart','star','search','user','menu',
          ].map(v => ({value: v, label: v}))} />
        </Form.Item>;
      }
      if (key === 'description' || key === 'value' || key === 'address_line' || key === 'shipping_address') {
        return <Form.Item key={key} name={key} label={label}><Input.TextArea rows={3} /></Form.Item>;
      }
      return <Form.Item key={key} name={key} label={label}
        rules={key === 'title' || key === 'name' || key === 'label' || key === 'key' ? [{ required: true, message: `${label} daxil edin` }] : []}>
        <Input />
      </Form.Item>;
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>{title}</Typography.Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => load()}>Yenilə</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>Əlavə et</Button>
        </Space>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={pagination.total > 20 ? {
          ...pagination,
          onChange: (p) => load(p),
          showTotal: (total) => `Cəmi ${total} nəticə`,
        } : false}
        size="small"
        style={{ borderRadius: 8 }}
        locale={{ emptyText: 'Məlumat tapılmadı' }}
      />
      <Modal
        title={editing ? `${title} — Redaktə et` : `${title} — Yeni əlavə et`}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => setModalOpen(false)}
        okText="Yadda saxla"
        cancelText="Ləğv et"
        width={700}
      >
        <Form form={form} layout="vertical" style={{ maxHeight: '65vh', overflow: 'auto', paddingRight: 8 }}>
          {renderFormFields()}
        </Form>
      </Modal>
    </div>
  );
}
