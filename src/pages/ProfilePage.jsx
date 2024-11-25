import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';
import { FaUser, FaEnvelope, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <Container>
        <Card className={styles.profileCard}>
          <Card.Body>
            <Row>
              <Col md={4} className={styles.avatarColumn}>
                <div className={styles.avatarWrapper}>
                  <img src={user.avatar || '/default-avatar.png'} alt="Avatar" className={styles.avatar} />
                </div>
              </Col>
              <Col md={8}>
                <Card.Title className={styles.profileTitle}>Mi Perfil</Card.Title>
                <div className={styles.profileInfo}>
                  <div className={styles.infoItem}>
                    <FaUser className={styles.infoIcon} />
                    <span>{user.username}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <FaEnvelope className={styles.infoIcon} />
                    <span>{user.email}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <FaCalendar className={styles.infoIcon} />
                    <span>Miembro desde: {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <FaMapMarkerAlt className={styles.infoIcon} />
                    <span>{user.location || 'No especificado'}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ProfilePage;

