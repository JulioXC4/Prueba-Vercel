<template>
  <p>Redirecting...</p>
</template>

<script>
import {UserService} from "../../restock/iam/services/user.service.js";

export default {
  name: 'RoleRedirect',
  async created() {
    const userService = new UserService();
    try {
      const user = await userService.getUserById(1);
      const role = user.role_id?.name;

      if (role === 'supplier' || role === 'restaurant') {
        this.$router.replace(`/dashboard/${role}/summary`);
      } else {
        console.error('Rol no reconocido:', role);
        this.$router.replace('/error'); // si creas una ruta de error básica
      }
    } catch (err) {
      console.error('Error al redirigir:', err);
      this.$router.replace('/error'); // sin login, puedes usar una ruta dummy
    }
  }
};
</script>
