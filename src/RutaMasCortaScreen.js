import React, { useState } from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
export const RutaMasCortaScreen = () => {
    const [matriz0, setMatriz0] = useState([]);
    const [matrizP, setMatrizP] = useState([]); //RUTAS
    const [matrizMinima, setmatrizMinima] = useState([]); //Minima

    const transpose = (mat) => {
        for (var i = 0; i < mat.length; i++) {
            for (var j = 0; j < i; j++) {
                const tmp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = tmp;
            }
        }
        return mat;
    }

    const crearSiguienteMatriz = (matrices) => {
        console.log("entra");
        console.log(matrices);
        var dist = matrices;
        var dimension1 = (matriz0.length)-1;//document.getElementById("dimension1Input").value;
        var cantidadElemento = (dimension1 * 1);
        var matrizPVacia = [...Array(cantidadElemento)].map(e => Array(cantidadElemento).fill(0));
        var size = cantidadElemento;
        var matrizP = matrizPVacia;
        for (var k = 0; k < size; k += 1) {
            for (var i = 0; i < size; i += 1) {
                for (var j = 0; j < size; j += 1) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        matrizP[i][j] = k + 1;
                    }
                }
            }
            //   setMatrices(matrices.concat([dist]));
            //   matrices.push([dist]);

        }


        var fila = []
        var abecedary = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (let i = 0; i < matrices.length; i++) {
            fila.push(abecedary[i]);
        }
        fila.unshift("D(0)");
        matrices.unshift(fila);
        for (let x = 1; x < matrices.length; x++) {
            matrices[x].unshift(fila[x]);

        }
        console.log(fila);


        matrizP.unshift(fila);
        for (let x = 1; x < matrizP.length; x++) {
            matrizP[x].unshift(fila[x]);

        }


        setMatrizP(matrizP);
        setmatrizMinima(matrices);
        // console.log(matrices);
        console.log(matrizP);
    };



    // const validaMatrizP=(matriz)=>{

    // }

    // const validaMatrizMinima=(matriz)=>{

    // }

    const MatrizMinima = () => {
        {
            return (
                <tbody>{
                    matrizMinima.map((item, i) => {
                        // {
                        return (
                            <tr key={i}>
                                {item.map((dato, j) => {
                                    if (dato === Infinity || dato === "0") {
                                        if(dato===Infinity){
                                            return (
                                                <td key={i + j} align="center">∞</td>
                                            )
                                        }
                                        else{
                                            return (
                                                <td key={i + j} align="center">0</td>
                                            )
                                        }
                                    }
                                    else {
                                        return (
                                            <td key={i + j} align="center">{dato}</td>
                                        )
                                    }
                                })}
                            </tr>
                        )
                        // }
                    })
                }
                </tbody>
            )

        }
    }

    const MatrizP = () => {
        {
            return (
                <tbody>{
                    matrizP.map((item, i) => {
                        // {
                        return (
                            <tr key={i}>
                                {item.map((dato, j) => {
                                    if (dato === "∞" || dato === "0") {
                                        console.log(dato);
                                        return (
                                            <td key={i + j} align="center">{dato}</td>
                                        )
                                    }
                                    else {
                                        return (
                                            <td key={i + j} align="center">{dato}</td>
                                        )
                                    }
                                })}
                            </tr>
                        )
                        // }
                    })
                }
                </tbody>
            )

        }
    }

    const validaDimensiones = () => {
        var dimension1 = document.getElementById("dimension1Input").value;
        var dimension2 = document.getElementById("dimension2Input").value;
        if (dimension1 < 11 && dimension1 > 0 && dimension2 < 11 && dimension2 > 0) {
            if (dimension1 === dimension2) {
                var cantidadElemento = (dimension1 * 1) + 1;
                // console.log(cantidadElemento);
                var matrizVacia = [...Array(cantidadElemento)].map(e => Array(cantidadElemento).fill("∞"));
                var abecedary = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                for (let i = 0; i < matrizVacia.length; i++) {
                    for (let j = 0; j < matrizVacia.length; j++) {
                        if (i === j && i > 0 && j > 0) {
                            matrizVacia[i][j] = "0";
                        }
                        if (i === 0) {
                            matrizVacia[i][j] = abecedary[j];
                        }
                        if (j === 0) {
                            if (i === 0) {
                                matrizVacia[0][0] = "D(0)";
                            }
                            else {
                                matrizVacia[i][0] = abecedary[i];
                            }
                        }
                    }
                }
                setMatriz0(matrizVacia);
                console.log(matrizVacia);
            }
            else {
                alertify.error('Error. Las dimensiones deben ser cuadradas.');
            }
        }
        else {
            alertify.error('Error. Las dimensiones son incorrectas.');
        }
    }

    const llenaMatriz0 = (i, j, valor) => {
        matriz0[i][j] = valor;
        setMatriz0(matriz0);
    }

    const Matriz0 = () => {
        {
            return (
                <tbody>{
                    matriz0.map((item, i) => {
                        // {
                        return (
                            <tr key={i}>
                                {item.map((dato, j) => {
                                    if (dato === "∞" || dato === "0" || !isNaN(dato)) {
                                        return (
                                            <td key={i + j} align="center"><input style={{ width: "55px", height: "25px" }} type="text" defaultValue={dato} onChange={(e) => { llenaMatriz0(i, j, e.target.value) }} /></td>
                                        )
                                    }
                                    else {
                                        return (
                                            <td key={i + j} align="center">{dato}</td>
                                        )
                                    }
                                })}
                            </tr>
                        )
                        // }
                    })
                }
                </tbody>
            )

        }
    }

    const formatMatriz0 = () => {
        
        var dimension1 = (matriz0.length)-1;
        var cantidadElemento = (dimension1 * 1);
        var matriz0Format = [...Array(cantidadElemento)].map(e => Array(cantidadElemento).fill(null));
        let contai = 0;
        let contaj = 0;
        for (let i = 1; i < matriz0.length; i++) {
            for (let j = 1; j < matriz0.length; j++) {
                if (matriz0[i][j] === "∞") {
                    matriz0Format[contai][contaj] = Infinity;
                }
                else {
                    matriz0Format[contai][contaj] = matriz0[i][j] * 1;
                }
                contaj++;
            }
            contai++;
            contaj = 0;
        }
        // console.log(matriz0Format);
        crearSiguienteMatriz(matriz0Format);
    }

    const guardaMatriz = () => {
        const originalData = matriz0;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(originalData, null)], {
            type: "text/plain"
        }));
        a.setAttribute("download", "data.txt");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // const leerMatrizTxt = () => {
    //     //     var fs = require('fs');
    //     //     fs.readFile(`C:\Users\danie\Documents\matriz.txt`, 'utf8', function(err, data) {
    //     //     if (err) throw err;
    //     //     console.log(data);
    //     // });


    //     // var fs = require('fs');
    //     fs.readFileSync('C:/Users/danie/Documents/matriz.txt', 'utf8', function (err, data) {
    //         if (err) {
    //             return console.log(err);
    //         }
    //         console.log(data);
    //     });
    // }

    const leerMatrizTxt = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result);
          const obj = JSON.parse(text);
        //   setMatriz0(obj);
          console.log(obj);
        //   alert(text)
        };
        reader.readAsText(e.target.files[0])
      }

    return (<div className="container">
        <h1>Rutas más cortas</h1>
        <hr />

        <div className="row">
            <h5>Ingrese las dimensiones: </h5>
            <div className="col-xs-1">
                <input type="number" className="form-control" key="dimension1Input" id="dimension1Input" />
            </div>
            <h5>X</h5>
            <div className="col-xs-1">
                <input type="number" className="form-control" key="dimension2Input" id="dimension2Input" />
            </div>
            <div className="col-xs-1" style={{ marginRight: "3px", }}>
                <button type="button" className="btn btn-success " onClick={validaDimensiones}><i className="fa fa-th-list" margin-right="3"></i> Generar</button>
            </div>
            <div className="col-xs-1" style={{ marginRight: "3px", }}>
                <button type="button" className="btn btn-info" onClick={guardaMatriz}><i className="fa fa-save" ></i> Guardar</button>
            </div>
            <div className="col-xs-1 custom-file" style={{ marginRight: "3px", }}>
            <input type="file" onChange={(e) => leerMatrizTxt(e)} />
            {/* <input type="file" class="form-control-file" id="exampleFormControlFile1"/> */}

            {/* <input type="file" class="form-control-file" id="exampleFormControlFile1"/> */}
                {/* <input type="file" className="btn btn-info" onChange={(e) => showFile(e)}/> */}
                {/* <i className="fa fa-upload" margin-right="3"></i> Cargar */}
            </div>

        </div>
        <p>Matriz D(0): </p>
        <table className="table table-striped table-bordered table-hover">
            <Matriz0 />
        </table>
        <button type="button" className="btn btn-success " onClick={formatMatriz0}><i className="fa fa-list-alt" margin-right="3"></i> Generar Resultados</button>

        <p>Matriz Mínima: </p>
        <table className="table table-striped table-bordered table-hover">
            <MatrizMinima />
        </table>


        <p>Matriz P: </p>
        <table className="table table-striped table-bordered table-hover">
            <MatrizP />
        </table>
    </div>)
}
