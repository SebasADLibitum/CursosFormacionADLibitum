export interface Teacher {
  idpersona: number
  nombre: string
  profesion?: string
  dni: string
  nuss?: string
  fecha_nacimiento: Date
  ciudad: string
  provincia: string
  pais: string
  cp: string
  direccion: string
  telefono1: string
  telefono2?: string
  email: string
  web?: string
  codimd5?: string
  caducidadmd5?: Date
}
