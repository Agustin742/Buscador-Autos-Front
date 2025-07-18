import React, { useState } from 'react';
import './App.css';


function App() {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [kmMax, setKmMax] = useState('');
  const [estado, setEstado] = useState('');
  const [provincia, setProvincia] = useState('');
  const [combustible, setCombustible] = useState('');
  const [transmision, setTransmision] = useState('');
  const [color, setColor] = useState('');
  const [puertas, setPuertas] = useState('');
  const [dueno, setDueno] = useState('');
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(false);

  const manejarBusqueda = async () => {
    setLoading(true);
    setAutos([]);

    // Query con filtros
    const params = new URLSearchParams();
    if (marca) params.append("marca", marca);
    if (modelo) params.append("modelo", modelo);
    params.append("fuentes", "todas");
    if (anio) params.append("anio", anio);
    if (precioMin) params.append("precio_min", precioMin);
    if (precioMax) params.append("precio_max", precioMax);
    if (kmMax) params.append("km_max", kmMax);
    if (estado) params.append("estado", estado);
    if (provincia) params.append("provincia", provincia);
    if (combustible) params.append("combustible", combustible);
    if (transmision) params.append("transmision", transmision);
    if (color) params.append("color", color);
    if (puertas) params.append("puertas", puertas);
    if (dueno) params.append("dueno", dueno);

    try {
      const resp = await fetch (
        `http://127.0.0.1:8000/api/autos?${params.toString()}`
      );
      const data = await resp.json();
      console.log("Respuesta de la API: ", data);
      console.log("Respuesta de la API autos: ", data.autos);
      setAutos(Array.isArray(data.autos) ? data.autos : []);
    } catch (error) {
      alert("Hubo un error al buscar autos. Intenta de nuevo.")
      setAutos([]);
    }
    setLoading(false);
  };

  return (
    <div className="main-container">
      <h1>Buscador de Autos</h1>
      <div className="busqueda-principal">
        <h2>Busqueda principal</h2>
        <label>
            Marca
          <input
          type="text"
          placeholder="Marca (ej: Toyota)"
          value={marca}
          onChange={e => setMarca(e.target.value)}
        />
        </label>

        <label>
          Modelo
        <input
          type="text"
          placeholder="Modelo (ej: Corolla)"
          value={modelo}
          onChange={e => setModelo(e.target.value)}
        />
        </label>
      </div>

      <div className="filters-section">
      <input
      type = "number"
      placeholder='Año desde'
      value={anio}
      onChange={e => setAnio(e.target.value)}
      />

      <input
      type="number"
      placeholder="Precio mínimo"
      value={precioMin}
      onChange={ e => setPrecioMin(e.target.value)}
      />

      <input
      type="number"
      placeholder="Precio máximo"
      value={precioMax}
      onChange={ e => setPrecioMax(e.target.value)}
      />

      <input
      type="number"
      placeholder="Kilometros máximos"
      value={kmMax}
      onChange={ e => setKmMax(e.target.value)}
      />

      <select value={estado} onChange= {e => setEstado(e.target.value)}>
        <option value="">Estado</option>
        <option value="nuevo">Nuevo</option>
        <option value="usado">Usado</option>
      </select>

      <select value={provincia} onChange={e => setProvincia(e.target.value)}>
        <option value="">Provincia</option>
        <option value="Buenos Aires">Buenos Aires</option>
        <option value="CABA">CABA</option>
        <option value="Catamarca">Catamarca</option>
        <option value="Chaco">Chaco</option>
        <option value="Chubut">Chubut</option>
        <option value="Córdoba">Córdoba</option>
        <option value="Corrientes">Corrientes</option>
        <option value="Entre Ríos">Entre Ríos</option>
        <option value="Formosa">Formosa</option>
        <option value="Jujuy">Jujuy</option>
        <option value="La Pampa">La Pampa</option>
        <option value="La Rioja">La Rioja</option>
        <option value="Mendoza">Mendoza</option>
        <option value="Misiones">Misiones</option>
        <option value="Neuquén">Neuquén</option>
        <option value="Río Negro">Río Negro</option>
        <option value="Salta">Salta</option>
        <option value="San Juan">San Juan</option>
        <option value="San Luis">San Luis</option>
        <option value="Santa Cruz">Santa Cruz</option>
        <option value="Santa Fe">Santa Fe</option>
        <option value="Santiago del Estero">Santiago del Estero</option>
        <option value="Tierra del Fuego">Tierra del Fuego</option>
        <option value="Tucumán">Tucumán</option>
      </select>

      <br />
      <button onClick={manejarBusqueda}>Buscar</button>
      </div>

      <div className="resultados-section">
        {loading ? (
          <p>Cargando autos...</p>
        ) : autos.length === 0 ? (
          <p>No hay resultados aún.</p>
        ) : (
          <div className="autos-grid">
            {autos.map(auto => (
              <div key={auto.link || auto.id} className="auto-card">
                <img src={auto.foto} alt={auto.titulo} />
                <h3>{auto.titulo}</h3>
                <p>Precio: {auto.precio}</p>
                <p>Kilómetros: {auto.km}</p>
                <p>Ubicación: {auto.ubicacion}</p>
                {auto.estado && <p>Estado: {auto.estado}</p>}
                <a href={auto.link} target="_blank" rel="noopener noreferrer">
                  Ver publicación original
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>  
  );
}

export default App;