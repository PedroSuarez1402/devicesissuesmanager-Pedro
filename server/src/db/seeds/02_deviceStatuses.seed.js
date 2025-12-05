import DeviceStatus from '../../models/catalogs/DeviceStatus.js';

export const seedDeviceStatus = async () => {
    // Datos basados en tu enum anterior
    const statuses = [
        {
            name: 'fixed',
            code: 'FIXED',
            description: 'El dispositivo ha sido reparado y está listo para usar.'
        },
        {
            name: 'damaged',
            code: 'DAMAGED',
            description: 'El dispositivo tiene daños físicos visibles.'
        },
        {
            name: 'unknown',
            code: 'UNKNOWN',
            description: 'Estado del dispositivo no verificado.'
        },
        {
            name: 'not working',
            code: 'NOT_WORKING',
            description: 'El dispositivo no enciende o falla en su función principal.'
        },
        {
            name: 'working',
            code: 'WORKING',
            description: 'El dispositivo funciona correctamente.'
        }
    ];

    await DeviceStatus.deleteMany({});
    await DeviceStatus.insertMany(statuses);

    console.log('DeviceStatuses (Catálogo) insertados correctamente');
};