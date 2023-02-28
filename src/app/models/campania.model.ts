export class Campania {
  id!: number;
  nombre!: string;
  estatus!: string;
  created_at!: Date;
  updated_at!: Date;
  fecha_creacion!: Date;
  bilingue!: number;
  id_forma_de_pago!: number;
  groups!: Group[];
  leaders!: Leader[];
  type_pay!: TypePay;
  months!: Month[];
  id_type_origin!: number;
}

export class  Group {
  id!: number;
  nombre!: string;
  estatus!: string;

}



export class  Leader {
  id!: number;
  id_tipo_usuario!: number;
  usuario!: string;
  nombre!: string;
  apellido_pat!: string;
  apellido_mat!: string;
  id_ubicacion!: number;
  id_empresa_rh!: number;
  email!: string;
  created_at!: null;
  updated_at!: null;
  nombre_completo!: string;
  numero_empleado!: number;
  curp!: string;
  ejecucion_administrativa!: number;
  id_compania!: number;
  ola!: string;
  id_puesto!: number;
  sueldo!: number;
  fecha_ingreso!: string;
  fecha_contrato!: string;
  rfc!: string;
  nss!: string;
  fecha_nacimiento!: string;
  id_sexo!: number;
  fecha_pago!: string;
  id_banco!: number;
  numero_cuenta_bancaria!: string;
  clabe_inter_bancaria!: string;
  id_estatus!: number;
  id_departamento_empresa!: number;
  id_turno!: number;
  fecha_baja!: string;
  motivo_baja!: string;
  fecha_inicio_capacitacion!: string;
  fecha_fin_capacitacion!: string;
  id_subcategoria!: number;
  id_domicilo!: number;
  nota!: string;
  mes_baja!: string;
}

export class TypePay {
  id!: number;
  name!: string;
  status!: string;

}

export class Month {
  id!: number;
  id_campania!: number;
  anio!: string;
  id_mes!: number;
  dias_habiles!: number;
  numero_agentes!: number;
  hrs_jornada!: number;
  precio_hr!: number;
  tipo_moneda!: string;
  total_horas!: number;
  total_costo!: number;
  monto_fijo_mensual!: number;
  created_at!: Date;
  updated_at!: Date;
}


