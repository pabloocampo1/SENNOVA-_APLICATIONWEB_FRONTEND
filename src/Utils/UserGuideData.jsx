export const helpContent = [
    {
        id: "introduccion",
        title: "Introducción al Sistema",
        icon: "info",
        content:
            "Bienvenido al LIMS. Este sistema gestiona el flujo completo de su laboratorio...",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1768835427/zkkvt7b4qhzboywgxnpe.jpg",
        steps: [
            "Inicie sesión con sus credenciales o Google.",
            "Revise el dashboard para ver tareas pendientes.",
        ],
    },

    // AUTH MAIN FUNCTION
    {
        id: "recuperar-tu-contraseña",
        title: "Recuperar contraseña",
        icon: "inventory",
        content: "Pasos para recuperar tu contraseña.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770587069/acb96084-0ff4-48d6-8b19-067be0b158f1.png",
        steps: [
            'Vaya a la página principal y seleccione la opción "Iniciar sesión".',
            'En la pantalla de inicio de sesión, presione la opción "¿Olvidaste tu contraseña?".',
            "Digite el correo electrónico con el cual fue creada su cuenta en el sistema.",
            "Recibirá un enlace en su correo electrónico para restablecer su contraseña.",
        ],
    },
    {
        id: "cambiar-contraseña-dentro-del-sistema",
        title: "Cambiar contraseña",
        icon: "science",
        content: "Pasos para cambiar la contraseña dentro del sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770587939/79db9e17-8ffa-4fb3-b2cf-7f23044b508d.png",
        steps: [
            "Diríjase a la sección de Configuraciones.",
            'Haga clic en el botón "Cambiar contraseña".',
            "Ingrese su contraseña actual y la nueva contraseña.",
            "Si el cambio se realiza correctamente, la ventana se cerrará automáticamente.",
        ],
    },
    {
        id: "cambiar-email-dentro-del-sistema",
        title: "Cambiar correo electrónico de la cuenta",
        icon: "science",
        content:
            "Pasos para cambiar el correo electrónico asociado a la cuenta.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770587939/79db9e17-8ffa-4fb3-b2cf-7f23044b508d.png",
        steps: [
            "Diríjase a la sección de Configuraciones.",
            'Haga clic en el botón "Cambiar correo electrónico".',
            "Ingrese el nuevo correo electrónico.",
            "Si el correo es válido y la solicitud se procesa correctamente, deberá ingresar el código enviado al nuevo correo. Una vez validado, el correo será actualizado.",
        ],
    },
    {
        id: "cerrar-sesion",
        title: "Cerrar sesión",
        icon: "logout",
        content: "Pasos para cerrar sesión de forma segura en el sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770589488/9069c2b7-d79b-4bc0-92c9-4be8cfee8e7f.png",
        steps: [
            "Diríjase a la parte superior derecha de la pantalla.",
            "Haga clic sobre el ícono de perfil del usuario.",
            'Seleccione la opción "Cerrar sesión".',
            "El sistema finalizará la sesión actual y lo redirigirá a la pantalla de inicio de sesión.",
        ],
    },

    // USER MANAGMENT
    {
        id: "crear-usuario",
        title: "Crear nuevo usuario",
        icon: "person_add",
        content: "Pasos para registrar un nuevo usuario dentro del sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770589130/89a40432-9874-4c85-a725-838d39a31527.png",
        steps: [
            'Diríjase al módulo "Gestión de clientes y usuarios".',
            'Haga clic en el botón "Nuevo usuario" ubicado en la parte superior derecha.',
            "Complete los campos obligatorios: nombre, número de cédula, teléfono, correo electrónico, cargo y rol en el sistema.",
            "Opcionalmente, cargue una imagen de perfil para el usuario.",
            "Verifique que la información ingresada sea correcta.",
            'Presione el botón "Crear usuario" para finalizar el registro.',
            "El usuario creado podra ingresar por el correo asignado o por credenciales con su numero de cedula.",
        ],
    },
    {
        id: "editar-usuario",
        title: "Editar usuario",
        icon: "edit",
        content: "Pasos para modificar la información de un usuario existente.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770589107/67e66eb1-0561-405d-a54b-68718c9323b2.png",
        steps: [
            'Diríjase al módulo "Gestión de clientes y usuarios".',
            "Ubique el usuario que desea modificar.",
            "Haga clic en el ícono de editar (lápiz).",
            "Actualice los campos necesarios, como datos personales, cargo o rol.",
            "Si cambia el rol del usuario, tenga en cuenta que la sesión se cerrará automáticamente.",
            'Presione el botón "Editar usuario" para guardar los cambios.',
        ],
    },
    {
        id: "eliminar-usuario",
        title: "Eliminar usuario",
        icon: "delete",
        content: "Pasos para eliminar un usuario del sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770589130/89a40432-9874-4c85-a725-838d39a31527.png",
        steps: [
            'Diríjase al módulo "Gestión de clientes y usuarios".',
            "Ubique el usuario que desea eliminar.",
            "Haga clic en el ícono de eliminar (papelera).",
            "Confirme la acción en la ventana emergente.",
            "Una vez confirmado, el usuario será eliminado del sistema.",
        ],
    },

    // inventario de equipos

    {
        id: "inventario-equipos",
        title: "Inventario de equipos",
        icon: "inventory",
        content:
            "Vista general del inventario de equipos registrados en el sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770590208/470deef0-2b58-40f7-9d21-b2ce1510370b.png",
        steps: [
            'Diríjase al módulo "Inventario equipos" desde el menú lateral.',
            "Visualice el resumen de equipos registrados, activos, reportados y en mantenimiento.",
            "Utilice el campo de búsqueda para encontrar equipos por nombre u otros criterios.",
            "Revise el listado de equipos con su información principal y estado actual.",
        ],
    },
    {
        id: "crear-equipo",
        title: "Crear nuevo equipo",
        icon: "add",
        content: "Pasos para registrar un nuevo equipo en el inventario.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770590208/470deef0-2b58-40f7-9d21-b2ce1510370b.png",
        steps: [
            'Diríjase al módulo "Inventario equipos".',
            'Haga clic en el botón "Agregar un nuevo equipo".',
            "Complete los campos obligatorios como código interno, nombre del equipo, número de serie, estado, ubicación y uso.",
            "Ingrese información adicional como marca, modelo, fechas de adquisición y mantenimiento.",
            "Verifique que los datos ingresados sean correctos.",
            'Presione el botón "Guardar" para registrar el equipo en el sistema.',
        ],
    },
    {
        id: "editar-equipo",
        title: "Editar equipo",
        icon: "edit",
        content: "Pasos para modificar la información de un equipo registrado.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770590208/470deef0-2b58-40f7-9d21-b2ce1510370b.png",
        steps: [
            'Diríjase al módulo "Inventario equipos".',
            "Ubique el equipo que desea modificar en el listado.",
            "Haga clic en el ícono de editar (lápiz).",
            "Actualice la información necesaria del equipo.",
            "Revise los cambios realizados.",
            'Presione el botón "Guardar" para actualizar la información.',
        ],
    },
    {
        id: "ver-informacion-equipo",
        title: "Información del equipo",
        icon: "info",
        content:
            "Permite visualizar la información detallada de un equipo registrado en el inventario.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770590208/470deef0-2b58-40f7-9d21-b2ce1510370b.png",
        steps: [
            'Diríjase al módulo "Inventario equipos" desde el menú lateral.',
            "Ubique el equipo deseado en el listado de equipos.",
            "Haga clic en el botón de ver información del equipo.",
            "Visualice los datos de identificación como código interno, ubicación, estado y costo.",
            "Consulte las especificaciones técnicas del equipo.",
            "Revise la imagen, descripción y notas asociadas al equipo.",
        ],
    },

    {
        id: "eliminar-equipo",
        title: "Eliminar equipo",
        icon: "delete",
        content: "Pasos para eliminar un equipo del inventario.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770590208/470deef0-2b58-40f7-9d21-b2ce1510370b.png",
        steps: [
            'Diríjase al módulo "Inventario equipos".',
            "Ubique el equipo que desea eliminar.",
            "Haga clic en el ícono de eliminar (papelera).",
            "Confirme la acción en la ventana emergente.",
            "Una vez confirmado, el equipo será eliminado del inventario.",
        ],
    },
    {
        id: "equipos-reportados",
        title: "Equipos reportados",
        icon: "warning",
        content:
            "Permite consultar todos los equipos que han sido reportados dentro del sistema para su seguimiento y gestión.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770593327/577c19ee-91e7-4841-bcaa-2766a06b28b1.png",
        steps: [
            'Diríjase al módulo "Inventario equipos" desde el menú lateral.',
            'Seleccione la opción "Equipos reportados".',
            "Visualice el listado de equipos que han sido reportados.",
            "Revise la información del equipo como estado, ubicación y fecha de reporte.",
            "Utilice las opciones disponibles para gestionar o dar seguimiento al equipo reportado.",
        ],
    },
    {
        id: "chequeo-inventario",
        title: "Chequeo de inventario",
        icon: "checklist",
        content:
            "Permite verificar y validar los equipos registrados en el inventario, ya sea de forma individual o agrupados por ubicación.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770593302/6867e04a-5c7e-478d-b035-8bc70f6955be.png",
        steps: [
            'Diríjase al módulo "Inventario equipos" desde el menú lateral.',
            'Seleccione la opción "Chequeo de inventario".',
            "Elija el método de verificación que desea utilizar.",
            'Seleccione "De manera individual" para buscar un equipo por nombre, código interno o placa SENA.',
            "Opcionalmente, utilice el escáner de código de barras para identificar el equipo.",
            'Seleccione "Por ubicación" para visualizar los equipos agrupados según su ubicación.',
            "Revise el estado y la información de cada equipo durante el proceso de verificación.",
        ],
    },

    {
        id: "registro-prestamo-uso",
        title: "Registro de préstamo y uso",
        icon: "loan",
        content:
            "Permite registrar los préstamos y usos asignados a un equipo para controlar su disponibilidad.",
        image: "URL_DE_LA_IMAGEN_REGISTRO_PRESTAMO",
        steps: [
            "Acceda a la información del equipo desde el listado de equipos.",
            'Haga clic en el botón "Préstamo".',
            "Seleccione el responsable del préstamo o uso del equipo.",
            "Indique las fechas correspondientes al préstamo o periodo de uso.",
            "Registre observaciones si aplica.",
            "Guarde la información para actualizar el estado del equipo.",
        ],
    },
    {
        id: "registro-mantenimiento-equipo",
        title: "Registro de mantenimiento",
        icon: "maintenance",
        content:
            "Permite registrar y gestionar los mantenimientos realizados o programados para un equipo.",
        image: "URL_DE_LA_IMAGEN_REGISTRO_MANTENIMIENTO",
        steps: [
            "Acceda a la información del equipo desde el listado de equipos.",
            'Haga clic en el botón "Mantenimiento".',
            "Registre el tipo de mantenimiento realizado o programado.",
            "Indique la fecha del mantenimiento y la próxima fecha programada.",
            "Agregue observaciones o detalles relevantes del mantenimiento.",
            "Guarde la información para actualizar el historial del equipo.",
        ],
    },

    {
        id: "descargar-inventario-equipos",
        title: "Descargar inventario de equipos",
        icon: "download",
        content:
            "Pasos para descargar el inventario de equipos en formato Excel.",
        image: "URL_DE_LA_IMAGEN_DESCARGAR_INVENTARIO",
        steps: [
            'Diríjase al módulo "Inventario equipos".',
            'Haga clic en el botón "Exportar excel".',
            "El sistema generará automáticamente el archivo con el inventario de equipos.",
            "Guarde el archivo en su equipo para su posterior consulta.",
        ],
    },

    // INVENTORY REAGENT

    {
        id: "inventario-reactivos",
        title: "Inventario de reactivos",
        icon: "science",
        content:
            "Vista general del inventario de reactivos registrados en el sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770594336/794cfdf4-9bc2-4f7d-941d-c36e86ec64ee.png  ",
        steps: [
            'Diríjase al módulo "Inventario reactivos" desde el menú lateral.',
            "Visualice el resumen de reactivos registrados, disponibles y vencidos.",
            "Utilice el campo de búsqueda para encontrar reactivos por nombre, lote u otros criterios.",
            "Revise el listado de reactivos con su información principal y estado actual.",
        ],
    },
    {
        id: "ver-informacion-reactivo",
        title: "Información del reactivo",
        icon: "info",
        content:
            "Permite visualizar la información detallada de un reactivo registrado en el inventario.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770594336/794cfdf4-9bc2-4f7d-941d-c36e86ec64ee.png",
        steps: [
            'Acceda al módulo "Inventario reactivos".',
            "Ubique el reactivo deseado en el listado.",
            "Haga clic en el botón de ver información del reactivo.",
            "Visualice los datos generales como nombre, lote, proveedor y ubicación.",
            "Consulte fechas de adquisición y vencimiento.",
            "Revise la descripción, concentración y observaciones del reactivo.",
        ],
    },
    {
        id: "registro-entrada-reactivo",
        title: "Registro  de reactivos",
        icon: "add",
        content:
            "Permite registrar el ingreso de nuevos reactivos al inventario.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770594336/794cfdf4-9bc2-4f7d-941d-c36e86ec64ee.png",
        steps: [
            'Ingrese al módulo "Inventario reactivos".',
            "Haga clic en el botón para agregar un nuevo reactivo.",
            "Complete la información requerida como nombre, lote y cantidad.",
            "Indique la fecha de adquisición y fecha de vencimiento.",
            "Asigne la ubicación correspondiente del reactivo.",
            "Guarde la información para registrar el reactivo en el inventario.",
        ],
    },
    {
        id: "editar-reactivo",
        title: "Editar reactivo",
        icon: "edit",
        content:
            "Permite modificar la información de un reactivo previamente registrado en el inventario.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770594336/794cfdf4-9bc2-4f7d-941d-c36e86ec64ee.png",
        steps: [
            'Diríjase al módulo "Inventario reactivos" desde el menú lateral.',
            "Ubique el reactivo que desea modificar en el listado.",
            "Haga clic en el botón de editar reactivo.",
            "Actualice la información necesaria como nombre, lote, cantidad, ubicación o fechas.",
            "Verifique que los datos ingresados sean correctos.",
            "Guarde los cambios para actualizar la información del reactivo.",
        ],
    },
    {
        id: "eliminar-reactivo",
        title: "Eliminar reactivo",
        icon: "delete",
        content:
            "Permite eliminar un reactivo del inventario cuando ya no se encuentra disponible o fue registrado por error.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770594336/794cfdf4-9bc2-4f7d-941d-c36e86ec64ee.png",
        steps: [
            'Acceda al módulo "Inventario reactivos".',
            "Localice el reactivo que desea eliminar en el listado.",
            "Haga clic en el botón de eliminar reactivo.",
            "Confirme la acción en el mensaje de advertencia.",
            "El sistema eliminará el reactivo del inventario y actualizará el listado.",
        ],
    },

    {
        id: "registro-salida-reactivo",
        title: "Registro de uso de reactivos",
        icon: "remove",
        content:
            "Permite registrar el uso de reactivos para control de consumo.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770594363/37838428-a611-4778-9a14-2328dcc44f14.png",
        steps: [
            "Acceda a la información del reactivo desde el inventario.",
            "Seleccione la opción de registrar  uso.",
            "Indique la cantidad utilizada del reactivo.",
            "Seleccione el responsable asociado.",
            "Agregue observaciones si es necesario.",
            "Guarde la información para actualizar el stock del reactivo.",
        ],
    },
    {
        id: "descargar-inventario-reactivos",
        title: "Descargar inventario de reactivos",
        icon: "download",
        content:
            "Permite descargar el inventario de reactivos en formato digital.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770594336/794cfdf4-9bc2-4f7d-941d-c36e86ec64ee.png",
        steps: [
            'Acceda al módulo "Inventario reactivos".',
            "Haga clic en el botón de descarga del inventario.",
            "Seleccione el formato disponible (por ejemplo, Excel).",
            "Descargue el archivo con la información actualizada de los reactivos.",
        ],
    },

    // COTIZACIONES
    {
        id: "gestion-cotizaciones-ensayo",
        title: "Gestión de cotizaciones de ensayo",
        icon: "science",
        content:
            "En este módulo el usuario administrador puede visualizar todas las cotizaciones de ensayo recibidas en el sistema, revisar su información detallada y decidir si acepta o rechaza cada cotización. Además, permite crear nuevas cotizaciones de ensayo desde cero.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770595489/47ce4836-4ea8-4db4-b574-2d1d7110322a.png",
        steps: [
            "Acceda al módulo 'Cotizaciones de ensayo' desde el menú lateral del sistema.",
            "Visualice el listado de cotizaciones registradas, donde se indica su estado actual (pendiente, aceptada o rechazada).",
            "Revise la información principal de cada cotización, como el cliente, el precio total estimado y la fecha.",
            "Consulte el detalle de las muestras y análisis asociados a la cotización.",
            "Decida si la cotización debe ser aceptada o rechazada según la información revisada.",
            "Utilice el botón 'Crear ensayo' para generar una nueva cotización de ensayo vacía.",
        ],
    },
    {
        id: "aceptar-cotizacion-ensayo",
        title: "Aceptar cotización de ensayo",
        icon: "check_circle",
        content:
            "Esta opción permite al usuario administrador revisar una cotización de ensayo y aceptarla formalmente, enviando una respuesta al cliente y asignando un usuario responsable dentro del sistema para la gestión de la solicitud.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770596530/3a6fdbb0-84ad-4652-aba9-bdcefc9a16ac.png",
        steps: [
            "Desde el módulo 'Cotizaciones de ensayo', haga clic sobre la cotización que desea revisar.",
            "Revise la información del cliente asociada a la cotización.",
            "Verifique las muestras registradas y los análisis solicitados.",
            "Si la información es correcta, seleccione la opción 'Aceptar cotización'.",
            "El sistema abrirá un modal para registrar un mensaje o indicaciones dirigidas al cliente.",
            "Ingrese el mensaje que será enviado al cliente junto con la aceptación de la cotización.",
            "Asigne un usuario del sistema como responsable de la solicitud de ensayo.",
            "Confirme la acción para enviar la respuesta al cliente y finalizar el proceso de aceptación.",
        ],
    },
    {
        id: "rechazar-cotizacion-ensayo",
        title: "Rechazar cotización de ensayo",
        icon: "cancel",
        content:
            "Esta opción permite al usuario administrador rechazar una cotización de ensayo cuando no cumple con los criterios definidos, cerrando el proceso de forma inmediata.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770596467/afc23fe5-4d3b-456c-9c99-8bf9ba78f58a.png",
        steps: [
            "Desde el módulo 'Cotizaciones de ensayo', haga clic sobre la cotización que desea gestionar.",
            "Seleccione la opción 'Rechazar cotización'.",
            "El sistema cambiará el estado de la cotización a 'Rechazada'.",
        ],
    },
    {
        id: "crear-cotizacion-ensayo",
        title: "Crear cotización de ensayo",
        icon: "add",
        content:
            "Esta opción permite al usuario administrador crear una nueva cotización de ensayo sin información previa, para registrar manualmente una solicitud desde el sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770595983/90474f62-98f8-4469-86f5-a748b42d53d2.png",
        steps: [
            "Desde el módulo 'Cotizaciones de ensayo', haga clic en el botón 'Crear ensayo'.",
            "El sistema abrirá un formulario de cotización vacío.",
            "Ingrese la información del cliente.",
            "Registre las muestras y los análisis requeridos.",
            "Revise el precio total estimado generado por el sistema.",
            "Guarde la cotización para que quede registrada en el sistema.",
        ],
    },

    // GESTION DE ENSAYOS

    {
        id: "gestion-solicitudes-ensayo",
        title: "Gestión de solicitudes de ensayo",
        icon: "science",
        content:
            "En este módulo el usuario administrador puede visualizar y gestionar todas las solicitudes de ensayo que han sido aceptadas, realizar búsquedas y filtros, y hacer seguimiento al estado y progreso de cada ensayo.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770597156/557644a4-2bcb-4d6d-953d-0f52c0d17263.png",
        steps: [
            "Acceda al módulo 'Gestión de solicitudes de ensayo' desde el menú lateral del sistema.",
            "Visualice el listado de ensayos registrados que se encuentran en proceso.",
            "Revise la información principal de cada ensayo, como el código, estado actual y fechas asociadas.",
            "Utilice el campo de búsqueda para localizar ensayos por código.",
            "Aplique filtros para visualizar los ensayos según su estado.",
            "Seleccione un ensayo para consultar su progreso y el equipo asignado.",
        ],
    },
    {
        id: "descargar-info-ensayos",
        title: "Descargar información de ensayos",
        icon: "download",
        content:
            "Esta opción permite al usuario administrador exportar la información de las solicitudes de ensayo para fines de respaldo, análisis o control administrativo.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770597156/557644a4-2bcb-4d6d-953d-0f52c0d17263.png",
        steps: [
            "Desde el módulo 'Gestión de solicitudes de ensayo', ubique la opción de exportación de información.",
            "Seleccione el año correspondiente a los ensayos que desea descargar.",
            "Haga clic en el botón 'Exportar Excel'.",
            "El sistema generará un archivo con la información de los ensayos registrados.",
            "Guarde el archivo descargado como respaldo o para su uso administrativo.",
        ],
    },
    {
        id: "gestionar-solicitud-ensayo",
        title: "Gestionar solicitud de ensayo",
        icon: "assignment",
        content:
            "Esta sección permite al usuario administrador gestionar una solicitud de ensayo específica, visualizar toda su información asociada y acceder a las acciones necesarias para el seguimiento y ejecución de la solicitud.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770597221/6ef45b28-16d6-4e5f-8505-231c795b3a2e.png",
        steps: [
            "Desde el módulo 'Gestión de solicitudes de ensayo', haga clic en el botón 'Gestionar' del ensayo deseado.",
            "El sistema mostrará la vista detallada del ensayo seleccionado.",
            "Visualice la información general del ensayo, incluyendo su código, estado y progreso.",
            "Consulte la información del cliente asociada a la solicitud.",
            "Revise el listado de muestras registradas y el estado de cada una.",
            "Verifique los análisis asociados a cada muestra.",
            "Ver los usuarios analistas asociados",
        ],
    },
    {
        id: "recepcion-muestras",
        title: "Recepción de muestras",
        icon: "inventory",
        content:
            "Esta sección permite registrar la recepción de las muestras asociadas a una solicitud de ensayo, ingresando la información necesaria para habilitar su análisis dentro del sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770597628/aff2f521-d308-463b-a6a8-02e526bcba78.png",
        steps: [
            "Desde la vista 'Gestionar solicitud de ensayo', haga clic en el botón 'Recepción de muestras'.",
            "El sistema mostrará el listado de muestras pendientes por recepcionar.",
            "Seleccione la muestra a la que desea registrar la recepción.",
            "Visualice el formulario de registro de recepción de muestra.",
            "Complete la información solicitada en el formulario.",
            "Guarde la información para confirmar la recepción de la muestra.",
        ],
    },
    {
        id: "emision-resultados-muestra",
        title: "Emisión de resultados de muestra",
        icon: "science",
        content:
            "Esta sección permite al usuario emitir los resultados de los análisis asociados a una muestra específica dentro de una solicitud de ensayo.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770597703/b567da00-95d0-4b18-a19b-f3b091e95aba.png",
        steps: [
            "Desde la vista 'Gestionar solicitud de ensayo', seleccione la muestra a la cual desea emitir resultados.",
            "El sistema mostrará el listado de análisis asociados a la muestra seleccionada.",
            "Seleccione el análisis que desea procesar.",
            "Registre el resultado correspondiente del análisis.",
            "Guarde la información ingresada.",
            "El sistema actualizará el estado del análisis y el progreso general del ensayo.",
        ],
    },
    {
        id: "envio-informe-resultados",
        title: "Envío de informe de resultados",
        icon: "send",
        content:
            "Esta sección permite completar la información final y realizar el envío del informe de resultados al cliente una vez que todos los análisis han sido finalizados.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770597914/0205923d-08ce-4546-8380-2eaa8561eac2.png",
        steps: [
            "Desde la gestión de la solicitud de ensayo, acceda a la opción de envío de informe de resultados.",
            "Visualice el informe generado automáticamente por el sistema para cada muestra.",
            "Adjunte hasta dos archivos adicionales en formato PDF, si es necesario.",
            "Ingrese el nombre del responsable de la emisión del informe.",
            "Ingrese el cargo del responsable de la emisión.",
            "Cargue la firma digital del responsable en formato de imagen.",
            "Confirme el envío del informe al cliente.",
        ],
    },
    {
        id: "gestion-muestras",
        title: "Gestión de muestras",
        icon: "flask",
        content:
            "Esta sección permite al usuario administrar y supervisar el estado de las muestras registradas en el sistema, desde su recepción hasta su entrega final.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770600875/dd963357-9c34-4396-96aa-b2785175dc6e.png",
        steps: [
            "Acceda al módulo de gestión de muestras desde el menú principal.",
            "Visualice las muestras disponibles para ejecución, entregadas y sin recepción mediante las pestañas correspondientes.",
            "Revise el estado de cada muestra, incluyendo días restantes de entrega y prioridad asignada.",
            "Identifique las muestras vencidas cuyo tiempo de entrega ha sido superado.",
            "Seleccione una o varias muestras disponibles que ya cuenten con recepción y no hayan sido enviadas.",
            "Envíe muestras de manera individual cuando cumplan con las condiciones necesarias.",
            "Visualice el historial de muestras entregadas y aquellas que aún no han sido recepcionadas.",
        ],
    },
    {
        id: "ejecucion-muestras",
        title: "Ejecución de muestras",
        icon: "check-circle",
        content:
            "Esta sección permite seleccionar y ejecutar muestras disponibles que ya cuentan con todos sus análisis finalizados, generando una vista previa antes de enviar los resultados al cliente.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770600763/1a40e45a-022b-44f1-bac5-a2e9598487ed.png",
        steps: [
            "Desde la gestión de muestras, seleccione una o varias muestras disponibles para ejecutar.",
            "El sistema valida automáticamente que todas las muestras seleccionadas tengan sus análisis finalizados.",
            "Visualice el resumen de las muestras seleccionadas para ejecución.",
            "Revise la información detallada de cada muestra, incluyendo cliente, cantidad de análisis y destino del resultado.",
            "Ingrese la información del responsable de la emisión del informe.",
            "Adjunte la firma digital del responsable en formato de imagen.",
            "Genere la vista previa del reporte antes del envío.",
            "Confirme y envíe los resultados a sus respectivos clientes.",
        ],
    },
    {
        id: "gestion-analisis",
        title: "Gestión de análisis",
        icon: "bar-chart",
        content:
            "Esta sección permite administrar los análisis del sistema, configurar sus propiedades técnicas, gestionar matrices aplicables y asignar personal calificado para garantizar la correcta ejecución y trazabilidad de los procesos.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604804/dd3f0e37-165a-49b3-800b-f4d3c5753147.png",
        steps: [
            "Acceda al módulo de gestión de análisis desde el menú principal.",
            "Visualice la lista de análisis registrados en el sistema.",
            "Consulte el estado de cada análisis (activo o inactivo).",
            "Acceda al detalle de un análisis para ver su información técnica, matrices asociadas y personal asignado.",
        ],
    },
    {
        id: "crear-analisis",
        title: "Crear análisis",
        icon: "plus-circle",
        content:
            "Permite registrar un nuevo análisis en el sistema, definiendo su información técnica y disponibilidad.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604804/dd3f0e37-165a-49b3-800b-f4d3c5753147.png",
        steps: [
            "Haga clic en la opción agregar nuevo análisis.",
            "Ingrese el nombre del análisis.",
            "Defina el método, equipo y unidades.",
            "Agregue notas técnicas si aplica.",
            "Guarde la información para registrar el análisis.",
        ],
    },
    {
        id: "eliminar-analisis",
        title: "Eliminar análisis",
        icon: "trash",
        content:
            "Permite eliminar un análisis del sistema cuando no se encuentra asociado a procesos activos.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604804/dd3f0e37-165a-49b3-800b-f4d3c5753147.png",
        steps: [
            "Seleccione el análisis a eliminar.",
            "Confirme la acción de eliminación.",
            "El sistema valida que el análisis no tenga dependencias activas.",
        ],
    },
    {
        id: "gestion-matrices",
        title: "Administración de matrices",
        icon: "layers",
        content:
            "Esta sección permite crear, editar y administrar las matrices utilizadas para clasificar y asociar los análisis.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604934/97ec5bac-7946-466b-b505-6b59f3920be9.png",
        steps: [
            "Acceda a la opción administrar matrices.",
            "Visualice la lista de matrices registradas.",
            "Revise el estado de disponibilidad de cada matriz.",
        ],
    },
    {
        id: "crear-matriz",
        title: "Crear matriz",
        icon: "plus-square",
        content: "Permite registrar una nueva matriz en el sistema.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604934/97ec5bac-7946-466b-b505-6b59f3920be9.png",
        steps: [
            "Seleccione la opción nueva matriz.",
            "Ingrese el nombre de la matriz.",
            "Guarde la información para registrarla.",
        ],
    },
    {
        id: "editar-matriz",
        title: "Editar matriz",
        icon: "edit",
        content: "Permite modificar la información de una matriz existente.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604934/97ec5bac-7946-466b-b505-6b59f3920be9.png",
        steps: [
            "Seleccione la matriz a editar.",
            "Actualice la información necesaria.",
            "Guarde los cambios realizados.",
        ],
    },
    {
        id: "estado-matriz",
        title: "Activar o desactivar matriz",
        icon: "toggle-right",
        content:
            "Permite habilitar o deshabilitar una matriz según su disponibilidad.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604934/97ec5bac-7946-466b-b505-6b59f3920be9.png",
        steps: [
            "Ubique la matriz en la lista.",
            "Cambie su estado de disponibilidad.",
            "Confirme la acción.",
        ],
    },

    {
        id: "asignar-personal-analisis",
        title: "Asignar personal calificado",
        icon: "users",
        content:
            "Permite asignar personal autorizado para la ejecución de un análisis.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604869/19002885-e6c1-4c8f-a704-feea93e3f87e.png",
        steps: [
            "Acceda al detalle del análisis.",
            "Seleccione la opción asignar personal.",
            "Elija el personal calificado disponible.",
            "Confirme la asignación.",
        ],
    },
    {
        id: "asociar-analisis-matriz",
        title: "Asociar análisis a matrices",
        icon: "link",
        content:
            "Permite asociar uno o varios análisis a matrices específicas para su correcta clasificación.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770604869/19002885-e6c1-4c8f-a704-feea93e3f87e.png",
        steps: [
            "Acceda al detalle del análisis.",
            "Visualice las matrices aplicables.",
            "Agregue o elimine matrices asociadas.",
            "Guarde los cambios realizados.",
        ],
    },
    {
        id: "configuracion-usos-ubicaciones",
        title: "Configuración de usos y ubicaciones",
        icon: "settings",
        content:
            "Esta sección permite administrar los catálogos de usos y ubicaciones del sistema. Estos elementos son utilizados en distintos módulos para clasificar y organizar la información.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770605331/5889cf86-4cab-4b58-81d7-948f7963c624.png",
        steps: [
            "Acceda al módulo de configuración desde el menú principal.",
            "Seleccione la opción de administración de usos o ubicaciones.",
            "Visualice la lista de registros existentes.",
            "Cree, edite, active, desactive o elimine registros según sea necesario.",
        ],
    },
    {
        id: "crear-uso",
        title: "Crear uso",
        icon: "plus-circle",
        content:
            "Permite registrar un nuevo uso en el sistema para su posterior asociación en otros módulos.",
        image: "https://res.cloudinary.com/dqezow954/image/upload/v1770605331/5889cf86-4cab-4b58-81d7-948f7963c624.png",
        steps: [
            "Haga clic en la opción agregar nuevo uso.",
            "Ingrese el nombre del uso.",
            "Guarde la información para registrar el uso.",
        ],
    },
];
