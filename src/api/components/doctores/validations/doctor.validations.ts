import Joi from 'joi';
import { Especialidad } from '../../../../utils/model';
import { DoctorReq } from '../model';

const createDoctorSchema = Joi.object<DoctorReq>({
  nombre: Joi.string().required(),
  apellido: Joi.string(),
  especialidad: Joi.string().valid(...Object.values(Especialidad)).required(),
  consultorio: Joi.number().integer().min(100).max(999).required(),
  correo: Joi.string()
});

export { createDoctorSchema };