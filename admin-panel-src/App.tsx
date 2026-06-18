import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import CrudPage from './pages/CrudPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';

const isAuth = () => !!localStorage.getItem('rc_token');

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return isAuth() ? <>{children}</> : <Navigate to="/login" replace />;
}

export const ThemeContext = createContext<{ dark: boolean; toggle: () => void }>({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('rc_theme') === 'dark');
  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('rc_theme', next ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <ConfigProvider
        theme={{
          algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#FF4D14',
            borderRadius: 6,
            fontFamily: "'Saira', system-ui, sans-serif",
          },
        }}
      >
        <BrowserRouter basename="/admin">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<CrudPage resource="products" title="Məhsullar" />} />
              <Route path="parts" element={<CrudPage resource="parts" title="Ehtiyat Hissələri" />} />
              <Route path="brands" element={<CrudPage resource="brands" title="Brendlər" />} />
              <Route path="categories" element={<CrudPage resource="categories" title="Kateqoriyalar" />} />
              <Route path="orders" element={<CrudPage resource="orders" title="Sifarişlər" />} />
              <Route path="builder-steps" element={<CrudPage resource="builder-steps" title="RC Builder" />} />
              <Route path="nav-items" element={<CrudPage resource="nav-items" title="Naviqasiya" />} />
              <Route path="hero-slides" element={<CrudPage resource="hero-slides" title="Hero Slaydar" />} />
              <Route path="footer-groups" element={<CrudPage resource="footer-groups" title="Footer" />} />
              <Route path="reassurance-items" element={<CrudPage resource="reassurance-items" title="Etibar Zolağı" />} />
              <Route path="settings" element={<SettingsPage />} />
            <Route path="users" element={<UsersPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
