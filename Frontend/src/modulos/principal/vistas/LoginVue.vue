<template>
  <div class="login-container">

    <div class="login-card">
      <img src="../../../assets/sigedd-logo.png" class="logo" alt="SIGEDD">
      <img src="../../../assets/sigedd-icono.png" class="IconoSigedd" alt="SIGEDD">

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
  .login-container {
  position: relative; 
  width: 100%;
  height: 100vh;

  background: linear-gradient(
    to bottom,
    #0f3b77 55%,  /* azul fuerte sigedd arriba */
    #d7ecff 55%   /* azul claro sigedd abajo */
  );

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 420px;
  background: white;
  padding: 35px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.18);
  text-align: center;

  position: relative; 
  top: 0;             
}

/* LOGO PRINCIPAL */
.logo {
  width: 300px;
  margin-bottom: -30px;
}

/* TITULO "Iniciar Sesión" */
  .titulo {
  margin-bottom: 25px;
  color: #0f3b77;
  }

/* ESTILO DE LOS CAMPOS */
  .form-group {
  text-align: left;
  margin-bottom: 18px;
  color: #0f3b77;
  }

  input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background: #f4f5f7;
  border-radius: 4px;
  border: none;
  }

/* BOTÓN AZUL */
  .btn-iniciar {
  width: 100%;
  background: #0f3b77;
  padding: 10px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  }

/* ENLACE DE RECUPERAR CONTRASEÑA */
  .olvide {
  display: block;
  margin-top: 15px;
  font-size: 0.9em;
  color: #0f3b77;
  cursor: pointer;
  }

  .IconoSigedd {
   position: absolute;
  bottom: -200px; /* abajo */
  right: -450px;  /* derecha */
  width: 150px;  /* tamaño */
  }
</style>
