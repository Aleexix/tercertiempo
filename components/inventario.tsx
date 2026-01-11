'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export function LicoreriaCRUD() {
    const [productos, setProductos] = useState([
        {
            id: 1,
            nombre: 'Whisky Johnnie Walker Black Label',
            logo: 'https://i.pinimg.com/736x/20/70/e0/2070e0592b37719b700ba3516270130c.jpg',
            precio: 85000,
            stock: 5,
            codigo: 'JWBL001'
        },
        {
            id: 2,
            nombre: 'Ron Medellín Añejo',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=RM',
            precio: 45000,
            stock: 22,
            codigo: 'RMA001'
        },
        {
            id: 3,
            nombre: 'Aguardiente Antioqueño',
            logo: 'https://images.seeklogo.com/logo-png/23/1/aguardiente-antioqueno-logo-png_seeklogo-230432.png',
            precio: 28000,
            stock: 35,
            codigo: 'AA002'
        },
        {
            id: 4,
            nombre: 'Vodka Absolut',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=VA',
            precio: 65000,
            stock: 8,
            codigo: 'VA001'
        },
        {
            id: 5,
            nombre: 'Tequila José Cuervo',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=TJC',
            precio: 55000,
            stock: 18,
            codigo: 'TJC001'
        },
        {
            id: 6,
            nombre: 'Tequila José Cuervo',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=TJC',
            precio: 55000,
            stock: 18,
            codigo: 'TJC001'
        },
        {
            id: 7,
            nombre: 'Tequila José Cuervo',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=TJC',
            precio: 55000,
            stock: 18,
            codigo: 'TJC001'
        },
        {
            id: 8,
            nombre: 'Tequila José Cuervo',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=TJC',
            precio: 55000,
            stock: 18,
            codigo: 'TJC001'
        },
        {
            id: 9,
            nombre: 'Tequila José Cuervo',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=TJC',
            precio: 55000,
            stock: 18,
            codigo: 'TJC001'
        },
        {
            id: 10,
            nombre: 'Tequila José Cuervo',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=TJC',
            precio: 55000,
            stock: 18,
            codigo: 'TJC001'
        },
        {
            id: 11,
            nombre: 'Tequila José Cuervo',
            logo: 'https://via.placeholder.com/80x80/1a1a1a/15803d?text=TJC',
            precio: 55000,
            stock: 18,
            codigo: 'TJC001'
        },
    ]);

    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        logo: '',
        precio: '',
        stock: '',
        codigo: ''
    });
    const [busqueda, setBusqueda] = useState('');
    const [filtroPrecio, setFiltroPrecio] = useState('todos');
    const [filtroStock, setFiltroStock] = useState('todos');
    const [paginaActual, setPaginaActual] = useState(1);
    const [productosPorPagina, setProductosPorPagina] = useState(5);

    const abrirModalAgregar = () => {
        setModoEdicion(false);
        setFormData({ nombre: '', logo: '', precio: '', stock: '', codigo: '' });
        setMostrarModal(true);
    };

    const abrirModalEditar = () => {
        if (!productoSeleccionado) return;
        setModoEdicion(true);
        setFormData({
            nombre: productoSeleccionado.nombre,
            logo: productoSeleccionado.logo,
            precio: productoSeleccionado.precio.toString(),
            stock: productoSeleccionado.stock.toString(),
            codigo: productoSeleccionado.codigo
        });
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setModoEdicion(false);
        setFormData({ nombre: '', logo: '', precio: '', stock: '', codigo: '' });
    };

    const guardarProducto = () => {
        if (modoEdicion) {
            setProductos(productos.map(p =>
                p.id === productoSeleccionado.id
                    ? { ...p, ...formData, precio: parseFloat(formData.precio), stock: parseInt(formData.stock) }
                    : p
            ));
            setProductoSeleccionado({
                ...productoSeleccionado,
                ...formData,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock)
            });
        } else {
            const nuevoProducto = {
                id: Date.now(),
                nombre: formData.nombre,
                logo: formData.logo,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                codigo: formData.codigo
            };
            setProductos([...productos, nuevoProducto]);
        }

        cerrarModal();
    };

    const eliminarProducto = () => {
        if (!productoSeleccionado) return;
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            setProductos(productos.filter(p => p.id !== productoSeleccionado.id));
            setProductoSeleccionado(null);
        }
    };

    const seleccionarProducto = (producto) => {
        setProductoSeleccionado(productoSeleccionado?.id === producto.id ? null : producto);
    };

    const productosFiltrados = productos.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());

        let coincidePrecio = true;
        if (filtroPrecio === 'bajo') coincidePrecio = producto.precio < 30000;
        else if (filtroPrecio === 'medio') coincidePrecio = producto.precio >= 30000 && producto.precio < 60000;
        else if (filtroPrecio === 'alto') coincidePrecio = producto.precio >= 60000;

        let coincideStock = true;
        if (filtroStock === 'bajo') coincideStock = producto.stock < 10;
        else if (filtroStock === 'medio') coincideStock = producto.stock >= 10 && producto.stock < 30;
        else if (filtroStock === 'alto') coincideStock = producto.stock >= 30;

        return coincideNombre && coincidePrecio && coincideStock;
    });

    const indiceUltimo = paginaActual * productosPorPagina;
    const indicePrimero = indiceUltimo - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">Inventario de Licorería</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={abrirModalAgregar}
                            className="group border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-3 py-3 rounded-lg flex items-center gap-2 transition-all w-12 hover:w-36 h-12 overflow-hidden"
                        >
                            <Plus size={20} className="flex-shrink-0" />
                            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Agregar</span>
                        </button>
                        <button
                            onClick={abrirModalEditar}
                            disabled={!productoSeleccionado}
                            className={`group px-3 py-3 rounded-lg flex items-center gap-2 transition-all h-12 overflow-hidden ${productoSeleccionado
                                    ? 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white w-12 hover:w-32'
                                    : 'bg-black border-2 border-purple-600 text-purple-600 cursor-not-allowed opacity-50 w-12'
                                }`}
                        >
                            <Edit2 size={20} className="flex-shrink-0" />
                            <span className={`whitespace-nowrap transition-opacity ${productoSeleccionado ? 'opacity-0 group-hover:opacity-100' : 'hidden'}`}>Editar</span>
                        </button>
                        <button
                            onClick={eliminarProducto}
                            disabled={!productoSeleccionado}
                            className={`group px-3 py-3 rounded-lg flex items-center gap-2 transition-all h-12 overflow-hidden ${productoSeleccionado
                                    ? 'border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white w-12 hover:w-36'
                                    : 'bg-black border-2 border-rose-600 text-rose-600 cursor-not-allowed opacity-50 w-12'
                                }`}
                        >
                            <Trash2 size={20} className="flex-shrink-0" />
                            <span className={`whitespace-nowrap transition-opacity ${productoSeleccionado ? 'opacity-0 group-hover:opacity-100' : 'hidden'}`}>Eliminar</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-9">
                        <div className="bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-zinc-800">
                            <div className="bg-zinc-800 px-8 py-5 border-b border-zinc-700">
                                <div className="grid grid-cols-14 gap-6 text-sm font-semibold text-zinc-400 uppercase tracking-wide">
                                    <div className="col-span-2">Logo</div>
                                    <div className="col-span-5">Producto</div>
                                    <div className="col-span-2">Precio</div>
                                    <div className="col-span-3">Stock</div>
                                    <div className="col-span-2">Código</div>
                                </div>
                            </div>

                            <div className="divide-y divide-zinc-800">
                                {productosActuales.map((producto) => (
                                    <div
                                        key={producto.id}
                                        onClick={() => seleccionarProducto(producto)}
                                        className={`px-8 py-6 cursor-pointer transition-all duration-200 ${productoSeleccionado?.id === producto.id
                                                ? 'bg-zinc-800 bg-opacity-10 border-l-4 border-green-700'
                                                : 'hover:bg-zinc-800 hover:border-l-4 hover:border-green-700'
                                            }`}
                                    >
                                        <div className="grid grid-cols-14 gap-6 items-center">
                                            <div className="col-span-2">
                                                <img
                                                    src={producto.logo}
                                                    alt={producto.nombre}
                                                    className="w-20 h-20 object-cover rounded-lg border-2 border-zinc-700 shadow-lg"
                                                />
                                            </div>
                                            <div className="col-span-5">
                                                <h3 className="text-white font-semibold text-lg">{producto.nombre}</h3>
                                                <p className="text-zinc-500 text-sm mt-1">Licorería Premium</p>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="text-green-400 font-bold text-xl">
                                                    ${producto.precio.toLocaleString()}
                                                </div>
                                                <p className="text-zinc-600 text-xs mt-1">COP</p>
                                            </div>
                                            <div className="col-span-3">
                                                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${producto.stock < 10
                                                        ? 'bg-rose-600 bg-opacity-20 text-rose-400 border border-rose-600'
                                                        : 'bg-green-700 bg-opacity-20 text-green-400 border border-green-700'
                                                    }`}>
                                                    <span className={`w-2 h-2 rounded-full mr-2 ${producto.stock < 10 ? 'bg-rose-400' : 'bg-green-400'}`}></span>
                                                    {producto.stock} unidades
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="text-zinc-400 text-sm">
                                                    {producto.codigo}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {productosFiltrados.length === 0 && (
                                <div className="text-center py-16 text-zinc-500">
                                    <p className="text-xl">No se encontraron productos</p>
                                    <p className="mt-2">Intenta ajustar los filtros de búsqueda</p>
                                </div>
                            )}
                        </div>

                        {productosFiltrados.length > 0 && (
                            <div className="mt-6 flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <label className="text-sm text-zinc-400">Productos por página:</label>
                                    <select
                                        value={productosPorPagina}
                                        onChange={(e) => {
                                            setProductosPorPagina(Number(e.target.value));
                                            setPaginaActual(1);
                                        }}
                                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-green-700 focus:outline-none cursor-pointer"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                    </select>
                                    <span className="text-sm text-zinc-400">
                                        Mostrando {indicePrimero + 1} - {Math.min(indiceUltimo, productosFiltrados.length)} de {productosFiltrados.length}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => cambiarPagina(paginaActual - 1)}
                                        disabled={paginaActual === 1}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${paginaActual === 1
                                                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                                : 'bg-zinc-800 text-white hover:bg-zinc-700'
                                            }`}
                                    >
                                        Anterior
                                    </button>

                                    {[...Array(totalPaginas)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => cambiarPagina(index + 1)}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${paginaActual === index + 1
                                                    ? 'bg-green-700 text-white'
                                                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => cambiarPagina(paginaActual + 1)}
                                        disabled={paginaActual === totalPaginas}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${paginaActual === totalPaginas
                                                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                                : 'bg-zinc-800 text-white hover:bg-zinc-700'
                                            }`}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-span-3">
                        <div className="bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 p-6 sticky top-8">
                            <h3 className="text-white font-bold text-lg mb-6">Filtros de Búsqueda</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-400 mb-2">
                                        Buscar Producto
                                    </label>
                                    <input
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                        placeholder="Nombre del producto..."
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-green-700 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-zinc-400 mb-2">
                                        Rango de Precio
                                    </label>
                                    <select
                                        value={filtroPrecio}
                                        onChange={(e) => setFiltroPrecio(e.target.value)}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-purple-600 focus:outline-none transition-colors cursor-pointer"
                                    >
                                        <option value="todos">Todos los precios</option>
                                        <option value="bajo">Bajo (menos de $30.000)</option>
                                        <option value="medio">Medio ($30.000 - $60.000)</option>
                                        <option value="alto">Alto (más de $60.000)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-zinc-400 mb-2">
                                        Nivel de Stock
                                    </label>
                                    <select
                                        value={filtroStock}
                                        onChange={(e) => setFiltroStock(e.target.value)}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-purple-600 focus:outline-none transition-colors cursor-pointer"
                                    >
                                        <option value="todos">Todos los niveles</option>
                                        <option value="bajo">Bajo (menos de 10 unidades)</option>
                                        <option value="medio">Medio (10 - 30 unidades)</option>
                                        <option value="alto">Alto (más de 30 unidades)</option>
                                    </select>
                                </div>

                                <div className="pt-4 border-t border-zinc-800">
                                    <div className="text-sm text-zinc-500">
                                        <p className="mb-1">Productos encontrados:</p>
                                        <p className="text-2xl font-bold text-green-400">{productosFiltrados.length}</p>
                                    </div>
                                </div>

                                {(busqueda || filtroPrecio !== 'todos' || filtroStock !== 'todos') && (
                                    <button
                                        onClick={() => {
                                            setBusqueda('');
                                            setFiltroPrecio('todos');
                                            setFiltroStock('todos');
                                        }}
                                        className="w-full border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                                    >
                                        Limpiar Filtros
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {mostrarModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
                        <div className={modoEdicion ? 'bg-zinc-900 border border-purple-600 rounded-lg p-8 max-w-md w-full' : 'bg-zinc-900 border border-green-700 rounded-lg p-8 max-w-md w-full'}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className={modoEdicion ? 'text-2xl font-bold text-purple-600' : 'text-2xl font-bold text-green-700'}>
                                    {modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}
                                </h2>
                                <button onClick={cerrarModal} className="text-zinc-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-zinc-300">Nombre del Producto</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-green-700 focus:outline-none"
                                        placeholder="Ej: Whisky Johnnie Walker"
                                    />
                                </div>


                                <div className="flex gap-3" >
                                    <div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-zinc-300">Codigo </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.codigo}
                                                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-green-700 focus:outline-none"
                                                placeholder="Ej: Whisky Johnnie Walker"
                                            />
                                        </div>
                                        <div className='mb-2 mt-4  '>
                                            <label className="block text-sm font-medium mb-2 text-zinc-300">URL de la Imagen</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.logo}
                                                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-green-700 focus:outline-none"
                                                placeholder="https://ejemplo.com/imagen.jpg"
                                            />
                                        </div>
                                    </div>


                                    <div className={modoEdicion ? 'w-35 h-35 object-cover rounded border border-purple-700 mt-4' : 'w-35 h-35 object-cover rounded border border-green-700 mt-4'} >

                                        {formData.logo && (
                                            <div className="">
                                                <img
                                                    src={formData.logo}
                                                    alt="Vista previa"
                                                    className="w-35 h-35 object-cover rounded border "
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 " >
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-zinc-300">Precio (COP)</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="100"
                                            value={formData.precio}
                                            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-green-700 focus:outline-none"
                                            placeholder="45000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-zinc-300">Stock (Unidades)</label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-green-700 focus:outline-none"
                                            placeholder="15"
                                        />
                                    </div>
                                </div>


                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={cerrarModal}
                                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={guardarProducto}
                                        className={modoEdicion ? 'flex-1 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors' : 'flex-1 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors'}
                                    >
                                        {modoEdicion ? 'Actualizar' : 'Guardar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}