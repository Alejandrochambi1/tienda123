import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaRocket, FaHandshake, FaMobileAlt } from 'react-icons/fa';
import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className={styles.title}>Sobre Nosotros</h1>
            <p className={styles.subtitle}>Innovación y excelencia en tecnología móvil</p>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={6}>
            <h2 className={styles.sectionTitle}>Nuestra Historia</h2>
            <p className={styles.text}>
              Fundada en 2010, SmartPhone nació con la visión de revolucionar la forma en que las personas interactúan con la tecnología móvil. Desde nuestros humildes comienzos como una pequeña tienda local, hemos crecido hasta convertirnos en un referente nacional en la venta de dispositivos móviles y accesorios.
            </p>
            <p className={styles.text}>
              A lo largo de los años, hemos mantenido nuestro compromiso con la innovación, la calidad y el servicio al cliente, adaptándonos constantemente a las cambiantes necesidades del mercado y las últimas tendencias tecnológicas.
            </p>
          </Col>
          <Col lg={6}>
            <div className={styles.imageWrapper}>
              <img src="/images/img/FONDO/fondoNosotros.jpeg" alt="Equipo de SmartPhone" className={styles.aboutImage} />
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={4}>
            <Card className={styles.valueCard}>
              <Card.Body>
                <FaRocket className={styles.valueIcon} />
                <Card.Title className={styles.valueTitle}>Innovación</Card.Title>
                <Card.Text className={styles.valueText}>
                  Nos esforzamos por estar siempre a la vanguardia de la tecnología, ofreciendo los productos más avanzados y soluciones innovadoras.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={styles.valueCard}>
              <Card.Body>
                <FaHandshake className={styles.valueIcon} />
                <Card.Title className={styles.valueTitle}>Servicio al Cliente</Card.Title>
                <Card.Text className={styles.valueText}>
                  Nuestro compromiso es brindar una experiencia excepcional a cada cliente, con atención personalizada y soporte de calidad.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={styles.valueCard}>
              <Card.Body>
                <FaMobileAlt className={styles.valueIcon} />
                <Card.Title className={styles.valueTitle}>Calidad</Card.Title>
                <Card.Text className={styles.valueText}>
                  Seleccionamos cuidadosamente cada producto en nuestro catálogo para garantizar la más alta calidad y rendimiento.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className={styles.sectionTitle}>Nuestro Compromiso</h2>
            <p className={styles.text}>
              En SmartPhone, nos comprometemos a seguir siendo líderes en la industria de la tecnología móvil, ofreciendo productos de vanguardia y un servicio excepcional. Continuaremos innovando y adaptándonos para satisfacer las necesidades cambiantes de nuestros clientes, manteniendo siempre nuestros valores fundamentales de calidad, servicio y excelencia.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;
