import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        {error && <Alert variant="danger">{error}</Alert>}
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

          <Form.Group controlId="formBasicPassword">
            <div className={styles.inputGroup}>
              <FaLock className={styles.inputIcon} />
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </Form.Group>

          <Button type="submit" className={styles.formBtn} disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </Form>
        <div className={styles.linkContainer}>
          <Link to="/forgot-password" className={styles.forgotPasswordLink}>¿Olvidaste tu contraseña?</Link>
          <p className={styles.signUpLabel}>
            ¿No tienes una cuenta? <Link to="/register" className={styles.signUpLink}>Regístrate</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;



