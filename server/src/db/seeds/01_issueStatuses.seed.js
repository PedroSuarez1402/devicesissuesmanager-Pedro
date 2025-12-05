import IssueStatus from "../../models/catalogs/IssueStatus.js";

export const seedIssueStatus = async () => {
    const statuses = [
        {
            name: 'open',
            code: 'OPEN',
            color: '#28a745' // Verde
        },
        {
            name: 'inprogress',
            code: 'IN_PROGRESS',
            color: '#ffc107' // Amarillo
        },
        {
            name: 'closed',
            code: 'CLOSED',
            color: '#6c757d' // Gris
        }
    ];

    // Borrar todos los registros
    await IssueStatus.deleteMany({});
    // Insertar los registros
    await IssueStatus.insertMany(statuses);

    console.log('IssueStatuses seeded successfully');
}