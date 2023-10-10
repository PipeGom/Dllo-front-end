import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Inicializa el estado del usuario como nulo
  }),
  actions: {
    // Define acciones para cargar y actualizar la información del usuario
    setUser(User) {
      this.user = User;
    },
  },
  getters: {
    // Define getters para acceder al estado del usuario desde otros componentes
    getUser() {
      return this.user;
    },
  },
});
