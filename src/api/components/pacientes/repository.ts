import { db } from "../../../config/database";
import { Patient, PatientReq, } from "./model";
import logger from '../../../utils/logger';
import { CreationError, GetAllError, UpdateError, RecordNotFoundError, DeleteError } from "../../../utils/customErrors";

export class PatientRepository {
	public async createPatient(patient: PatientReq): Promise<Patient> {
		try {
			const createdPatientTransformed = {
				nombre: patient.nombre,
				apellido: patient.apellido,
				identificacion: patient.identificacion,
				telefono: patient.telefono,
				created_at: new Date(),
				updated_at: new Date()
			};
			const [createdPatient] = await db('pacientes').insert(createdPatientTransformed).returning('*');
			console.log('if in repository');
			return createdPatient;
		} catch (error) {
			logger.error('Failed to create patient in repository', { error });
			console.log('else in repository');
			throw new CreationError(`Failed to create patient dubt: ${error}`);
		}
	}

	public async getAllPatients(): Promise<Patient[]> {
		try {
			return db.select('*').from('pacientes');
		} catch (error) {
			throw new GetAllError("Failed to get all patients");
		}
	}

	public async getPatientById(id: number): Promise<Patient> {
		try {
			const patient = await db('pacientes').where({ id_paciente: id }).first();
			return patient;
		} catch (error) {
			logger.error('Failed get patient by id in repository', { error });
			throw new RecordNotFoundError();
		}
	}

	public async updatePatient(id: number, updates: Partial<PatientReq>): Promise<void> {
		try {
			const transformedUpdates = {
				...updates,
				updated_at: new Date()
			};
			await db('pacientes').where({ id_paciente: id }).update(transformedUpdates);
		} catch (error) {
			logger.error('Failed updated patient in repository', { error });
			throw new UpdateError("Failed to update patient");
		}
	}

	public async deletePatient(id: number): Promise<void> {
		try {
			await db('pacientes').where({ id_paciente: id }).del();
		} catch (error) {
			logger.error('Failed deleting patient in repository', { error });
			throw new DeleteError("Failed to delete patient");
		}
	}

}