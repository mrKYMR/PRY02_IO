import React, { useState } from 'react';
// import { useForm } from './hooks/useForm';
// import axios from 'axios';

export const ProblemaMochilaScreen = () => {
    const [values, setValues] = useState([]);
    const [verdes, setVerdes] = useState([]);
    const [rojos, setRojos] = useState([]); 
    const [posFinales, setposFinales] = useState([]);

    function esPosicion(lista,x,j){
        let datos;
        for (let i=0; i<lista.length; i++) {
          datos = lista [i]
          if(datos[0] === x && datos[1] === j) return true;
        }
        return false
      }

    function mochila10(pesoMaximo, pesos, valores){
        let values = [];
        let rojos = [];
        let verdes =[];
        let resultado = [];
        values = pesos.map(v => Array.from({length:  pesoMaximo+1}, () => 0));
        for (let i=1; i<pesos.length; i++) {
            for (let j=1; j<=pesoMaximo; j++){
                if (i===1) {
                    if (j>=pesos[i]) values[i][j] = valores[i];
                } else if (j<pesos[i]) {
                    values[i][j] = values[i-1][j];
                } else {
                    values[i][j] = Math.max(values[i-1][j], valores[i] + values[i-1][j-pesos[i]]);
                }
                if(values[i-1][j-1] === values[i][j]){
                  rojos.push([i,j]);
                }
                else {
                  verdes.push([i,j]);
                }
            }
        } 
        let objetos = [];
        let posFinales = [];
        let j = pesoMaximo;
        for (let i=pesos.length-1; i>0; i--){
            if (values[i][j] !== values[i-1][j] && values[i][j] === values[i-1][j-pesos[i]] + valores[i]){
              posFinales.push([i,j])
                objetos.push(i);
                j -= pesos[i];
            }
        }


//         let matrizConColores=[]
//   matrizConColores = pesos.map(v => Array.from({length:  pesoMaximo+1}, () => 0));
//     for (let i=1; i<pesos.length; i++) {
//       for (let j=1; j<=pesoMaximo; j++){
//         if(i ===1 && j ===1){
//           matrizConColores[i][j] = (values[i][j]).toString() +","+"r"
//         }
//         if(values[i-1][j-1] === values[i][j]  || values[i][j] === 0 ){
//           matrizConColores[i][j] = (values[i][j]).toString() +","+"r"
//           // rojos.push([i,j]);
//         }
//         else {
//           // verdes.push([i,j]);
//           matrizConColores[i][j] = (values[i][j]).toString() +","+"v"
//         }

//       }
//     }
let matrizConColores=[]
matrizConColores = pesos.map(v => Array.from({length:  pesoMaximo+1}, () => 0));
  for (let i=1; i<pesos.length; i++) {
    for (let j=1; j<=pesoMaximo; j++){
      if(i ===1 && j ===1){
        if(esPosicion(posFinales,i,j)){
          matrizConColores[i][j] = (values[i][j]).toString() +","+"r"+",f"
        }
        else{matrizConColores[i][j] = (values[i][j]).toString() +","+"r"}
      }
      if(values[i-1][j-1] === values[i][j]  || values[i][j] === 0 ){
        if(esPosicion(posFinales,i,j)){
          matrizConColores[i][j] = (values[i][j]).toString() +","+"r"+",f"
        }
        else{matrizConColores[i][j] = (values[i][j]).toString() +","+"r"}
        // rojos.push([i,j]);
      }
      else {
        if(esPosicion(posFinales,i,j)){
          matrizConColores[i][j] = (values[i][j]).toString() +","+"v"+",f"
        }
        // verdes.push([i,j]);
        else{matrizConColores[i][j] = (values[i][j]).toString() +","+"v"}
      }

    }

  }

        setValues(matrizConColores);
        setVerdes(verdes);
        setRojos(rojos);
        setposFinales(posFinales);
        resultado.push([values])
        resultado.push([verdes])
        resultado.push([rojos])
        resultado.push([posFinales])
        console.log(resultado);
        return resultado;
    }
    
    //   mochila10(8,[0,5,3,4,1],[0,10,9,5,15])


    const creaMatriz=()=>{
        var capacidadMochila = document.getElementById("capacidadMochila").value;

        var pesosInput = document.getElementById("pesosInput").value;
        pesosInput="0,"+pesosInput
        var valoresInput = document.getElementById("valoresInput").value;
        valoresInput="0,"+valoresInput;
        // pesosInput=pesosInput.split(",");
        // valoresInput=valoresInput.split(",");
        var peso = pesosInput.split(',').map(function(item) {
            return parseInt(item, 10);
        });
        var valor = valoresInput.split(',').map(function(item) {
            return parseInt(item, 10);
        });
        capacidadMochila=capacidadMochila*1;
        console.log(capacidadMochila);
        console.log(peso);
        console.log(valor);
        mochila10(capacidadMochila,peso,valor);
    }

    const MatrizColor=()=>{
        {
            return (
                <tbody>{
                    values.map((item, i) => {
                        return (
                            <tr key={i}>
                                {item.map((dato, j) => {
                                    var datoSplit=(dato.toString()).split(",");
                                    if(datoSplit.length>1){
                                        if(datoSplit[1]=="v"){
                                            return (
                                                        <td key={i + j} align="center" style={{backgroundColor:"green"}}>{datoSplit[0]}</td>
                                                    )
                                        }
                                        else{
                                            return (
                                                <td key={i + j} align="center" style={{backgroundColor:"red"}}>{datoSplit[0]}</td>
                                            )
                                        }
                                    }
                                    // if (dato.split(",") !== 0) {

                                    // }
                                    // else {
                                    //     return (
                                    //         <td key={i + j} align="center">{dato}</td>
                                    //     )
                                    // }
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
            )

        }
    };  
      const MatrizFinal=()=>{
        {
            return (
                <tbody>{
                    values.map((item, i) => {
                        return (
                            <tr key={i}>
                                {item.map((dato, j) => {
                                    var datoSplit=(dato.toString()).split(",");
                                    if(datoSplit.length>1){
                                        if(datoSplit[2]=="f"){
                                            return (
                                                        <td key={i + j} align="center" style={{backgroundColor:"blue"}}>{datoSplit[0]}</td>
                                                    )
                                        }
                                        // if(datoSplit[2]=="f"){
                                        //     return (
                                        //                 <td key={i + j} align="center" style={{backgroundColor:"blue"}}>{datoSplit[0]}</td>
                                        //             )
                                        // }
                                        else{
                                            return (
                                                <td key={i + j} align="center" >{datoSplit[0]}</td>
                                            )
                                        }
                                    }
                                    // if (dato.split(",") !== 0) {

                                    // }
                                    // else {
                                    //     return (
                                    //         <td key={i + j} align="center">{dato}</td>
                                    //     )
                                    // }
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
            )

        }
    };
    return (<div className="container">
        <h1>Problema de la mochila</h1>
        <hr />
        <div className="row">
            {/* <div className="col-xs-1">
                <input type="number" className="form-control" key="dimension1Input" id="dimension1Input" placeholder="Capacidad de mochila"/>
            </div>
            <div className="col-xs-10">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div> */}
            <div className="col-xs-1">
                <label>Capacidad de mochila</label>
                <input type="number" className="form-control" id="capacidadMochila" placeholder="Capacidad" />
            </div>
            <div className="col-xs-11" style={{ width: "75%", }}>
                <label>Ingrese los pesos separados por comas (,)</label>
                <input type="text" className="form-control" id="pesosInput" placeholder="Agregue" />
            </div>
            <div className="col-xs-11" style={{ width: "75%", }}>
                <label>Ingrese los valores separados por comas (,)</label>
                <input type="text" className="form-control" id="valoresInput" placeholder="Agregue" />
            </div>
            <div className="col-xs-1" style={{ paddingTop: "2.8%", }}>
                <button type="button" className="btn btn-success " onClick={creaMatriz}><i className="fa fa-th-list" margin-right="3"></i> Generar</button>
            </div>
        </div>

        <p>Matriz de colores: </p>
        <table className="table table-striped table-bordered table-hover">
            <MatrizColor />
        </table>

        <p>Matriz resultado final: </p>
        <table className="table table-striped table-bordered table-hover">
            <MatrizFinal />
        </table>
    </div>
    )
}
