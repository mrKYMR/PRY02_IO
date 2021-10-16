import React, { useState } from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
export const SerieDeportivaScreen = () => {
    const [values, setValues] = useState([]);
    const [matriz0, setMatriz0] = useState([]);
    // const [datosObjeto1, setDatosObjeto1] = useState([]);
    const [resultadoMatriz, setresultadoMatriz] = useState([]);





    function correrSeriesDeportivas(cantJuegos, ph, pr, formatoJuego) {
        console.log(cantJuegos);
        console.log(ph);
        console.log(pr);
        console.log(formatoJuego);
        cantJuegos = dimensionesJuegos(cantJuegos);

        var resMatrix = generarMatriz(cantJuegos + 1);
        resMatrix = matrizCeros(resMatrix, cantJuegos + 1);
        resMatrix = llenarUnos(resMatrix, 0, 1, cantJuegos + 1);
        var p;
        var q;
        var formula;
        for (var i = 1; i < cantJuegos + 1; i++) {
            for (var j = 1; j < cantJuegos + 1; j++) {
                if (esJuegoCasa(i, j, cantJuegos + 1, formatoJuego)) {
                    p = ph;
                    q = 1 - ph;
                } else {
                    p = pr;
                    q = 1 - pr;
                }
                formula = p * resMatrix[i - 1][j] + q * resMatrix[i][j - 1];
                resMatrix[i][j] = formula.toFixed(4);
            }
        }


        return resMatrix;
    }

    function matrizCeros(matriz, numeroDeJuegos) {
        for (var i = 0; i < numeroDeJuegos; i++) {
            for (var j = 0; j < numeroDeJuegos; j++) {
                matriz[i][j] = 0;
            }
        }
        return matriz;
    }


    function llenarUnos(matriz, fila, columna, numeroDeJuegos) {
        for (var i = columna; i < numeroDeJuegos; i++) {
            matriz[fila][i] = 1.0000;
        }
        return matriz;
    }


    function dimensionesJuegos(numeroDeJuegos) {
        if (numeroDeJuegos % 2 === 0) {
            return numeroDeJuegos / 2;       //PAR
        }
        else {
            return numeroDeJuegos / 2 + 0.5; //IMPAR
        }
    }

    function esJuegoCasa(fila, columna, numeroDeJuegos, formatoJuego) {
        var juego = (numeroDeJuegos - 1 - fila) + (numeroDeJuegos - 1 - columna) + 1;
        if (formatoJuego[juego - 1] === 1) {
            return true;
        }
        return false;
    }


    function generarMatriz(dimension) {
        var nuevoArray = new Array(dimension);
        for (var i = 0; i < dimension; i++) {
            nuevoArray[i] = new Array(dimension);
        }
        return nuevoArray;
    }




    console.log()


    const getResultado = () => {

        const cantidadJuegoInput = document.getElementById("cantidadJuegoInput").value;
        const phInput = document.getElementById("phInput").value;
        const prInput = document.getElementById("prInput").value;
        const formatoInput = document.getElementById("formatoInput").value;
        const data = formatoInput.split(",").map(x => parseInt(x));


        // var formatoInput = a.split(",");
        // for (var i = 0; i < res.length; i++) {
        //     res[i] = parseInt(res[i], 10);
        // }


        const resultado = correrSeriesDeportivas(cantidadJuegoInput * 1, phInput * 1, prInput * 1, data);
        setMatriz0(resultado);
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

                                        return (
                                            <td key={i + j} align="center">{dato}</td>
                                        )
                                    
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




    const guardaMatriz = () => {
        const cantidadJuegoInput = document.getElementById("cantidadJuegoInput").value;
        const phInput = document.getElementById("phInput").value;
        const prInput = document.getElementById("prInput").value;
        const formatoInput = document.getElementById("formatoInput").value;

        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify({ cantidadJuegoInput: cantidadJuegoInput, phInput: phInput, prInput: prInput, formatoInput: formatoInput }, null)], {
            type: "text/plain"
        }));
        a.setAttribute("download", "data.txt");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const leerMatrizTxt = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result);
            const obj = JSON.parse(text);
            // setMatriz0(obj.matriz);
            document.getElementById("cantidadJuegoInput").value = obj.cantidadJuegoInput;
            document.getElementById("phInput").value = obj.phInput;
            document.getElementById("prInput").value = obj.prInput;
            document.getElementById("formatoInput").value = obj.formatoInput;
            console.log(obj);
            //   alert(text)
        };
        reader.readAsText(e.target.files[0])
    }



    return (<div className="container">
        <h1>Problema de series deportivas</h1>
        <hr />
        <div className="row">
            <div className="col-xs-1">
                <label>Cantidad de juegos</label>
                <input type="number" className="form-control" id="cantidadJuegoInput" placeholder="Cantidad de juegos" />
            </div>

            <div className="col-xs-1">
                <label>PH</label>
                <input type="number" className="form-control" id="phInput" placeholder="Agregue PH" />
            </div>
        </div>
        <div className="row">
            <div className="col-xs-1" >
                <label>PR</label>
                <input type="number" className="form-control" id="prInput" placeholder="Agregue PR" />
            </div>
            <div className="col-xs-5" >
                <label htmlFor="formatoInput">Separado por comas</label>
                <input type="text" className="form-control" id="formatoInput" placeholder="Agregue el formato del juego" style={{ width: "100%", }} />
            </div>
        </div>
        <div className="row">
            <div className="col-xs-3" style={{ paddingTop: "2.8%", }}>
                <button type="button" className="btn btn-success " onClick={getResultado}><i className="fa fa-th-list" margin-right="3"></i> Generar Resultados</button>
                <button type="button" className="btn btn-info" onClick={guardaMatriz}><i className="fa fa-save" ></i> Guardar</button>
            </div>

        </div>
        <div className="row">
            <input type="file" onChange={(e) => leerMatrizTxt(e)} />
        </div>

        <p>Resultado: </p>
        <table className="table table-striped table-bordered table-hover">
            {/* <thead>
                <tr>
                    <th align="center" style={{
                        textAlign: "center", backgroundColor: "#343a40",
                        color: "white",
                    }}>Año</th>
                    <th align="center" style={{
                        textAlign: "center", backgroundColor: "#343a40",
                        color: "white",
                    }}>Mantenimiento</th>
                    <th align="center" style={{
                        textAlign: "center", backgroundColor: "#343a40",
                        color: "white",
                    }}>Venta</th>
                </tr>
            </thead> */}
            <Matriz0 />
        </table>

        {/* <div className="col-xs-1" style={{ paddingTop: "2.8%", }}>
            <button type="button" className="btn btn-success " onClick={obtenerResultado}><i className="fa fa-th-list" margin-right="3"></i> Generar Resultado</button>
        </div>
        <p>Matriz resultado final: </p>
        <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th align="center" style={{
                        textAlign: "center", backgroundColor: "#343a40",
                        color: "white",
                    }}>t</th>
                    <th align="center" style={{
                        textAlign: "center", backgroundColor: "#343a40",
                        color: "white",
                    }}>G(t)</th>
                    <th align="center" style={{
                        textAlign: "center", backgroundColor: "#343a40",
                        color: "white",
                    }}>Próximo</th>
                </tr>
            </thead>
            <MatrizFinal />
        </table> */}
    </div>
    )
}
