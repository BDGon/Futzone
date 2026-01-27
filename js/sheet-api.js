// js/sheet-api.js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFEzpvc-ICxXlDjHDQ0slmJKvUMIx72w8HdPJvqcMoQ08_XgKqPsSn3uKLAHJAaryO/exec";

// 1. REGISTRO
export async function guardarEnExcel(nombre, email, telefono) {
    const datos = { action: "create", nombre: nombre, email: email, telefono: telefono };
    try { await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) }); return true; } catch (error) { return false; }
}

// 2. LOGIN
export async function consultarEstadoExcel(email) {
    try { const response = await fetch(`${SCRIPT_URL}?email=${email}`); return await response.json(); } catch (error) { return null; }
}

// 3. LISTAR USUARIOS (ADMIN)
export async function obtenerTodosLosUsuarios() {
    try { const response = await fetch(SCRIPT_URL); return await response.json(); } catch (error) { return []; }
}

// 4. ACTUALIZAR USUARIO (ADMIN)
export async function actualizarUsuario(email, nuevoEstado, nuevasClases) {
    const datos = { action: "update", email: email, estado: nuevoEstado, clases: nuevasClases };
    try { await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) }); return true; } catch (error) { return false; }
}

// 5. ELIMINAR USUARIO (ADMIN)
export async function eliminarUsuario(email) {
    const datos = { action: "delete_user", email: email };
    try { await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) }); return true; } catch (error) { return false; }
}

// 6. CREAR TURNO (ADMIN)
export async function crearTurno(fecha, hora, actividad, cupo) {
    const datos = { action: "crear_turno", fecha: fecha, hora: hora, actividad: actividad, cupo: cupo };
    try { await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) }); return true; } catch (error) { return false; }
}

// 7. OBTENER TURNOS (SIRVE PARA SOCIO Y ADMIN AHORA)
export async function obtenerTurnos(emailUsuario = "") {
    try {
        const response = await fetch(`${SCRIPT_URL}?type=turnos&email=${emailUsuario}`);
        return await response.json();
    } catch (error) { return []; }
}

// 8. ELIMINAR TURNO (NUEVO - ADMIN)
export async function eliminarTurno(idTurno) {
    const datos = { action: "delete_turno", idTurno: idTurno };
    try { await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) }); return true; } catch (error) { return false; }
}

// 9. RESERVAR (SOCIO)
export async function reservarTurno(email, idTurno) {
    const datos = { action: "reservar", email: email, idTurno: idTurno };
    try { await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) }); return true; } catch (error) { return false; }
}
