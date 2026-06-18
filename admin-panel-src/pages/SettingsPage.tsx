import { useEffect, useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Typography, message, Tabs, Spin, Upload, Image, Space } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { list, batchSettings, upload as apiUpload } from '../api/client';

interface Setting {
  id: number;
  key: string;
  value: string;
  type: string;
  group: string;
  label: string;
}

const settingLabels: Record<string, string> = {
  hero_eyebrow: 'Hero üst yazı',
  hero_title_1: 'Hero başlıq (sətir 1)',
  hero_title_2: 'Hero başlıq (sətir 2)',
  hero_description: 'Hero təsvir mətni',
  hero_cta_primary: 'Hero əsas düymə yazısı',
  hero_cta_secondary: 'Hero ikinci düymə yazısı',
  sale_title: 'Endirim başlığı',
  sale_eyebrow: 'Endirim üst yazısı',
  splash_slogan_1: 'Splash slogan (sətir 1)',
  splash_slogan_2: 'Splash slogan (sətir 2)',
  splash_subtitle: 'Splash alt yazı',
  topbar_left: 'Üst bar sol yazı',
  topbar_right1: 'Üst bar sağ yazı 1',
  topbar_right2: 'Üst bar sağ yazı 2',
  free_shipping_threshold: 'Pulsuz çatdırılma həddi (₼)',
  music_volume: 'Musiqi səs səviyyəsi (0-1)',
  watermark_logo: 'Watermark logo (şəkillərin sağ alt küncünə qoyulur)',
  footer_copyright: 'Footer müəllif hüququ',
  footer_company: 'Footer şirkət adı',
};

function FileSettingField({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  useEffect(() => { setPreview(value || ''); }, [value]);
  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { data } = await apiUpload(file);
      const url = data.url?.startsWith('http') ? data.url : `https://rchub.023.az${data.url}`;
      onChange?.(url);
      setPreview(url);
      message.success('Fayl yükləndi');
    } catch { message.error('Yükləmə xətası'); }
    setUploading(false);
    return false;
  };
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Upload showUploadList={false} beforeUpload={(f) => { handleUpload(f); return false; }} accept="image/*">
          <Button icon={<UploadOutlined />} loading={uploading}>Fayl yüklə</Button>
        </Upload>
        <Input value={preview} onChange={(e) => { setPreview(e.target.value); onChange?.(e.target.value); }} placeholder="və ya URL" style={{ width: 300 }} />
      </Space>
      {preview && <Image src={preview} alt="" style={{ maxHeight: 80, borderRadius: 4 }} />}
    </Space>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    list('settings').then(({ data }) => {
      const items = Array.isArray(data) ? data : data.data || [];
      setSettings(items);
      const values: Record<string, string> = {};
      items.forEach((s: Setting) => { values[s.key] = s.value; });
      form.setFieldsValue(values);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = form.getFieldsValue();
      await batchSettings(values);
      message.success('Tənzimləmələr uğurla yadda saxlanıldı');
    } catch {
      message.error('Xəta baş verdi');
    }
    setSaving(false);
  };

  const groups = [...new Set(settings.map(s => s.group))];
  const groupLabels: Record<string, string> = {
    hero: 'Ana Səhifə Hero',
    sale: 'Endirimlər',
    splash: 'Giriş Ekranı',
    topbar: 'Üst Bildiriş Paneli',
    general: 'Ümumi Tənzimləmələr',
    footer: 'Alt Hissə (Footer)',
  };

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>Tənzimləmələr</Typography.Title>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={saving} size="large">
          Yadda saxla
        </Button>
      </div>

      <Form form={form} layout="vertical">
        <Tabs
          items={groups.map(g => ({
            key: g,
            label: groupLabels[g] || g,
            children: (
              <Card>
                {settings.filter(s => s.group === g).map(s => (
                  <Form.Item key={s.key} name={s.key} label={settingLabels[s.key] || s.label || s.key}>
                    {s.type === 'file' ? <FileSettingField /> : s.type === 'number' ? <InputNumber style={{ width: '100%' }} /> : <Input />}
                  </Form.Item>
                ))}
              </Card>
            ),
          }))}
        />
      </Form>
    </div>
  );
}
