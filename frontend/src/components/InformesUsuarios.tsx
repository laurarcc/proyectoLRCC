import MaterialTable, {Column} from "@material-table/core";
import {ExportCsv, ExportPdf} from "@material-table/exporters";

interface Users{
    nombre:string
    login:string
    password:string
    rol:string
}

interface UsersArray{
    data:Users[]
}

function InformesUsuarios({data}:UsersArray){
    const dat = data
    const columnas: Array<Column<Users>> = [
        { title: "Nombre", field: "nombre", filtering:true}, //solo se pueden filtrar las columnas del nombre
        { title: "Login", field: "login", filtering:false}, //no se pueden filtar
        { title: "Constraseña", field: "password", filtering:false}, //no se pueden filtar
        //para que no se pueda filtrar las demas columnas se pone la condición contraria
        { title: "Rol", field: "rol", filtering:false} //no se pueden filtar
    ];

    const tableUsuarios= dat.map((indice) => ({
nombre:indice.nombre, login:indice.login, password:indice.password, rol:indice.rol
    }))

    return(
        <MaterialTable
            title="Usuarios"
            columns={columnas}
            data={tableUsuarios}
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

                columnsButton:true, //para poder elegir que columnas quiere mostrar el usuario
                filtering:true, //para que se pueda filtrar la tabla

            }}
        />

    )
}
export default InformesUsuarios