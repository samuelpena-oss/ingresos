const categoria = document.getElementById('categoria');
const listaMovimientos = document.getElementById('lista-movimientos');
const formulario = document.getElementById('formulario-gastos');
const tipoMovimiento = document.getElementById('tipoMovimiento');

function configurarTipoMovimiento() {
    const botonesTipo = document.querySelectorAll('[data-tipo]');

    botonesTipo.forEach((boton) => {
        boton.addEventListener('click', () => {
            const tipo = boton.dataset.tipo;
            tipoMovimiento.value = tipo;
            boton.closest('.campo-acciones').querySelectorAll('button').forEach((item) => {
                item.style.opacity = '0.8';
            });
            boton.style.opacity = '1';
        });
    });
}

async function cargarCategorias() {
    if (!categoria) return;

    const opcionesBase = [
        { value: 'alimentos', label: 'Alimentación' },
        { value: 'vivienda', label: 'Vivienda' },
        { value: 'transporte', label: 'Transporte' },
        { value: 'salud', label: 'Salud' },
        { value: 'entretenimiento', label: 'Entretenimiento' },
        { value: 'educacion', label: 'Educación' },
        { value: 'servicios', label: 'Servicios' }
    ];

    categoria.innerHTML = '<option value="">Seleccione una categoría</option>';

    try {
        const respuesta = await fetch('http://localhost:4000/api/categorias');
        const datos = await respuesta.json();
        const categorias = Array.isArray(datos?.data) ? datos.data : [];
        const nombresUnicos = [...new Set(categorias.map((item) => item?.nombre).filter(Boolean))];

        const categoriasFinales = nombresUnicos.length > 0 ? nombresUnicos : opcionesBase.map(item => item.value);

        categoriasFinales.forEach((nombre) => {
            const opcion = opcionesBase.find((item) => item.value === nombre) || { value: nombre, label: nombre };
            categoria.innerHTML += `<option value="${opcion.value}">${opcion.label}</option>`;
        });
    } catch (error) {
        console.error('No se pudieron cargar las categorías:', error);
        opcionesBase.forEach((item) => {
            categoria.innerHTML += `<option value="${item.value}">${item.label}</option>`;
        });
    }
}

async function cargarMovimientosRecientes() {
    if (!listaMovimientos) return;

    try {
        const respuesta = await fetch('http://localhost:4000/api/transacciones');
        const datos = await respuesta.json();

        if (!datos.data || datos.data.length === 0) {
            listaMovimientos.innerHTML = '<li class="vacio">No hay movimientos recientes.</li>';
            return;
        }

        listaMovimientos.innerHTML = datos.data
            .slice(0, 8)
            .map((movimiento) => {
                const tipo = movimiento.tipo === 'ingreso' ? 'Ingreso' : movimiento.tipo === 'gasto' ? 'Gasto' : movimiento.tipo;
                const categoriaNombre = movimiento.categoria || 'Sin categoría';

                return `
                    <li class="item-movimiento ${movimiento.tipo === 'ingreso' ? 'ingreso' : 'gasto'}">
                        <div>
                            <strong>${tipo}</strong>
                            <span>${movimiento.descripcion || 'Sin descripción'}</span>
                            <small>${categoriaNombre}</small>
                        </div>
                        <div class="info-movimiento">
                            <span class="monto">$${Number(movimiento.monto).toFixed(2)}</span>
                            <small>${movimiento.fecha}</small>
                        </div>
                    </li>
                `;
            })
            .join('');
    } catch (error) {
        console.error('No se pudieron cargar los movimientos:', error);
        listaMovimientos.innerHTML = '<li class="vacio">No se pudieron cargar los movimientos.</li>';
    }
}

async function guardarMovimiento(evento) {
    evento.preventDefault();

    const monto = document.getElementById('monto').value;
    const fecha = document.getElementById('fecha').value;
    const categoriaSeleccionada = categoria.value;
    const tipo = tipoMovimiento.value;

    if (!monto || !fecha || !categoriaSeleccionada) {
        alert('Completa monto, fecha y categoría.');
        return;
    }

    const descripcion = `${tipo === 'ingreso' ? 'Ingreso' : 'Gasto'} de ${categoriaSeleccionada}`;

    try {
        const respuesta = await fetch('http://localhost:4000/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo,
                categoria: categoriaSeleccionada,
                monto: Number(monto),
                fecha,
                descripcion
            })
        });

        if (!respuesta.ok) {
            throw new Error('Error al guardar el movimiento');
        }

        formulario.reset();
        tipoMovimiento.value = 'gasto';
        await cargarCategorias();
        await cargarMovimientosRecientes();
        alert('Movimiento guardado correctamente.');
    } catch (error) {
        console.error(error);
        alert('No se pudo guardar el movimiento.');
    }
}

configurarTipoMovimiento();
cargarCategorias();
cargarMovimientosRecientes();
formulario.addEventListener('submit', guardarMovimiento);