const categoria = document.getElementById('categoria');
const listaMovimientos = document.getElementById('lista-movimientos');

async function cargarCategorias() {
    const respuesta = await fetch('http://localhost:4000/api/categorias');
    const datos = await respuesta.json();

    for (let i = 0; i < datos.data.length; i++) {
        categoria.innerHTML += `<option>${datos.data[i].nombre}</option>`;
    }
}

async function cargarMovimientosRecientes() {
    const respuesta = await fetch('http://localhost:4000/api/transacciones');
    const datos = await respuesta.json();

    if (!datos.data || datos.data.length === 0) {
        listaMovimientos.innerHTML = '<li class="vacio">No hay movimientos recientes.</li>';
        return;
    }

    listaMovimientos.innerHTML = datos.data
        .slice(0, 8)
        .map((movimiento) => `
            <li class="item-movimiento ${movimiento.tipo === 'ingreso' ? 'ingreso' : 'gasto'}">
                <div>
                    <strong>${movimiento.tipo}</strong>
                    <span>${movimiento.descripcion || 'Sin descripción'}</span>
                </div>
                <div class="info-movimiento">
                    <span class="monto">$${Number(movimiento.monto).toFixed(2)}</span>
                    <small>${movimiento.fecha}</small>
                </div>
            </li>
        `)
        .join('');
}

cargarCategorias();
cargarMovimientosRecientes();