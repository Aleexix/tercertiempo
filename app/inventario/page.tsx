'use client';
import { Sidebar } from '@/components/sidebar';
import { useState, useMemo } from 'react';
import { 
  Plus, Search, Trash2, Edit, Save, 
  Package, DollarSign, AlertTriangle,
  Filter, ArrowLeft
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, nombre: 'Whisky Johnnie Walker Black Label', logo: 'https://i.pinimg.com/736x/20/70/e0/2070e0592b37719b700ba3516270130c.jpg', precio: 85000, stock: 5, codigo: 'JWBL001' },
  { id: 2, nombre: 'Ron Medellín Añejo', logo: 'https://via.placeholder.com/80?text=RM', precio: 45000, stock: 22, codigo: 'RMA001' },
  { id: 3, nombre: 'Aguardiente Antioqueño', logo: 'https://images.seeklogo.com/logo-png/23/1/aguardiente-antioqueno-logo-png_seeklogo-230432.png', precio: 28000, stock: 35, codigo: 'AA002' },
];

export default function LicoreriaCRUD() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [productos, setProductos] = useState(INITIAL_PRODUCTS);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '', logo: '', precio: '', stock: '', codigo: ''
  });

  const stats = useMemo(() => ({
    total: productos.length,
    valor: productos.reduce((acc, p) => acc + (p.precio * p.stock), 0),
    lowStock: productos.filter(p => p.stock < 10).length
  }), [productos]);

  const filteredProducts = productos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setFormData({ nombre: '', logo: '', precio: '', stock: '', codigo: '' });
    setView('create');
  };

  const handleOpenEdit = (producto: any) => {
    setProductoSeleccionado(producto);
    setFormData({
      nombre: producto.nombre,
      logo: producto.logo,
      precio: producto.precio.toString(),
      stock: producto.stock.toString(),
      codigo: producto.codigo
    });
    setView('edit');
  };

  const handleSave = () => {
    if (view === 'edit') {
      setProductos(productos.map(p => p.id === productoSeleccionado.id ? 
        { ...p, ...formData, precio: Number(formData.precio), stock: Number(formData.stock) } : p
      ));
    } else {
      const nuevo = { ...formData, id: Date.now(), precio: Number(formData.precio), stock: Number(formData.stock) };
      setProductos([...productos, nuevo]);
    }
    setView('list');
  };

  const deleteProduct = (id: number) => {
    if(confirm('¿Eliminar este producto?')) {
        setProductos(productos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-200">
      <div className="w-20">
        <Sidebar />
      </div>
      
      <main className="flex-1 p-8 flex flex-col">
        {/* Header - Unificado a green-700 */}
        <header className="flex justify-between items-end mb-8 max-w-7xl w-full mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Inventario</h1>
            <p className="text-zinc-500 mt-1">Gestiona el stock y precios de tu licorería</p>
          </div>
          
          {view === 'list' && (
            <button 
              onClick={handleOpenCreate}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-green-900/20"
            >
              <Plus size={20} /> Nuevo Producto
            </button>
          )}
        </header>

        {view === 'list' ? (
          <div className="space-y-6 max-w-7xl w-full mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={<Package className="text-green-500" />} label="Productos Totales" value={stats.total} />
              <StatCard icon={<DollarSign className="text-blue-500" />} label="Valor Inventario" value={`$${stats.valor.toLocaleString()}`} />
              <StatCard icon={<AlertTriangle className="text-amber-500" />} label="Stock Crítico" value={stats.lowStock} />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text"
                  placeholder="Buscar por nombre o código..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-700/50 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Explicación Filtro: Sirve para mostrar opciones de ordenamiento o categorías */}
              <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors border border-zinc-700 text-sm">
                <Filter size={18} /> Avanzado
              </button>
            </div>

            {/* Table */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Producto</th>
                    <th className="px-6 py-4 font-semibold">Código</th>
                    <th className="px-6 py-4 font-semibold">Precio</th>
                    <th className="px-6 py-4 font-semibold">Stock</th>
                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={p.logo} alt="" className="w-12 h-12 rounded-lg object-cover bg-zinc-800" />
                          <span className="font-medium text-white">{p.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 font-mono text-sm">{p.codigo}</td>
                      <td className="px-6 py-4 font-semibold text-green-500">${p.precio.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock < 10 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                          {p.stock} unidades
                        </span>
                      </td>
                      {/* Acciones ahora SIEMPRE VISIBLES */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleOpenEdit(p)} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-colors border border-zinc-700">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="p-2 bg-zinc-800 hover:bg-red-500/20 rounded-lg text-zinc-300 hover:text-red-500 transition-colors border border-zinc-700">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* FORM VIEW - Ahora centrado vertical y horizontalmente */
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
              <button 
                onClick={() => setView('list')}
                className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={18} /> Volver al listado
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-8">
                {view === 'edit' ? 'Editar Producto' : 'Registrar Nuevo Producto'}
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Nombre del Producto</label>
                  <input 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-700/50 outline-none"
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Ej: Ron Viejo de Caldas 15 años"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Código</label>
                  <input 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-700/50 outline-none"
                    value={formData.codigo}
                    onChange={e => setFormData({...formData, codigo: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Stock Inicial</label>
                  <input 
                    type="number"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-700/50 outline-none"
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Precio (COP)</label>
                  <input 
                    type="number"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-700/50 outline-none"
                    value={formData.precio}
                    onChange={e => setFormData({...formData, precio: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">URL Imagen</label>
                  <input 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-700/50 outline-none"
                    value={formData.logo}
                    onChange={e => setFormData({...formData, logo: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  onClick={() => setView('list')}
                  className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold transition-colors border border-zinc-700"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-900/20"
                >
                  <Save size={18} /> {view === 'edit' ? 'Actualizar' : 'Guardar Producto'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex items-center gap-5">
      <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}