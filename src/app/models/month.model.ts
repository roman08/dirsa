export class Month {
  id?: number;
  id_campania?: number;
  anio?: string;
  id_mes?: number;
  dias_habiles?: number;
  numero_agentes?: number;
  hrs_jornada?: number;
  precio_hr?: number;
  tipo_moneda?: string;
  total_horas?: number;
  total_costo?: number;
  monto_fijo_mensual?: number;
  created_at?: Date;
  updated_at?: Date;
  campania?: Campania;
}

export class Campania {
  id?: number;
  nombre?: string;
  estatus?: string;
  created_at?: Date;
  updated_at?: Date;
  fecha_creacion?: Date;
  bilingue?: number;
  id_forma_de_pago?: number;
  id_type_origin?: number;
}
