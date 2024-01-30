import { useEffect, useReducer } from "react";
import { JuegoReducer } from "./reducers/JuegoReducer";
// La ejecutamos fuera porque va a ejecutarse después 
// y no la vamos a ejecutar dentro del propio componente.
// Funcion init se va a encargar de procesar algún dato
// Para asignar solo al estado posteriormente 
// esto sirve cuando sacamos datos del localStorage o hacemos alguna petición Ajax
const init =() =>{
    // Devolvemos unos datos JSON que nos llega del localStorage
    // Parseamos el Objeto JSON 
    // En el caso de que el objeto llegue vacío devuelve un objeto vacío || [];
    return JSON.parse(localStorage.getItem("juegos")) || [];
}

export const MisJuegos = () => {
    
    // init función iniciadora
    
    const [juegos, dispatch]= useReducer(JuegoReducer, [], init)

    useEffect(()=>{
        localStorage.setItem("juegos", JSON.stringify(juegos))
    }, [juegos])

    const conseguirDatosForm= e=>{
        e.preventDefault;

        let juego = {
            id: new Date().getTime(),
            titulo: e.target.titulo.value,
            descripcion: e.target.descripcion.value
        };
        console.log(juego);

        // Lanzar accion, es un objeto que se lo pasamos posteriomente al dispach
        //  el dispach es como "setjuegos" en el useState
        // type para seleccionar el tipo de accion que queremos hacer, revisar JuegoReducer.jsx
        // playload guardar objeto juego
        const accion ={
            type:"crear",
            payload: juego
        }
        dispatch(accion)
        console.log(juegos)
    }
    const borramelo= id =>{
        const action = {
            type:"borrar",
            payload: id
        };

        dispatch(action)
    }

    const editar = (e, id) =>{
        console.log(e.target.value,"editar", id);
        let juego = {
            id,
            titulo: e.target.value,
            descripcion: e.target.value
        };
        const action = {
            type:"editar",
            payload: juego
        };

        dispatch(action)
    }


return (
    <div>
        <h1>Estos son mis videojuegos</h1>
        {/* Número de videojuegos que hemos guardado y que aparecen */}
        <p>Número de videojuegos: {juegos.length}</p>
        <ul>
            {
                // mapeammos el array juegos y mostramos desde la raiz del objeto id, mostramos el titulo juego.titulo
                juegos.map(juego=>(
                    <li key={juego.id}>
                        {juego.titulo}
                        {/* Borrar juego */}
                        &nbsp; <button onClick={ e => borramelo(e, juego.id)}>X</button>
                        <input type="text" onBlur={ e => editar (e, juego.id)} placeholder="Editar"/>
                    </li>
                ))
            }
        </ul>
        <h3>Agergar Juegos</h3>
        <form onSubmit={conseguirDatosForm}> 
            <input type="text" name="titulo" placeholder="titulo" />
            <textarea name="descripcion" placeholder="descripcion" ></textarea>
            <input type="submit" value="Guardar" />
        </form>
    </div>
  )
}
