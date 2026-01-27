// js/sheet-api.js

// --- CONFIGURACIÓN ---
// IMPORTANTE: Asegúrate de que esta URL sea la de tu última implementación (Deploy)
// Si hiciste "Nueva versión" en el script, verifica si la URL cambió o sigue siendo esta.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFEzpvc-ICxXlDjHDQ0slmJKvUMIx72w8HdPJvqcMoQ08_XgKqPsSn3uKLAHJAaryO/exec";

// ==========================================
// SECCIÓN 1: USUARIOS (REGISTRO Y LOGIN)
// ==========================================

// 1. REGISTRO: Guardar nuevo usuario
export async function guardarEnExcel(nombre, email, telefono) {
    const datos = {
        action: "create",
        nombre: nombre,
        email: email,
        telefono: telefono
    };

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", // Envío "ciego" para evitar errores de permisos
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        return true;
    } catch (error) {
        console.error("Error guardando:", error);
        return false;
    }
}

// 2. LOGIN: Consultar estado de un usuario
export async function consultarEstadoExcel(email) {
    try {
        const response = await fetch(`${SCRIPT_URL}?email=${email}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error consultando:", error);
        return null;
    }
}

// ==========================================
// SECCIÓN 2: ADMINISTRACIÓN
// ==========================================

// 3. LISTAR: Obtener TODOS los usuarios
export async function obtenerTodosLosUsuarios() {
    try {
        const response = await fetch(SCRIPT_URL);
        const lista = await response.json();
        return lista;
    } catch (error) {
        console.error("Error obteniendo lista:", error);
        return [];
    }
}

// 4. ACTUALIZAR: Editar estado y clases de un usuario
export async function actualizarUsuario(email, nuevoEstado, nuevasClases) {
    const datos = {
        action: "update",
        email: email,
        estado: nuevoEstado,
        clases: nuevasClases
    };

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        return true;
    } catch (error) {
        console.error("Error actualizando:", error);
        return false;
    }
}

// 5. ELIMINAR: Borrar usuario permanentemente (NUEVO)
export async function eliminarUsuario(email) {
    const datos = {
        action: "delete_user",
        email: email
    };

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        return true;
    } catch (error) {
        console.error("Error eliminando:", error);
        return false;
    }
}

// 6. AGENDA: Crear Turno (Con Actividad, Fecha, Hora y Cupo)
export async function crearTurno(fecha, hora, actividad, cupo) {
    const datos = {
        action: "crear_turno",
        fecha: fecha,
        hora: hora,
        actividad: actividad,
        cupo: cupo
    };

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        return true;
    } catch (error) {
        console.error("Error creando turno:", error);
        return false;
    }
}

// ==========================================
// SECCIÓN 3: SOCIO (DASHBOARD Y RESERVAS)
// ==========================================

// 7. DASHBOARD: Obtener lista de turnos disponibles
export async function obtenerTurnos(emailUsuario) {
    try {
        // Enviamos el email para saber si el usuario ya está inscrito en algún turno
        const response = await fetch(`${SCRIPT_URL}?type=turnos&email=${emailUsuario}`);
        const lista = await response.json();
        return lista;
    } catch (error) {
        console.error("Error obteniendo turnos:", error);
        return [];
    }
}

// 8. RESERVAR: Anotarse en una clase
export async function reservarTurno(email, idTurno) {
    const datos = {
        action: "reservar",
        email: email,
        idTurno: idTurno
    };

    try {
        // Nota: Al usar 'no-cors', no podemos leer la respuesta de error del servidor
        // (ej: si el turno se llenó justo antes). Asumimos éxito si se envía.
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        return true; 
    } catch (error) {
        console.error("Error reservando:", error);
        return false;
    }
}
