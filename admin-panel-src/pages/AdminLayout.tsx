import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Typography, Avatar, Switch, theme } from 'antd';
import {
  DashboardOutlined, ShoppingOutlined, ToolOutlined, TagsOutlined,
  AppstoreOutlined, ShoppingCartOutlined, BuildOutlined, MenuOutlined,
  PictureOutlined, BlockOutlined, SafetyOutlined, SettingOutlined, LogoutOutlined,
  SunOutlined, MoonOutlined, TeamOutlined,
} from '@ant-design/icons';
import { getMe, logout as apiLogout } from '../api/client';
import { useTheme } from '../App';

const { Sider, Header, Content } = Layout;
const { useToken } = theme;

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/products', icon: <ShoppingOutlined />, label: 'Məhsullar' },
  { key: '/parts', icon: <ToolOutlined />, label: 'Ehtiyat Hissələri' },
  { key: '/brands', icon: <TagsOutlined />, label: 'Brendlər' },
  { key: '/categories', icon: <AppstoreOutlined />, label: 'Kateqoriyalar' },
  { key: '/orders', icon: <ShoppingCartOutlined />, label: 'Sifarişlər' },
  { key: '/builder-steps', icon: <BuildOutlined />, label: 'RC Builder' },
  { type: 'divider' as const },
  { key: '/nav-items', icon: <MenuOutlined />, label: 'Naviqasiya' },
  { key: '/hero-slides', icon: <PictureOutlined />, label: 'Hero Slaydar' },
  { key: '/footer-groups', icon: <BlockOutlined />, label: 'Footer' },
  { key: '/reassurance-items', icon: <SafetyOutlined />, label: 'Etibar Zolağı' },
  { key: '/settings', icon: <SettingOutlined />, label: 'Tənzimləmələr' },
  { key: '/users', icon: <TeamOutlined />, label: 'İstifadəçilər' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const { dark, toggle } = useTheme();
  const { token } = useToken();

  useEffect(() => {
    getMe().then(r => setUser(r.data)).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await apiLogout().catch(() => {});
    localStorage.removeItem('rc_token');
    window.location.href = '/admin/login';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={240}
        style={{ background: token.colorBgContainer, borderRight: `1px solid ${token.colorBorderSecondary}` }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
          <span style={{ color: '#FF4D14', fontWeight: 900, fontStyle: 'italic', fontSize: collapsed ? 14 : 18 }}>RC</span>
          {!collapsed && <span style={{ color: token.colorText, fontWeight: 900, fontStyle: 'italic', fontSize: 18 }}>DriveHub</span>}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.replace('/admin', '') || '/']}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ background: 'transparent', borderRight: 'none' }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: token.colorBgContainer, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, borderBottom: `1px solid ${token.colorBorderSecondary}`, lineHeight: 'normal' }}>
          <Switch
            checked={dark}
            onChange={toggle}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          {user && (
            <>
              <Avatar style={{ background: '#FF4D14' }}>{user.name?.[0]}</Avatar>
              <Typography.Text>{user.name}</Typography.Text>
            </>
          )}
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} danger>Çıxış</Button>
        </Header>
        <Content style={{ padding: 24, background: token.colorBgLayout, overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
