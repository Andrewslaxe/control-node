export interface Doctor {
	id_doctor: number;
	nombre: string;
	apellido: string;
	especialidad: string;
	consultorio: number;
	correo?: string;
	createdAt?: Date;
}

export interface DoctorReq {
	nombre: string;
	apellido: string;
	especialidad: string;
	consultorio: number;
	correo?: string;
}

export interface DoctorResDB {
	id_doctor: number;
	nombre: string;
	apellido: string;
	especialidad: string;
	consultorio: number;
	correo?: string;
	createdAt?: Date;
	updatedAt?: Date;
}