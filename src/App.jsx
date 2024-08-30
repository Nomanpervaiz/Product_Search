import { useState, useEffect } from 'react';
import Cards from './components/cards';
import { Breadcrumb, Layout, theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(""); 


  useEffect(() => {
    getProducts();
  }, []);

  // Fetch products from API
  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  };

  
  const searchProduct = () => {
    if (search) {
      const filteredProducts = products.filter((product) => product.category === search);
      setFiltered(filteredProducts);
    } else {
      setFiltered(products)
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const uniqueCategories = [...new Set(products.map((val) => val.category))];
  const { Header, Content, Footer } = Layout;

  return (
    <Layout className='layoutMain'>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <select onChange={(e) => setSearch(e.target.value)}>
          <option disabled value="">
            Select item
          </option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category.toUpperCase()}
            </option>
          ))}
        </select>
        <button className='searchBtn' onClick={searchProduct}>
          <SearchOutlined className='iconSearch' /> search
        </button>

        <div className="demo-logo" />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        ></Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            height: 'fit-content',
          }}
        >
          <Cards product={filtered} />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Design ©{new Date().getFullYear()} Created by Nomanpervaiz
      </Footer>
    </Layout>
  );
}

export default App;
