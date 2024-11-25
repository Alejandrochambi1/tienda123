import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulamos una verificación simple
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email);
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return { success: true };
    } else if (!foundUser) {
      return { success: false, message: 'Usuario no encontrado' };
    } else {
      return { success: false, message: 'Contraseña incorrecta' };
    }
  };

  const register = async (username, email, password, acceptedTerms) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'El correo electrónico ya está registrado' };
    }
    if (!acceptedTerms) {
      return { success: false, message: 'Debes aceptar los términos y condiciones' };
    }
    const newUser = { id: Date.now(), username, email, password, acceptedTerms };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    if (user) {
      // En una aplicación real, aquí enviarías un correo con un enlace para restablecer la contraseña
      // Para esta simulación, simplemente devolvemos éxito
      return { success: true };
    } else {
      return { success: false, message: 'No se encontró un usuario con ese correo electrónico' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);






