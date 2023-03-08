export interface RegisteredTeacher {
  id: number
  cliente: number
  persona: number
  presentacion: number
  curso: number
  tipo_relacion: string
  factura: number
  pedido: number
  presupuesto: number
  albaran: number
  linea_presupuesto: number
  linea_pedido: number
  linea_albaran: number
  linea_factura: number
  producto: number
  fecha: string
  descripcion: string
  datos: number
  linea: number
  fecha_alta: Date
  web: number
  escuela: string
  escuela_admin: string
  idpersona?: number
  nombre: string
  profesion: string
  dni: string
  nuss: string
  fecha_nacimiento: Date
  ciudad: string
  provincia: string
  pais: string
  cp: string
  direccion: string
  telefono1: string
  telefono2: string
  email: string
  codimd5: string
  caducidadmd5: Date
}
