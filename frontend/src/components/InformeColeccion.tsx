//importo la librería de informes
import MaterialTable, { Column } from "@material-table/core";
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";

//Creo la interfaz para los tipos de los campos (field) de la tabla.
interface Products {
    nombre:string;
    marca:string;
    tipo:string;
    precio:number;
}

//Creamos un array de products
interface ProductsArray {
    data : Products[] //data es una variable que nosotros llamamos, da un poco igual
}

function InfromeColeccion({data}:ProductsArray){
    const datos = data //para hacerlo mas comodo llamamos a otra variable que se usa internamente
//Creación de los datos que corresponde con la base de datos nuestra:
    const col: Array<Column<Products>> = [
        { title: "Nombre", field: "nombre", filtering:false},
        { title: "Marca", field: "marca", filtering:true}, //solo estas columnas se pueden filtar
        { title: "Tipo", field: "tipo", filtering:true }, //las que tengan filtering:true
        //para que no se pueda filtrar las demas columnas se pone la condición contraria
        { title: "Precio", field: "precio", type: "numeric", filtering:false}
    ];

// --> definición de los datos de la tabla
    //es un map para que recorra toda la base de datos seleccionada
    const tableData = datos.map((row) => ({
        nombre:row.nombre, marca:row.marca, tipo:row.tipo, precio:row.precio
    }))

    /*Para mostrar los datos en la tabla uso el componente <MaterialTable/> de la librería @material-table/core,
    pasándole como props: columns y data. A columns le doy el valor de la variable col que definí antes
    y a data le doy el valor de la variable tableData*/
    return (
        <MaterialTable
            columns={col}
            data={tableData}
            renderSummaryRow={({ column, data }) =>
                column.field === "precio"
                    ? {
                        value: data.reduce((agg, row) => agg + row.precio, 0),
                        style: { background: "red" },
                    }
                    : undefined
            }
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
                columnsButton:true,
                filtering:true,

            }}
        />
    )
}
export default InfromeColeccion;