<template>
  <div class="login-container">

    <div class="login-card">
      <img src="../../../assets/sigedd-logo.png" class="logo" alt="SIGEDD">

      <h2 class="titulo">Iniciar Sesión</h2>

      <div class="form-group">
        <label>Correo electrónico</label>
        <input type="text">
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input type="password">
      </div>

      <button class="btn-iniciar">Iniciar Sesión</button>

      <a class="olvide">¿Olvidaste tu contraseña?</a>
     </div>




   </div>
</template>

<script>
  export default {
  name: "LoginView",
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
