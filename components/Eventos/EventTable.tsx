import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
    id: string;
    eventType: string;
    place: number;
    specificName: string; 
    // ... otros campos de evento
}

interface EventTableProps {
    itemsPerPage: number;
}

const EventTable: React.FC<EventTableProps> = ({ itemsPerPage }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [modalities, setModalities] = useState<string[]>([]); 
    const [selectedEventType, setSelectedEventType] = useState<string>(''); 
    const [selectedSpace, setSelectedSpace] = useState<string>('');
    const [selectedSpecificName, setSelectedSpecificName] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState(1);

    const eventSpaces = [
        { id: 1, name: 'Sala' },
        { id: 2, name: 'Cafe Teatro' },
        { id: 3, name: 'Plazoleta' },
        { id: 4, name: 'Aula Taller' },
        { id: 5, name: 'Otros' },
    ];

    useEffect(() => {
        axios.get('http://localhost:8007/api/events/?skip=2&limit=40')
            .then(response => {
                if (response.status === 200) {
                    setEvents(response.data);
    
                    // Especificación explícita del tipo para 'event'
                    const uniqueModalities: string[] = Array.from(new Set(response.data.map((event: { eventType: string }) => event.eventType))) as string[];
                    setModalities(uniqueModalities);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos de eventos:', error);
            });
    }, []);
    

    useEffect(() => {
        const filtered = events.filter(event => {
            const eventTypeMatch = !selectedEventType || event.eventType.toLowerCase().includes(selectedEventType.toLowerCase());
            const spaceMatch = !selectedSpace || event.place.toString() === selectedSpace;
            const specificNameMatch = !selectedSpecificName || event.specificName.toLowerCase().includes(selectedSpecificName.toLowerCase());
            return eventTypeMatch && spaceMatch && specificNameMatch;
        });

        setFilteredEvents(filtered);
        setCurrentPage(1);
    }, [events, selectedEventType, selectedSpace, selectedSpecificName]);

    const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='bg-white flex flex-col gap-4 p-6 max-h-full overflow-y-auto'>
            <div className='grid grid-cols-3 space-x-4'>
                <div>
                    <label className='block text-gray-700 text-left'>Modalidad:</label>
                    <select
                        value={selectedEventType}
                        onChange={(e) => setSelectedEventType(e.target.value)}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    >
                        <option value="">Todos</option>
                        {modalities.map(modality => (
                            <option key={modality} value={modality}>{modality}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block text-gray-700 text-left'>Espacio:</label>
                    <select
                        value={selectedSpace}
                        onChange={(e) => setSelectedSpace(e.target.value)}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    >
                        <option value="">Todos</option>
                        {eventSpaces.map(space => (
                            <option key={space.id} value={space.id.toString()}>{space.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block text-gray-700 text-center'>Nombre del Evento:</label>
                    <input
                        type='text'
                        value={selectedSpecificName}
                        onChange={(e) => setSelectedSpecificName(e.target.value)}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                </div>
            </div>

            <div className='mt-4'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className='bg-gray-50 text-center'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Modalidad</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Espacio</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nombre del Evento</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {paginatedEvents.map((event, index) => (
                            <tr key={index}>
                                <td className='px-6 py-4 whitespace-nowrap text-left'>{event.eventType}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-left'>{eventSpaces.find(space => space.id.toString() === event.place.toString())?.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-left'>{event.specificName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md"
                >
                    Anterior
                </button>
                <span className="mr-2">{`Página ${currentPage}`}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={filteredEvents.length <= itemsPerPage * currentPage}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export { EventTable };
