<template>
  <div class="contenedor-principal">
    <!-- ENCABEZADO CON LOGO -->
    <div class="encabezado">
      <img
        src="../../../assets/sigedd-logo.png"
        class="logo-sigedd"
        alt="logo"
      />
    </div>

    <!-- TARJETA DE PERFIL DEL VALIDADOR -->
    <div class="perfil-card">
      <div class="perfil-header">
        <div class="avatar">
          <i class="fa fa-clipboard-check"></i>
        </div>
        <div class="perfil-info">
          <h2 class="nombre-usuario">{{ nombreCompleto }}</h2>
          <p class="rol-badge">Validador</p>
          <p class="email">{{ email }}</p>
        </div>
      </div>
    </div>

    <!-- DESCRIPCIÓN DEL ROL -->
    <div class="descripcion-container">
      <h3 class="titulo-seccion">
        <i class="fa fa-info-circle"></i> Tu rol como Validador
      </h3>
      <div class="descripcion-content">
        <p class="descripcion-texto">
          Como <strong>Validador</strong> del sistema SIGEDD, eres responsable
          de revisar y validar la documentación presentada por los docentes. Tus
          responsabilidades incluyen:
        </p>
        <ul class="lista-responsabilidades">
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Revisar documentos enviados por los docentes y verificar su
              autenticidad</span
            >
          </li>
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Aprobar documentos que cumplan con los requisitos y estándares
              establecidos</span
            >
          </li>
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Rechazar documentos que no cumplan con los criterios de
              validación con comentarios claros</span
            >
          </li>
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Revisar constancias de tutoría, horarios de actividades y otros
              documentos institucionales</span
            >
          </li>
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Mantener comunicación con los docentes sobre el estado de sus
              documentos</span
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- ACCESOS RÁPIDOS -->
    <div class="accesos-rapidos">
      <h3 class="titulo-seccion"><i class="fa fa-bolt"></i> Accesos Rápidos</h3>
      <div class="accesos-grid">
        <div class="acceso-card" @click="irAValidar">
          <div class="acceso-icono validar">
            <i class="fa fa-tasks"></i>
          </div>
          <h4>Validar Documentos</h4>
          <p>Revisa y valida documentos pendientes de aprobación</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getNombreCompleto, getUsuarioFromStorage } from "@/utils/auth";

// Datos del usuario
const nombreCompleto = ref("Usuario");
const email = ref("");

const router = useRouter();

onMounted(() => {
  nombreCompleto.value = getNombreCompleto();

  const usuario = getUsuarioFromStorage();
  if (usuario) {
    email.value = usuario.correoUsuario;
  }
});

const irAValidar = () => {
  router.push("/administrativovalidar");
};
</script>

<style scoped>
:global(:root) {
  --azul-oscuro: #0f3b75;
  --azul-claro: #d9eaf7;
  --verde: #4caf50;
  --texto-oscuro: #1a1a1a;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* FONDO GENERAL */
.contenedor-principal {
  min-height: 100vh;
  background-color: var(--azul-claro);
  padding: 40px;
  margin-left: 280px; /* Espacio para el sidebar */
  font-family: var(--font-family);
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .contenedor-principal {
    margin-left: 0;
    padding: 20px;
  }
}

/* ENCABEZADO */
.encabezado {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo-sigedd {
  width: 240px;
}

/* TARJETA DE PERFIL */
.perfil-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.perfil-header {
  display: flex;
  align-items: center;
  gap: 25px;
}

.avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #0f3b75 0%, #1a5fb4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.perfil-info {
  flex: 1;
}

.nombre-usuario {
  font-size: 2rem;
  margin: 0 0 10px 0;
  color: var(--azul-oscuro);
  font-weight: 600;
}

.rol-badge {
  display: inline-block;
  background: linear-gradient(135deg, #0f3b75 0%, #1a5fb4 100%);
  color: white;
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.email {
  color: #666;
  font-size: 1rem;
  margin: 5px 0 0 0;
}

/* DESCRIPCIÓN */
.descripcion-container {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.titulo-seccion {
  color: var(--azul-oscuro);
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.titulo-seccion i {
  color: #1a5fb4;
}

.descripcion-content {
  line-height: 1.8;
}

.descripcion-texto {
  color: var(--texto-oscuro);
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.lista-responsabilidades {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-responsabilidades li {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;
  color: var(--texto-oscuro);
  font-size: 1rem;
}

.lista-responsabilidades i {
  color: var(--verde);
  font-size: 1.2rem;
  margin-top: 3px;
  flex-shrink: 0;
}

/* ACCESOS RÁPIDOS */
.accesos-rapidos {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.accesos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.acceso-card {
  background: linear-gradient(135deg, #d9eaf7 0%, #c4dff0 100%);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.acceso-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(15, 59, 117, 0.3);
  border-color: #0f3b75;
}

.acceso-icono {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.acceso-icono.validar {
  background: linear-gradient(135deg, #0f3b75 0%, #1a5fb4 100%);
}

.acceso-card h4 {
  color: var(--azul-oscuro);
  margin: 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.acceso-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .logo-sigedd {
    width: 250px;
  }

  .perfil-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }

  .nombre-usuario {
    font-size: 1.5rem;
  }

  .accesos-grid {
    grid-template-columns: 1fr;
  }
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.perfil-card,
.descripcion-container,
.accesos-rapidos {
  animation: fadeIn 0.5s ease forwards;
}

.perfil-card {
  animation-delay: 0.1s;
}

.descripcion-container {
  animation-delay: 0.2s;
}

.accesos-rapidos {
  animation-delay: 0.3s;
}
</style>
