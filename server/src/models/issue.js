import mongoose, { Schema } from 'mongoose';

const issueSchema = new mongoose.Schema({
  creator: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  // Tipo de problema (Software, Hardware, Red, etc.)
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // --- REFERENCIAS A CATÁLOGOS (NUEVO) ---
  
  // Estado del DISPOSITIVO (Ej: Dañado, Funcionando)
  deviceStatus: {
    type: Schema.Types.ObjectId,
    ref: 'DeviceStatus', // Referencia al modelo en catalogs/DeviceStatus.js
    required: true
  },
  
  // Estado del REPORTE (Ej: Abierto, Cerrado, En Progreso)
  status: {
    type: Schema.Types.ObjectId,
    ref: 'IssueStatus', // Referencia al modelo en catalogs/IssueStatus.js
    required: true
  },
  
  // ----------------------------------------

  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }],
  
  issuesManagement: [
    {
      responsible: {
        id: {
          type: Schema.Types.ObjectId, // Recomendado: Referencia real al usuario si existe
          ref: 'User',
          required: true
        },
        name: {
          type: String,
          required: true,
          trim: true
        }
      },
      description: {
        type: String,
        trim: true
      },
      startDate: {
        type: Date,
        default: Date.now
      },
      endDate: {
        type: Date
      },
      usedObjects: {
        type: String
      }
    }
  ]
}, { 
    versionKey: false,
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;