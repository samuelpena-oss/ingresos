const categoria = document.getElementById('categoria');
const listaMovimientos = document.getElementById('lista-movimientos');

async function cargarCategorias() {
    if (!categoria) return;

    categoria.innerHTML = '<option value="">Seleccione una categoría</option>';

    try {
        const respuesta = await fetch('http://localhost:4000/api/categorias');
        const datos = await respuesta.json();
        const categorias = Array.isArray(datos?.data) ? datos.data : [];

        const nombresUnicos = [...new Set(categorias.map((item) => item?.nombre).filter(Boolean))];

        nombresUnicos.forEach((nombre) => {
            categoria.innerHTML += `<option value="${nombre}">${nombre}</option>`;
        });
    } catch (error) {
        console.error('No se pudieron cargar las categorías:', error);
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