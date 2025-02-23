import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext); 
};

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    try {
      return savedToken ? JSON.parse(savedToken) : null; 
    } catch (error) {
      console.error('Error parsing token:', error);
      return null; 
    }
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null; 
    } catch (error) {
      console.error('Error parsing user:', error);
      return null; 
    }
  });

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
  }, [token, user]);

  const register = async (nombre, apellido, email, password) => {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario registrado correctamente');
        return { success: true };
      } else {
        return { success: false, message: data.message || data.error || 'Error desconocido' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); 
        setUser(data.user);
        console.log('Token recibido:', data.token);
        return { success: true }; 
      } else {
        return { success: false, message: data.message || data.error || 'Error desconocido' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setToken(null); 
    setUser(null); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/perfil', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); 
        return { success: true, user: data };
      } else {
        return { success: false, message: 'Error al obtener el perfil.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateUserProfile = async (updatedData) => {
    if (!token) {
      return { success: false, message: 'Token no disponible. Inicia sesión.' };
    }

    try {
      const response = await fetch('http://localhost:3000/usuarios/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
       
        setUser(data);
        return { success: true, user: data };
      } else {
        return { success: false, message: data.message || 'Error al actualizar perfil.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    token,
    user,
    register,
    login,
    logout,
    fetchUserProfile,
    updateUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;

