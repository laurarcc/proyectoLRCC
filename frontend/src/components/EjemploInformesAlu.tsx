import React from "react";
//importo la librería de informes
import MaterialTable, { Column } from "@material-table/core";
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";

//Creo la interfaz para los tipos de los campos (field) de la tabla.
//La tabla tendrá los campos firstName: string, lastName: string, birthYear: number
interface IPerson {
    firstName: string;
    lastName: string;
    birthYear: number;
}


function EjemploInforme(){
//Creación de los datos de prueba:
// --> definición de las columnas de la tabla
    //Para cada elemento que queremos mostrar tendremos el title y el field
    //Será un array del tipo Column (tipo de material-table-core que importamos arriba) cuyos
    //elementos son del tipo IPerson que definimos nosotros.
    //El title contendrá el título de la columna de la tabla que es lo que veremos en la interfaz
    //El field contendrá el nombre que le damos a ese campo en la tabla
    //Por ejemplo: tendremos una columna con el title Nombre cuyo campo se llamará firstName
    //Podemos indicar también el type y decir que es numérico, como en el caso del año nacimiento
    const col: Array<Column<IPerson>> = [
        { title: "Nombre", field: "firstName"},
        { title: "Apellido", field: "lastName" },
        { title: "Año nacimiento", field: "birthYear", type: "numeric" }
    ];

// --> definición de los datos de la tabla
    //Datos que se van a mostrar en la tabla para el informe: aquí hemos puesto tres filas de la tabla,
    //pero podemos poner tantas como queramos o necesitemos
    //En una aplicación real estos datos vendrían de una consulta a la base de datos
    const tableData = [
        { firstName: "Jorge", lastName: "Rodríguez", birthYear: 1987 },
        { firstName: "Lucrecia", lastName: "Pérez", birthYear: 2000 },
        { firstName: "Rocío", lastName: "Pérez", birthYear: 2000 }
    ];

    /*Para mostrar los datos en la tabla uso el componente <MaterialTable/> de la librería @material-table/core,
    pasándole como props: columns y data. A columns le doy el valor de la variable col que definí antes
    y a data le doy el valor de la variable tableData*/
    return (
        <MaterialTable
            columns={col}
            data={tableData}
            options={{
                exportMenu:[
                    {
                        label: "Export PDF",
                        exportFunc:(cols, datas) => ExportPdf(cols,datas, "myPdfFileName")
                    },{
                    label:"Export CSV",
                        exportFunc:(cols, datas)=>ExportCsv(cols,datas,"myCsvFileName")
                    },
                ],
            }}
        />
    )
}
export default EjemploInforme