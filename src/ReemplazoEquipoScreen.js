import React, { useState } from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
export const ReemplazoEquipoScreen = () => {
    const [values, setValues] = useState([]);
    const [matriz0, setMatriz0] = useState([]);
    // const [datosObjeto1, setDatosObjeto1] = useState([]);
    const [resultadoMatriz, setresultadoMatriz] = useState([]);



    // var datosObjeto =[]; //[[500], [30, 40, 60], [400, 300, 250]]


    function sumarMantenimientos(n, datosObjeto) {
        let cont = 0;
        let res = 0;
        while (cont < n) {
            res += datosObjeto[1][cont];
            cont++;
        }
        return res;
    }


    function calcularCtx(t, x, datosObjeto) {
        let compra = datosObjeto[0][0];
        let mantenimientos = sumarMantenimientos(x - t, datosObjeto);
        let venta = datosObjeto[2][x - t - 1];
        let res = compra + mantenimientos - venta;
        return res

    }

    function obtenerMinimo(lista) {
        let minimo = lista[0][0];
        let pos = 0;
        for (let i = 1; i < lista.length; i++) {
            if (lista[i][0] < minimo) {
                minimo = lista[i][0];
                pos = i;
            }
        }
        return lista[pos]
    }



    function calcularGt(plazo, vidaUtil, datosObjeto) {
        console.log(plazo, vidaUtil, "PEPA");
        let resParciales = []; //resultados parciales
        let resTemporales = [];
        let contadorT = plazo;
        let contAnnos = 1;
        resParciales.push([0]); //agregar G(t) trivial
        contadorT -= 1;
        while (contadorT >= 0) { // calcular cada G(t)


            while (contAnnos <= vidaUtil) { // calcular cada Ctx del Gt
                // console.log("Calculando G: ",contadorT)
                let t = contadorT;
                let x = (contadorT + contAnnos);
                console.log(t, x)
                if (t > plazo || x > plazo) { // si el t se hace mayor al plazo sale 
                    break;
                }
                let resCtx = calcularCtx(t, x, datosObjeto);
                // console.log("plazo - x:",plazo - x)
                let gAnterior = resParciales[plazo - x][0];
                resTemporales.push([resCtx + gAnterior, x]);

                contAnnos++;
                // x++;
            }
            // console.log(resTemporales)
            // break;
            let minimo = resTemporales[0];
            if (resTemporales.length > 1) {
                minimo = obtenerMinimo(resTemporales); // obtener lista minima
            }
            resParciales.push(minimo);
            console.log(resParciales)
            // break;
            resTemporales = [];
            contAnnos = 1;
            contadorT -= 1;

        }
        return resParciales

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
                                    if (j > 0) {
                                        if (dato === "∞" || dato === "0" || !isNaN(dato)) {
                                            return (
                                                <td key={i + j} align="center"><input style={{ width: "55px", height: "25px" }} type="text" defaultValue={dato} onChange={(e) => { llenaMatriz0(i, j, e.target.value) }} /></td>
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

    const validaDimensiones = () => {
        var dimension1 = document.getElementById("vidaUtilInput").value;
        if (dimension1 < 31 && dimension1 > 0) {
            var cantidadElemento = (dimension1 * 1);
            // console.log(cantidadElemento);
            var matrizVacia = [...Array(cantidadElemento)].map(e => Array(3).fill(0));
            // var abecedary = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            for (let i = 0; i < matrizVacia.length; i++) {
                for (let j = 0; j < matrizVacia.length; j++) {
                    if (j === 0) {
                        matrizVacia[i][0] = (i) + 1;
                    }
                }
            }
            setMatriz0(matrizVacia);
            // console.log(matrizVacia);
        }
        else {
            alertify.error('Error. Los años deben ser entre 1 a 30.');
        }
    }

    const obtenerResultado = () => {
        const costo = document.getElementById("costoInicialInput").value;
        const vidaUtil = document.getElementById("vidaUtilInput").value;
        const anno = document.getElementById("annosInput").value;
        // console.log(costo);
        // console.log(vidaUtil);
        // console.log(anno);
        // console.log(matriz0);
        var mantenimientoArray = [];
        var ventaArray = [];
        for (let index = 0; index < matriz0.length; index++) {
            mantenimientoArray.push((matriz0[index][1]) * 1);
            ventaArray.push((matriz0[index][2]) * 1);
        }
        let datos = [[(costo) * 1], mantenimientoArray, ventaArray];
        let resultado = calcularGt(anno * 1, vidaUtil * 1, datos);
        var resultadoArray = resultado.reverse();
        for (let index = 0; index < resultadoArray.length; index++) {
            resultadoArray[index].unshift(index);
        }
        setresultadoMatriz(resultadoArray);
    }

    const guardaMatriz = () => {
        const originalData = matriz0;
        const costo = document.getElementById("costoInicialInput").value;
        const vidaUtil = document.getElementById("vidaUtilInput").value;
        const anno = document.getElementById("annosInput").value;

        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify({ costo: costo, vidaUtil: vidaUtil, anno: anno, matriz: originalData }, null)], {
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
            setMatriz0(obj.matriz);
            document.getElementById("costoInicialInput").value=obj.costo;
            document.getElementById("vidaUtilInput").value=obj.vidaUtil;
            document.getElementById("annosInput").value=obj.anno;
            console.log(obj);
            //   alert(text)
        };
        reader.readAsText(e.target.files[0])
    }

    const MatrizFinal = () => {
        {
            return (
                <tbody>{
                    resultadoMatriz.map((item, i) => {
                        // {
                        return (
                            <tr key={i}>
                                {item.map((dato, j) => {
                                    // if (j > 0) {
                                    //     if (dato === "∞" || dato === "0" || !isNaN(dato)) {
                                    //         return (
                                    //             <td key={i + j} align="center">{dato}</td>
                                    //         )
                                    //     }
                                    // }
                                    // else {
                                    return (
                                        <td key={i + j} align="center">{dato}</td>
                                    )
                                    // }
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

    return (<div className="container">
        <h1>Problema del reemplazo de equipo</h1>
        <hr />
        <div className="row">
            <div className="col-xs-1">
                <label>Costo inicial del equipo</label>
                <input type="number" className="form-control" id="costoInicialInput" placeholder="Costo" />
            </div>

            <div className="col-xs-1">
                <label>Vida útil del equipo</label>
                <input type="number" className="form-control" id="vidaUtilInput" placeholder="Agregue" />
            </div>
        </div>
        <div className="row">
            <div className="col-xs-1" >
                <label>Plazo del proyecto (Años)</label>
                <input type="number" className="form-control" id="annosInput" placeholder="Agregue" />
            </div>

            <div className="col-xs-1" style={{ paddingTop: "2.8%", }}>
                <button type="button" className="btn btn-success " onClick={validaDimensiones}><i className="fa fa-th-list" margin-right="3"></i> Generar</button>
                <button type="button" className="btn btn-info" onClick={guardaMatriz}><i className="fa fa-save" ></i> Guardar</button>
            </div>
        </div>
        <div className="row">
            <input type="file" onChange={(e) => leerMatrizTxt(e)} />
        </div>

        <p>Llene los datos: </p>
        <table className="table table-striped table-bordered table-hover">
            <thead>
                {/* <th> */}
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
                {/* </th> */}
            </thead>
            <Matriz0 />
        </table>

        <div className="col-xs-1" style={{ paddingTop: "2.8%", }}>
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
        </table>
    </div>
    )
}
