import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaList, FaHome, FaTimes, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PaymentProcess from './PaymentProcess';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Header.module.css';

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  const handleProductsToggle = () => {
    setShowProducts(!showProducts);
  };

  const handleLogin = () => {
    navigate('/login');
    handleProfileToggle();
    setMenuOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    handleProfileToggle();
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleProfileToggle();
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
    setShowProfile(false);
    setShowProducts(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.headerIcons}, .${styles.navLinks}, .${styles.dropdownContainer}`)) {
        setShowProfile(false);
        setShowProducts(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [showPaymentProcess, setShowPaymentProcess] = useState(false);

  const handlePaymentProcessClose = () => setShowPaymentProcess(false);
  const handlePaymentProcessShow = () => {
    setShowPaymentProcess(true);
    handleCartClose();
  };

  return (
    <Navbar expand="lg" fixed="top" className={`${styles.navbar} ${menuOpen ? styles['menu-open'] : ''} py-3`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
          <h1 className={styles.brandName}>
            <span className={styles.gradientText}>SmartPhone</span>
          </h1>
          <p className={styles.tagline}>Innovación en tus manos</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggle} onClick={handleMenuToggle}>
            <div className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className={`${styles.navbarCollapse} ${menuOpen ? styles.show : ''}`}>
          <Nav className={`ms-auto ${styles.navLinks}`}>
            <Nav.Link as={Link} to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`} onClick={handleNavLinkClick}>
              <FaHome className="me-2" />Inicio
            </Nav.Link>
            <div className={styles.dropdownContainer}>
              <Button 
                variant="link" 
                className={`${styles.navLink} ${location.pathname.includes('/products') ? styles.active : ''}`} 
                onClick={handleProductsToggle}
              >
                <FaList className="me-2" />Productos <FaChevronDown className={`${styles.dropdownIcon} ${showProducts ? styles.rotate : ''}`} />
              </Button>
              <div className={`${styles.productsDropdown} ${showProducts ? styles.show : ''}`}>
                <Button as={Link} to="/products/celulares" variant="link" className={styles.productLink} onClick={() => { setShowProducts(false); handleNavLinkClick(); }}>Celulares</Button>
                <Button as={Link} to="/products/tablets" variant="link" className={styles.productLink} onClick={() => { setShowProducts(false); handleNavLinkClick(); }}>Tablets</Button>
                <Button as={Link} to="/products/accesorios" variant="link" className={styles.productLink} onClick={() => { setShowProducts(false); handleNavLinkClick(); }}>Accesorios</Button>
              </div>
            </div>
            <Nav.Link as={Link} to="/brands" className={`${styles.navLink} ${location.pathname === '/brands' ? styles.active : ''}`} onClick={handleNavLinkClick}>Marcas</Nav.Link>
            <Nav.Link as={Link} to="/offers" className={`${styles.navLink} ${location.pathname === '/offers' ? styles.active : ''}`} onClick={handleNavLinkClick}>Ofertas</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={`${styles.navLink} ${location.pathname === '/contact' ? styles.active : ''}`} onClick={handleNavLinkClick}>Contacto</Nav.Link>
          </Nav>
          <div className={styles.headerIcons}>
            <div className={styles.dropdownContainer}>
              <Button variant="link" className={styles.iconButton} onClick={handleProfileToggle}>
                <FaUser />
                <FaChevronDown className={`${styles.dropdownIcon} ${showProfile ? styles.rotate : ''}`} />
              </Button>
              <div className={`${styles.profileDropdown} ${showProfile ? styles.show : ''}`}>
                {user ? (
                  <>
                    <Button as={Link} to="/profile" variant="link" className={styles.profileLink} onClick={() => { setShowProfile(false); handleNavLinkClick(); }}>
                      Mi Perfil
                    </Button>
                    <Button variant="link" className={styles.profileLink} onClick={() => { handleLogout(); setShowProfile(false); handleNavLinkClick(); }}>
                      <FaSignOutAlt className="me-2" />Cerrar sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="link" className={styles.profileLink} onClick={() => { handleLogin(); setShowProfile(false); handleNavLinkClick(); }}>
                      Iniciar sesión
                    </Button>
                    <Button variant="link" className={styles.profileLink} onClick={() => { handleRegister(); setShowProfile(false); handleNavLinkClick(); }}>
                      Registrarse
                    </Button>
                  </>
                )}
              </div>
            </div>
            <Button 
              variant="link" 
              onClick={handleCartShow} 
              className={`${styles.iconButton} ${styles.cartButton}`}
            >
              <FaShoppingCart />
              {cart.length > 0 && <span className={styles.cartBadge}>{cart.length}</span>}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>

      <Offcanvas show={showCart} onHide={handleCartClose} placement="end" className={styles.cartOffcanvas}>
        <Offcanvas.Header className={styles.cartHeader}>
          <Offcanvas.Title>Tu Carrito</Offcanvas.Title>
          <Button variant="link" onClick={handleCartClose} className={styles.closeButton}>
            <FaTimes />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                  <div className={styles.cartItemDetails}>
                    <h5>{item.name}</h5>
                    <p>${item.price}</p>
                  </div>
                  <Button variant="link" onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                    <FaTimes />
                  </Button>
                </div>
              ))}
              <div className={styles.cartTotal}>
                <h4>Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</h4>
              </div>
              <Button variant="primary" className={`w-100 mb-2 ${styles.checkoutButton}`} onClick={handlePaymentProcessShow}>
                Proceder al pago
              </Button>
              <Button variant="outline-danger" className={`w-100 ${styles.clearCartButton}`} onClick={clearCart}>
                Vaciar carrito
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      
      <PaymentProcess
        show={showPaymentProcess}
        handleClose={handlePaymentProcessClose}
        total={cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
        cartItems={cart}
      />
    </Navbar>
  );
}

export default Header;







