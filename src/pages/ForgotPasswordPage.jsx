import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import styles from './ForgotPasswordPage.module.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      const result = await resetPassword(email);
      if (result.success) {
        setMessage('Se ha enviado un enlace para restablecer tu contraseña. Por favor, revisa tu correo.');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error al procesar la solicitud. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className={styles.forgotPasswordContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Restablecer Contraseña</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit} className={styles.form}>
          <Form.Group controlId="formBasicEmail">
            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.inputIcon} />
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
          </Form.Group>

          <Button type="submit" className={styles.formBtn} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar enlace de restablecimiento'}
          </Button>
        </Form>
        <p className={styles.loginLabel}>
          ¿Recordaste tu contraseña? <Link to="/login" className={styles.loginLink}>Inicia sesión</Link>
        </p>
      </div>
    </Container>
  );
}

export default ForgotPasswordPage;


