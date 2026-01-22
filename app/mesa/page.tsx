'use client';

import { Sidebar } from '@/components/sidebar';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Plus,
  Search,
  Trash2,
  Edit,
  CheckCircle,
  Settings,
  X,
  Save,
} from 'lucide-react';
import { useState } from 'react';

export default function ReservasPage() {
  const [view, setView] = useState<'list' | 'create' | 'edit' | 'tables'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);

  /* ------------------ MESAS ------------------ */
  const [tables, setTables] = useState([
    { id: 1, name: 'Mesa Maradona', zone: 'Terraza', capacity: 4 },
    { id: 2, name: 'Mesa Pelé', zone: 'Terraza', capacity: 4 },
    { id: 3, name: 'Mesa Messi', zone: 'Barra Sports', capacity: 2 },
    { id: 4, name: 'Mesa Cristiano', zone: 'Barra Sports', capacity: 2 },
  ]);

  const [editingTable, setEditingTable] = useState<any | null>(null);
  const [newTable, setNewTable] = useState({ name: '', zone: '', capacity: 2 });

  /* ------------------ RESERVAS ------------------ */
  const [reservations, setReservations] = useState([
    {
      id: 1,
      clientName: 'Carlos Rodríguez',
      email: 'carlos@email.com',
      phone: '+57 300 111 2222',
      date: '2026-01-20',
      time: '20:00',
      guests: 4,
      tableId: 1,
      notes: 'Cumpleaños',
    },
  ]);

  /* ------------------ FORM ------------------ */
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    tableId: '',
    notes: '',
  });

  /* ------------------ HELPERS ------------------ */
  const getTableName = (id: number) =>
    tables.find(t => t.id === id)?.name ?? 'N/A';

  const getTableZone = (id: number) =>
    tables.find(t => t.id === id)?.zone ?? 'N/A';

  const resetForm = () => {
    setFormData({
      clientName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      tableId: '',
      notes: '',
    });
  };

  /* ------------------ CRUD RESERVAS ------------------ */
  const handleCreate = () => {
    if (!formData.clientName || !formData.date || !formData.time || !formData.tableId) {
      alert('Por favor completa los campos obligatorios');
      return;
    }
    
    setReservations([
      ...reservations,
      { id: Date.now(), ...formData, tableId: Number(formData.tableId) },
    ]);
    resetForm();
    setView('list');
  };

  const handleEdit = (r: any) => {
    setSelectedReservation(r);
    setFormData({ ...r, tableId: String(r.tableId) });
    setView('edit');
  };

  const handleUpdate = () => {
    if (!formData.clientName || !formData.date || !formData.time || !formData.tableId) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    setReservations(reservations.map(r =>
      r.id === selectedReservation.id
        ? { ...formData, id: r.id, tableId: Number(formData.tableId) }
        : r
    ));
    resetForm();
    setSelectedReservation(null);
    setView('list');
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar esta reserva?')) {
      setReservations(reservations.filter(r => r.id !== id));
    }
  };

  /* ------------------ CRUD MESAS ------------------ */
  const handleCreateTable = () => {
    if (!newTable.name || !newTable.zone) {
      alert('Por favor completa el nombre y la zona');
      return;
    }

    setTables([
      ...tables,
      { id: Date.now(), ...newTable, capacity: Number(newTable.capacity) },
    ]);
    setNewTable({ name: '', zone: '', capacity: 2 });
  };

  const handleUpdateTable = () => {
    if (!editingTable.name || !editingTable.zone) {
      alert('Por favor completa el nombre y la zona');
      return;
    }

    setTables(tables.map(t =>
      t.id === editingTable.id ? editingTable : t
    ));
    setEditingTable(null);
  };

  const handleDeleteTable = (id: number) => {
    const hasReservations = reservations.some(r => r.tableId === id);
    if (hasReservations) {
      alert('No puedes eliminar una mesa con reservas activas');
      return;
    }

    if (confirm('¿Eliminar esta mesa?')) {
      setTables(tables.filter(t => t.id !== id));
    }
  };

  /* ------------------ FILTRO ------------------ */
  const filteredReservations = reservations.filter(r =>
    r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm)
  );

  const isEmpty = filteredReservations.length === 0;

  /* ------------------ UI ------------------ */
  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="w-20">
        <Sidebar />
      </div>
    
      <main className="flex-1 p-6 max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bebas text-green-400">
            {view === 'tables' ? 'GESTIÓN DE MESAS' : 'GESTIÓN DE RESERVAS'}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setView(view === 'tables' ? 'list' : 'tables');
                resetForm();
                setSelectedReservation(null);
              }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                view === 'tables' ? 'bg-green-600' : 'bg-zinc-800'
              }`}
            >
              <Settings className="w-5 h-5" />
              {view === 'tables' ? 'Ver Reservas' : 'Mesas'}
            </button>
            {view === 'list' && (
              <button
                onClick={() => {
                  resetForm();
                  setView('create');
                }}
                className="px-4 py-2 bg-green-600 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Nueva Reserva
              </button>
            )}
          </div>
        </div>

        {/* ==================== VISTA MESAS ==================== */}
        {view === 'tables' && (
          <div className="space-y-6">
            {/* NUEVA MESA */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="font-bebas text-2xl mb-4 text-green-400">Nueva Mesa</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  placeholder="Nombre de la mesa *"
                  value={newTable.name}
                  onChange={e => setNewTable({ ...newTable, name: e.target.value })}
                  className="bg-zinc-800 px-4 py-3 rounded-lg"
                />
                <input
                  placeholder="Zona *"
                  value={newTable.zone}
                  onChange={e => setNewTable({ ...newTable, zone: e.target.value })}
                  className="bg-zinc-800 px-4 py-3 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Capacidad"
                  min="1"
                  value={newTable.capacity}
                  onChange={e => setNewTable({ ...newTable, capacity: Number(e.target.value) })}
                  className="bg-zinc-800 px-4 py-3 rounded-lg"
                />
                <button
                  onClick={handleCreateTable}
                  className="bg-green-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Añadir Mesa
                </button>
              </div>
            </div>

            {/* LISTA MESAS */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="font-bebas text-2xl mb-4">Mesas Disponibles</h2>
              <div className="space-y-3">
                {tables.map(table => (
                  <div key={table.id} className="bg-zinc-800 rounded-lg p-4">
                    {editingTable?.id === table.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <input
                          value={editingTable.name}
                          onChange={e => setEditingTable({ ...editingTable, name: e.target.value })}
                          className="bg-zinc-700 px-3 py-2 rounded"
                        />
                        <input
                          value={editingTable.zone}
                          onChange={e => setEditingTable({ ...editingTable, zone: e.target.value })}
                          className="bg-zinc-700 px-3 py-2 rounded"
                        />
                        <input
                          type="number"
                          min="1"
                          value={editingTable.capacity}
                          onChange={e => setEditingTable({ ...editingTable, capacity: Number(e.target.value) })}
                          className="bg-zinc-700 px-3 py-2 rounded"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdateTable}
                            className="flex-1 bg-green-600 px-4 py-2 rounded flex items-center justify-center gap-2"
                          >
                            <Save className="w-4 h-4" /> Guardar
                          </button>
                          <button
                            onClick={() => setEditingTable(null)}
                            className="px-4 py-2 bg-zinc-600 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bebas text-xl">{table.name}</h3>
                          <p className="text-sm text-gray-400">
                            <MapPin className="inline w-4 h-4" /> {table.zone} · 
                            <Users className="inline w-4 h-4 ml-2" /> {table.capacity} personas
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingTable(table)}
                            className="p-2 bg-blue-600 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTable(table.id)}
                            className="p-2 bg-red-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== VISTA LISTA ==================== */}
        {view === 'list' && (
          <>
            {/* BUSCADOR */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="w-full pl-10 py-3 bg-zinc-800 rounded-lg"
                  placeholder="Buscar por nombre, email o teléfono..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* EMPTY STATE */}
            {isEmpty && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">😢</div>
                <h3 className="text-2xl font-bebas mb-2">No hay reservas</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm ? 'No se encontraron reservas con ese criterio de búsqueda.' : 'Aún no tienes ninguna reserva registrada.'}
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setView('create');
                  }}
                  className="px-6 py-3 bg-green-600 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Crear Primera Reserva
                </button>
              </div>
            )}

            {/* LISTA RESERVAS */}
            {!isEmpty && (
              <div className="space-y-4">
                {filteredReservations.map(r => (
                  <div
                    key={r.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-green-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bebas text-2xl text-green-400">{r.clientName}</h3>
                          <span className="px-3 py-1 text-xs border rounded-lg flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/40">
                            <CheckCircle className="w-4 h-4" />
                            Reservada
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-400" />
                            {getTableName(r.tableId)} · {getTableZone(r.tableId)}
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-green-400" />
                            {r.guests} personas
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-green-400" />
                            {r.date}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-400" />
                            {r.time}
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-green-400" />
                            {r.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-400" />
                            {r.phone}
                          </p>
                        </div>
                        
                        {r.notes && (
                          <p className="mt-2 text-sm text-gray-400 italic">
                            Nota: {r.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(r)}
                          className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ==================== FORM CREAR/EDITAR ==================== */}
        {(view === 'create' || view === 'edit') && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl mx-auto">
            <h2 className="font-bebas text-3xl mb-6 text-green-400">
              {view === 'create' ? 'Nueva Reserva' : 'Editar Reserva'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Nombre del Cliente *
                </label>
                <input
                  placeholder="Ej: Carlos Rodríguez"
                  value={formData.clientName}
                  onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="+57 300 123 4567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Mesa *
                  </label>
                  <select
                    value={formData.tableId}
                    onChange={e => setFormData({ ...formData, tableId: e.target.value })}
                    className="w-full bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Seleccionar mesa</option>
                    {tables.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} - {t.zone} ({t.capacity} personas)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Número de Personas
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Notas Adicionales
                </label>
                <textarea
                  placeholder="Ej: Cumpleaños, alergias, preferencias..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full bg-zinc-800 px-4 py-3 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={view === 'create' ? handleCreate : handleUpdate}
                  className="flex-1 bg-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {view === 'create' ? 'Crear Reserva' : 'Guardar Cambios'}
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setSelectedReservation(null);
                    setView('list');
                  }}
                  className="px-6 py-3 bg-zinc-700 rounded-lg font-medium hover:bg-zinc-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}