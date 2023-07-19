import { db } from "../../../config/database";
import { Doctor, DoctorReq } from "./model";
import logger from '../../../utils/logger';
import { CreationError, DeleteError, GetAllError, UpdateError, RecordNotFoundError } from "../../../utils/customErrors";

export class DoctorRepository {
	public async createDoctor(doctor: DoctorReq): Promise<Doctor> {
		try {
			const createdDoctor = {
				nombre: doctor.nombre,
				apellido: doctor.apellido,
				especialidad: doctor.especialidad,
				consultorio: doctor.consultorio,
				correo: doctor.correo,
				created_at: new Date(),
				updated_at: new Date(),
			};
			const [createdDoctorId] = await db('doctores').insert(createdDoctor).returning('*');
			return createdDoctorId;
		} catch (error) {
			throw new CreationError(`Failed to create doctor dubt: ${error}`);
		}
	}

	public async getAllDoctors(): Promise<Doctor[]> {
		try {
			return db.select('*').from('doctores');
		} catch (error) {
			throw new GetAllError("Failed to get all doctors");
		}
	}

	public async getDoctorById(id: number): Promise<Doctor> {
		try {
			const doctor = await db('doctores').where({ id_doctor: id }).first();
			return doctor;
		} catch (error) {
			logger.error('Failed get doctor by id in repository', { error });
			throw new RecordNotFoundError();
		}
	}

	public async updateDoctor(id: number, updates: Partial<DoctorReq>): Promise<void> {
		try {
			const transformedUpdates = {
				...updates,
				updated_at: new Date()
			};
			await db('doctores').where({ id_doctor: id }).update(transformedUpdates);
		} catch (error) {
			logger.error('Failed updated doctor in repository', { error });
			throw new UpdateError("Failed to update doctor");
		}
	}

	public async deleteDoctor(id: number): Promise<void> {
		try {
			await db('doctores').where({ id_doctor: id }).del();
		} catch (error) {
			logger.error('Failed deleting doctor in repository', { error });
			throw new DeleteError("Failed to delete doctor");
		}
	}
}

export default {
	DoctorRepository
};