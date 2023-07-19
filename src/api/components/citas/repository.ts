import { db } from "../../../config/database";
import { Appointment, AppointmentReq, AppointmentResDB } from "./model";
import logger from '../../../utils/logger';
import { RecordNotFoundError, GetAllError, CreationError, UpdateError, DeleteError } from "../../../utils/customErrors";

export class AppointmentRepository {
	public async createAppointment(appointment: AppointmentReq): Promise<AppointmentResDB> {
		try {
			const AppointmentTransformed = {
				id_doctor: appointment.id_doctor,
				especialidad: appointment.especialidad,
				horario: appointment.horario,
				identificacion_paciente: appointment.identificacion_paciente,
				created_at: new Date(),
				updated_at: new Date(),
			};
			const [createdAppointment] = await db('citas').insert(AppointmentTransformed).returning('*');
			return createdAppointment;
		} catch (error) {
			console.log(error);
			throw new CreationError(`Failed to create appointment dubt: ${error}`);
		}
	}

	public async getAllAppointment(): Promise<Appointment[]> {
		try {
			return db.select('*').from('citas');
		} catch (error) {

			throw new GetAllError("Failed to get all appointments");
		}
	}

	public async getAppointmentById(id: number): Promise<AppointmentResDB> {
		try {
			const appointment = await db('citas').where({ id_cita: id }).first();
			return appointment;
		} catch (error) {
			logger.error('Failed get appointment by id in repository', { error });
			throw new RecordNotFoundError();
		}
	}

	public async updateAppointment(id: number, updates: Partial<AppointmentReq>): Promise<void> {
		try {
			const transformedUpdates = {
				...updates,
				updated_at: new Date()
			};
			await db('citas').where({ id_cita: id }).update(transformedUpdates);
		} catch (error) {
			logger.error('Failed updated appointment in repository', { error });
			throw new UpdateError("Failed to update appointment");
		}
	}

	public async deleteAppointment(id: number): Promise<void> {
		try {
			await db('citas').where({ id_cita: id }).del();
		} catch (error) {
			logger.error('Failed deleting appointment in repository', { error });
			throw new DeleteError("Failed to delete appointment");
		}
	}
}