import { cloneElement, useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { ShoppingOutlined, ToolOutlined, TagsOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { list } from '../api/client';

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, parts: 0, brands: 0, orders: 0 });

  useEffect(() => {
    Promise.all([
      list('products', { per_page: 1 }),
      list('parts', { per_page: 1 }),
      list('brands', { all: true }),
      list('orders', { per_page: 1 }),
    ]).then(([p, pt, b, o]) => {
      setStats({
        products: p.data.total || p.data.length || 0,
        parts: pt.data.total || pt.data.length || 0,
        brands: Array.isArray(b.data) ? b.data.length : b.data.total || 0,
        orders: o.data.total || o.data.length || 0,
      });
    });
  }, []);

  const cards = [
    { title: 'Məhsullar', value: stats.products, icon: <ShoppingOutlined />, color: '#FF4D14' },
    { title: 'Ehtiyat Hissələri', value: stats.parts, icon: <ToolOutlined />, color: '#FFC21A' },
    { title: 'Brendlər', value: stats.brands, icon: <TagsOutlined />, color: '#20C46B' },
    { title: 'Sifarişlər', value: stats.orders, icon: <ShoppingCartOutlined />, color: '#2BD0D9' },
  ];

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>Dashboard</Typography.Title>
      <Row gutter={[16, 16]}>
        {cards.map(c => (
          <Col xs={12} md={6} key={c.title}>
            <Card>
              <Statistic title={c.title} value={c.value} prefix={cloneElement(c.icon, { style: { color: c.color } })} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
