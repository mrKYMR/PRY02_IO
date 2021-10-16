import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const clickHandle = () => {
  alertify.alert('Alerta', 'El programa solicitado no está disponible.', function () {
    // alertify.success('Ok'); 
    cerrarMenu();
  });
}

const cerrarMenu =()=>{
  document.getElementById("menuX").click();
}
export const NavBar = () => {
  return (
    <Fragment>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
          <div className="container">
            <a className="navbar-brand">
              <img src="https://www.ddpfrance.fr/wp-content/uploads/2017/12/cropped-favicon_4_DDP-1.png" alt="" width="55px" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink exact activeClassName="active" className="nav-item nav-link" to="/" align="center">Proyecto 00</NavLink>
                </li>
                {/* <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-item nav-link" to="/cliente" align="center">Ruta más Corta</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-item nav-link" to="/proveedor" align="center">Problema de la Mochila</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-item nav-link" to="/inventario" align="center">Reemplazo de Equipos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-item nav-link" to="/venta" align="center">Arboles Binarios de Búsqueda Óptimos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-item nav-link" to="/venta" align="center">Series Deportivas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-item nav-link" to="/venta" align="center">Multiplicación de Matrices</NavLink>
              </li> */}
                {/* <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-item nav-link" to="/venta" align="center">Salir</NavLink>
              </li> */}
              </ul>
            </div>

          </div>


        </nav>
        {/* <div className="separador"> */}
        <div className="b-nav">
          {/* <li><a className="b-link" href="https://github.com/mblode/burger" target="_blank">GitHub - burger</a></li>
              <li><a className="b-link" href="https://github.com/mblode" target="_blank">Github - mblode</a></li>
              <li><a className="b-link" href="https://codepen.io/mblode/" target="_blank">CodePen</a></li>
              <li><a className="b-link" href="https://dribbble.com/mblode" target="_blank">Dribbble</a></li> */}



          <li>
            <NavLink exact activeClassName="active" className="b-link nav-link" to="/rutamascorta" onClick={cerrarMenu}  data-toggle="tooltip" data-placement="right" title="El algoritmo de la ruta más corta consiste, en una modalidad de problemas de redes, en la cual se debe determinar el plan de rutas que genere la trayectoria con la mínima distancia total, que una un nodo fuente con un nodo destino, sin importar el número de nodos que existan entre estos.">Ruta más Corta</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" className="b-link nav-link" to="/ProblemaMochilaScreen" onClick={cerrarMenu} data-toggle="tooltip" data-placement="right" title="Es un algoritmo de optimización combinatoria, es decir, que busca la mejor solución entre un conjunto finito de posibles soluciones a un problema.">Problema de la Mochila</NavLink>
          </li>
          <li >
            <NavLink exact activeClassName="active" className="b-link nav-link" to="/ReemplazoEquipoScreen" onClick={cerrarMenu} data-toggle="tooltip" data-placement="right" title="Es un algoritmo que nos permite buscar la forma optima del cambio de equipos que estan sujetos a falla, perdida de eficienta o desgaste.">Reemplazo de Equipos</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" className="b-link nav-link" to="/SerieDeportivaScreen" onClick={cerrarMenu} data-toggle="tooltip" data-placement="right" title="Algoritmo que determina la máxima probabilidad de gane ante 2 equipos.">Series Deportivas</NavLink>
          </li>
          <li >
            <NavLink exact activeClassName="active" className="b-link nav-link" to="/venta" onClick={clickHandle} data-toggle="tooltip" data-placement="right" title="Es un algoritmo donde podemos construir un árbol binario de búsqueda óptimo, donde el coste medio de buscar un elemento se reduce al mínimo.">Arboles Binarios de Búsqueda Óptimos</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" className="b-link nav-link" to="/venta" onClick={clickHandle} data-toggle="tooltip" data-placement="right" title="Algoritmo que muestra una matris resultado a partir de la multiplicacion de 2 matrices.">Multiplicación de Matrices</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" className="b-link nav-link" to="/" onClick={cerrarMenu}  data-toggle="tooltip" data-placement="right" title="Opcion que regresa a la página principal.">Salir</NavLink>
          </li>



        </div>
        <div className="b-container">
          <div className="b-menu" id="menuX">
            <div className="b-bun b-bun--top"></div>
            <div className="b-bun b-bun--mid"></div>
            <div className="b-bun b-bun--bottom"></div>
          </div>
          {/* <a href="#" className="b-brand">Menu</a> */}
        </div>
        {/* </div> */}
              
      </div>
    </Fragment>

  )
}
