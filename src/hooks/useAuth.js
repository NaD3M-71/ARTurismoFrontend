export const useAuth = () => {
  const getToken = () => {
    return sessionStorage.getItem('token');
  };

  const getUsuario = () => {
    const usuario = sessionStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  };

  return {
    getToken,
    getUsuario,
    isAuthenticated,
    logout
  };
};
