<template>
  <div class="login-container">

    <div class="login-card">
      <img src="../../../assets/sigedd-logo.png" class="logo" alt="SIGEDD">

      <h2 class="titulo">Iniciar Sesión</h2>

      <div class="form-group">
        <label>Correo electrónico</label>
        <input type="text" v-model="email" placeholder="correo@itculiacan.edu.mx">
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="password" placeholder="********">
      </div>

      <button class="btn-iniciar" @click="iniciarSesion">Iniciar Sesión</button>
      <p v-if="error" style="color:crimson; margin-top:8px">{{ error }}</p>

      <!-- Bootstrap modal para notificaciones importantes -->
      <div
        class="modal fade"
        id="loginAlertModal"
        tabindex="-1"
        aria-hidden="true"
        ref="loginAlertModal"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modalTitle }}</h5>
              <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>{{ modalBody }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="hideModal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>

      <a class="olvide">¿Olvidaste tu contraseña?</a>
     </div>




   </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false,
      modalTitle: "Atención",
      modalBody: "",
    };
  },
  methods: {
    async iniciarSesion() {
      this.error = "";
      if (!this.email || !this.password) {
        this.error = "Ingresa correo y contraseña.";
        return;
      }

      try {
        this.loading = true;
        // Llamar al endpoint de autenticación (POST /api/auth/login)
        const res = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correoUsuario: this.email, contrasena: this.password }),
        });

        const body = await res.json();
        if (!res.ok) {
          // Mostrar pop-up tipo modal para errores de negocio (403)
          if (res.status === 403) {
            this.showModal("Atención", body?.error || "Acceso denegado");
            return;
          }

          // Errores de credenciales u otros muestran mensaje inline
          this.error = body?.error || "Credenciales inválidas.";
          return;
        }

        const usuario = body.usuario;
        const token = body.token;

        if (!usuario || !token) {
          this.error = "Respuesta inválida del servidor.";
          return;
        }

        // Guardar token y usuario en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Redirección según rol: 1=Administrador, 2=Docente, 3=Validador
        if (usuario.idRol === 1) {
          this.$router.push({ path: "/" });
        } else if (usuario.idRol === 2) {
          this.$router.push({ path: "/DocentesP" });
        } else if (usuario.idRol === 3) {
          this.$router.push({ path: "/AdministrativoP" });
        } else {
          this.$router.push({ path: "/inicio" });
        }
      } catch (err) {
        console.error(err);
        // Mostrar mensaje más útil para depuración local
        this.error = "No fue posible iniciar sesión. Comprueba backend (ver consola).";
      } finally {
        this.loading = false;
      }
    },
    showModal(title, body) {
      this.modalTitle = title || "Atención";
      this.modalBody = body || "";
      // Usar el Modal de bootstrap si está disponible
      try {
        const modalEl = this.$refs.loginAlertModal;
        if (modalEl && window.bootstrap && window.bootstrap.Modal) {
          const bsModal = new window.bootstrap.Modal(modalEl);
          bsModal.show();
          // Guardar instancia para cerrarlo desde hideModal
          this._bsModal = bsModal;
          return;
        }
      } catch (e) {
        console.error("Error mostrando modal bootstrap:", e);
      }
      // Fallback: usar alert simple
      alert(body || title || "Atención");
    },
    hideModal() {
      try {
        if (this._bsModal) {
          this._bsModal.hide();
          this._bsModal = null;
        } else {
          const modalEl = this.$refs.loginAlertModal;
          if (modalEl && modalEl.classList.contains("show")) {
            modalEl.classList.remove("show");
            modalEl.style.display = "none";
          }
        }
      } catch (e) {
        console.error("Error ocultando modal:", e);
      }
    },
  },
};
</script>

<style scoped>
  /* Contenedor principal sin scroll */
  .login-container {
    width: 100%;
    height: 100vh;
    overflow: hidden; /* 🔥 evita el scroll */

    background: linear-gradient(
      to bottom,
      #0f3b77 55%, 
      #d7ecff 55%
    );

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px; /* 🔥 da margen para que no pegue el card */
  }

  /* Card más pequeña */
  .login-card {
    width: 360px; /* 🔥 antes 420px */
    background: white;
    padding: 28px 32px; /* 🔥 más compacto */
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.18);
    text-align: center;
  }

  /* Logo más pequeño */
  .logo {
    width: 240px; /* 🔥 antes 300px */
    margin-bottom: -20px;
  }

  /* Título */
  .titulo {
    margin-bottom: 20px;
    color: #0f3b77;
  }

  /* Inputs */
  .form-group {
    text-align: left;
    margin-bottom: 16px;
    color: #0f3b77;
  }

  input {
    width: 100%;
    padding: 9px;
    margin-top: 5px;
    background: #f4f5f7;
    border-radius: 4px;
    border: none;
  }

  /* Botón */
  .btn-iniciar {
    width: 100%;
    background: #0f3b77;
    padding: 10px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-top: 8px;
  }

  /* Olvidé mi contraseña */
  .olvide {
    display: block;
    margin-top: 14px;
    font-size: 0.9em;
    color: #0f3b77;
    cursor: pointer;
  }
</style>
