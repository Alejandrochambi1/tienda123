import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <Container fluid className={styles.welcomeContainer}>
        <div className={styles.loadingAnimation}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
        <h1 className={styles.welcomeText}>Bienvenido a SmartPhone</h1>
      </Container>
    );
  }

  return (
    <Container fluid className={styles.welcomeContainer}>
      <h1 className={styles.welcomeText}>Bienvenido a SmartPhone</h1>
      <p className={styles.subText}>Tu destino para la mejor tecnología móvil</p>
      <div className={styles.buttonContainer}>
        <Button variant="primary" className={styles.actionButton} onClick={() => navigate('/login')}>
          Iniciar Sesión
        </Button>
        <Button variant="outline-primary" className={styles.actionButton} onClick={() => navigate('/register')}>
          Registrarse
        </Button>
      </div>
    </Container>
  );
};

export default WelcomePage;

