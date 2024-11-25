import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../Components/ProductCard';
import styles from './CategoryPage.module.css';

const AccesoriosPage = () => {
  const [filter, setFilter] = useState('');
  const accesorios = getProductsByCategory('accesorios');

  const filteredProducts = accesorios.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container fluid className={styles.categoryPage}>
      <h1 className={styles.title}>Accesorios</h1>
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <InputGroup className={styles.searchGroup}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar accesorios..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default AccesoriosPage;



