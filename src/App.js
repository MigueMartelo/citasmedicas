import React, { useState, useEffect, Fragment } from 'react';

const Cita = ({ cita, index, eliminarCita }) => {
  return (
    <div className="card">
      <div className="card-body">
        <p>Nombre Paciente: <span>{cita.nombre}</span></p>
        <p>Cedula: <span>{cita.cedula}</span></p>
        <p>Fecha cita: <span>{cita.fecha}</span></p>
        <p>Hora cita: <span>{cita.hora}</span></p>
        <p>Motivo cita: <span>{cita.motivoCita}</span></p>
        <button className="btn btn-danger" onClick={() => eliminarCita(index)}>
          Borrar cita
        </button>
      </div>
    </div>
  )
}

const Formulario = ({ crearCita }) => {
  
  const stateInicial = {
    nombre: '',
    cedula: '',
    fecha: '',
    hora: '',
    motivoCita: ''
  }

  // cita = state actual
  // guardarCita = fn para cambiar el state
  const [cita, guardarCita] = useState({stateInicial});

  // actualiza el state
  const actualizarState = e => {
    guardarCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  const enviarCita = e => {
    e.preventDefault();   
    
    // pasar la cita hacia el componente principal
    crearCita(cita);

    // reiniciar el state (reiniciar el form)
    guardarCita(stateInicial)
  }

  return (
    <Fragment>
      <h2 className='text-center'>Crear Cita</h2>
      <form onSubmit={enviarCita}>
        <div className='form-group'>
          <label htmlFor='nombre'>Nombre Paciente</label>
          <input
            type='text'
            name='nombre'
            className='form-control'
            placeholder='Nombre del paciente'
            onChange={actualizarState}
            value={cita.nombre}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='cedula'>Cedula Paciente</label>
          <input
            type='text'
            name='cedula'
            className='form-control'
            placeholder='Cedula del paciente'
            onChange={actualizarState}
            value={cita.cedula}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='fecha'>Fecha Cita</label>
          <input
            type='date'
            name='fecha'
            className='form-control'
            placeholder='Fecha Cita'
            onChange={actualizarState}
            value={cita.fecha}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='hora'>Hora Cita</label>
          <input
            type='time'
            name='hora'
            className='form-control'
            placeholder='Hora Cita'
            onChange={actualizarState}
            value={cita.hora}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='motivoCita'>Motivo Cita</label>
          <textarea
            className='form-control'
            name='motivoCita'
            onChange={actualizarState}
            value={cita.motivoCita}
          />
        </div>

        <button className='btn btn-primary btn-block' type='submit'>
          Agregar
        </button>
      </form>
    </Fragment>
  );
};

const App = () => {
  // Cargar citas de localStorage como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  // useState retorna el state y la función que actualiza el state
  const [citas, guardarCita] = useState(citasIniciales);

  // Agregar nuevas citas al state
  const crearCita = cita => {
    // Tomar una copia del state y agregar la nueva cita
    const nuevasCitas = [...citas, cita];

    // Guarda citas en el state
    guardarCita(nuevasCitas);
  }

  // Elimina las citas del state
  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    guardarCita(nuevasCitas);
  }

  useEffect(
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'));

      if (citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas));
      } else {
        localStorage.setItem('citas', JSON.stringify([]));
      }
    }, [citas] )

  // Cargar Condicionalmente un Titulo
  const titulo = Object.keys(citas).length === 0 ? 'No Hay Citas' : 'Administrar Citas Aquí';

  return (
    <Fragment>
      <h1 className='text-center m-5'>Administrador de Pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <Formulario
                  crearCita={crearCita}             
                />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h2 className='text-center'>{titulo}</h2>
                {citas.map((cita, index) => (
                  <Cita
                    key={index}
                    index={index}
                    cita={cita}
                    eliminarCita = {eliminarCita}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
