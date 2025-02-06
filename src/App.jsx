import { useState, useEffect } from "react";
import "./index.css";
import { BoxTal } from "./assets/abilitybox.jsx";
import { Types } from "./assets/poketype.jsx";

function App() {
  const [pokename, setPokename] = useState("Charizard");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // fetch de la API
  const pokeFetch = async (name) => {
    try {
      setError(null);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    pokeFetch(pokename);
  }, []);

  if (!data) {
    return <div>cargando y tal...</div>;
  }

  // convertir la primera letra del nombre del pokémon en mayúscula
  const nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  return (
    <>
      <div className="flex justify-center md:mt-20 m-5 ">
        <div className="rounded-md flex flex-col p-6 bg-gray-200/20 w-135">
          {/* Barra de busqueda*/}
          <div className="w-full flex mb-4 relative">
            <input
              type="text"
              placeholder=" Inserte un pokemon"
              value={pokename}
              onChange={(e) => setPokename(e.target.value)}
              className=" border-2 border-blue-400 bg-white w-full rounded-sm pl-2"
            />
            <div
              className="group absolute right-22 md:right-24 top-1.5"
              onClick={() => setIsVisible(!isVisible)}
            >
              <img
                src="https://www.svgrepo.com/show/59321/information-icon.svg"
                alt="info"
                className="w-5 h-5 cursor-pointer group-hover:text-blue-500 opacity-30"
              />

              <span
                className={`absolute left-1/2 top-10 w-40 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg transition-all duration-150 
                  ${isVisible ? "scale-100" : "scale-0"} group-hover:scale-100`}
              >
                Ejemplo: Greninja, Gardevoir, Darkrai, Mewtwo, etc.
              </span>
            </div>

            <button
              className="bg-blue-500 w-25 h-8 rounded-sm text-white ml-2 buttontal transition duration-300 ease-in-out hover:bg-blue-600 hover:cursor-pointer"
              onClick={() => pokeFetch(pokename)}
            >
              Ver
            </button>
          </div>
          {error && (
            <div className="text-white bg-red-500 flex justify-center p-2 rounded-md mb-4 fadeIns">
              ¡Nombre incorrecto!
            </div>
          )}
          {/*Imagen, nombre y tipo del pokémon*/}
          <div className="md:flex">
            <div className="min-w-55">
              <img
                src={data.sprites.front_default}
                alt="imgPokemon"
                className="pixelart w-full"
              />
              <p className="text-white font-semibold mt-1 mb-2 text-2xl">
                {nombre}
              </p>
              <div
                className={`grid ${
                  data.types.length == 2 ? "grid-cols-2" : "grid-cols-1"
                } place-items-center mb-6`}
              >
                {data.types.map((tipo) => (
                  <Types tipo={tipo.type.name}></Types>
                ))}
              </div>
            </div>
            {/* Habilidades del pokémon*/}
            <div className="grid grid-cols-2 gap-4 md:max-h-20 md:m-4">
              <h2 className="text-white font-semibold col-span-2">
                Habilidades
              </h2>
              {data.abilities.map((skill) => (
                <BoxTal name={skill.ability.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
