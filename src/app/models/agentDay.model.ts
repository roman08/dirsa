export class AgentDay {
  id?: number;
  id_usuario_registro?: number;
  tipo_fuente?: number;
  numero_empleado?: number;
  nombre_completo_agente?: string;
  agente_nombre?: string;
  agente_paterno?: string;
  agente_materno?: string;
  email_agente_fuente?: string;
  horas_sistema_agente?: string;
  horas_login_agente?: string;
  horas_logout_agente?: string;
  tiempo_conexion_agente?: string;
  procentaje_conexion_agente?: number;
  tiempo_descanso_agente?: string;
  tiempo_entrenamiento_agente?: string;
  tiempo_reuniones_agente?: string;
  created_at?: Date;
  updated_at?: Date;
  day_register?: Date;
  id_campania?: number;
}
