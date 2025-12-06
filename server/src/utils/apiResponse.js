/**  Utilidad para estandarizar las respuestas de la API 
 * Esto asegura que el frontend siempre reciba un objeto con la estructura correcta
 */
export class ApiResponse {
    /**
     * Respuesta de Éxito
     * @param {Object} res - Objeto response de Express
     * @param {any} data - Los datos a devolver (objeto, array, etc.)
     * @param {string} message - Mensaje opcional (ej: "Usuario creado")
     * @param {number} statusCode - Código HTTP (default 200)
     */
    static success(res, data = null, message = "Success", statusCode = 200) {
        return res.status(statusCode).json({ 
            success: true,
            message,
            data,
            statusCode
        });
    }
    /**
     * Respuesta de Error
     * @param {Object} res - Objeto response de Express
     * @param {string} message - Mensaje de error descriptivo
     * @param {number} statusCode - Código HTTP (default 500)
     * @param {any} error - Detalles técnicos del error (opcional, útil para logs)
     */
    static error(res, message = "Internal Server Error", statusCode = 500, error = null) {
        // En producción, podrías ocultar el objeto 'error' para no exponer detalles sensibles
        const response = {
            success: false,
            message,
            statusCode
        };

        if (error && process.env.NODE_ENV === 'development') {
            response.stack = error.stack || error; // Solo enviamos el stack en desarrollo
        }

        return res.status(statusCode).json(response);
    }
}