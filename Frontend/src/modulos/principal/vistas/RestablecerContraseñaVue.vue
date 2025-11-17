<template>
  <div class="RestablecerContraseña-container">

    <div class="RestablecerContraseña-card">
      <img src="../../../assets/sigedd-logo.png" class="RestablecerContraseña" alt="SIGEDD">
      <img src="../../../assets/sigedd-icono.png" class="IconoSigedd" alt="SIGEDD">

      <h2 class="titulo">Restablecer Contraseña</h2>

      <div class="form-group">
        <label>Contraseña Nueva</label>
        <input type="text">
      </div>

      <div class="form-group">
        <label>Confirmar Contraseña</label>
        <input type="password">
      </div>
      
     
        
      <button class="btn-enlace">Confirmar </button>
      
      <a class="VolverInicio">¿Volver a inicio se sesion?</a>
     </div>

   </div>
    </template>

  <script>
  export default {
  name: "LoginView",
  };
  </script>

<style scoped>
  .RestablecerContraseña-container {
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

.RestablecerContraseña-card{
  width: 420px;
  background: white;
  padding: 35px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.18);
  text-align: center;

  position: relative; 
  top: 0;             
}
  .titulo {
  margin-bottom: 25px;
  color: #0f3b77;
  }
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
  .btn-enlace {
  width: 100%;
  background: #0f3b77;
  padding: 10px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  }

  .VolverInicio {
  display: block;
  margin-top: 15px;
  font-size: 0.9em;
  color: #0f3b77;
  cursor: pointer;
  }


.RestablecerContraseña {
  width: 300px;
  margin-bottom: -30px;
}

  .IconoSigedd {
   position: absolute;
  bottom: -200px; /* distancia desde abajo */
  right: -450px;  /* distancia desde la derecha */
  width: 150px;  /* tamaño */
  }
</style>

