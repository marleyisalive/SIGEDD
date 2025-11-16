<template>
  <nav class="sidebar bg-light">
    <div class="sidebar-content">
      <h6 class="sidebar-heading">Panel de administración</h6>

      <a class="sidebar-link" href="#">
        <i class="fas fa-tachometer-alt me-2"></i>
        Panel principal
      </a>

      <h6 class="sidebar-heading mt-4">Modulos</h6>

      <a class="sidebar-link" href="#">
        <i class="fas fa-columns me-2"></i>
        Layouts
      </a>

      <a class="sidebar-link" href="#">
        <i class="fas fa-cog me-2"></i>
        Configuración
      </a>

      <a class="sidebar-link" href="#">
        <i class="fas fa-users me-2"></i>
        Usuarios
      </a>

      <a class="sidebar-link" href="#">
        <i class="fas fa-file-alt me-2"></i>
        Reportes
      </a>
    </div>

    <div class="sidebar-footer">
      <small class="text-muted">Logged in as:</small><br />
      Start Bootstrap
    </div>
  </nav>
</template>

<script setup lang="ts">
// No necesitas lógica para un sidebar estático.
// Aquí puedes agregar props o eventos si luego lo haces dinámico.
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem 0;
  overflow-y: auto;
  border-right: 1px solid #ddd;
}

.sidebar-content {
  padding: 0 1rem;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  color: #333;
  text-decoration: none;
  border-radius: 0.25rem;
}

.sidebar-link:hover {
  background-color: #e9ecef;
}

.sidebar-footer {
  margin-top: auto;
  padding: 1rem;
  font-size: 0.85rem;
  text-align: center;
  border-top: 1px solid #ddd;
  color: #555;
}
</style>
