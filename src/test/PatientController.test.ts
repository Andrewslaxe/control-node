import { Request, Response } from "express";
import { PatientController, PatientControllerImpl } from "../api/components/pacientes/controller";
import { PatientService } from "../api/components/pacientes/service";
import { Patient, PatientReq } from "../api/components/pacientes/model";

const mockReq = {} as Request;
const mockRes = {} as Response;

describe('Patient Controller', () => {
  let patientService: PatientService;
  let patientController: PatientController;
  beforeEach(() => {
    patientService = {
      getAllPatients: jest.fn(),
      createPatient: jest.fn(),
      getPatientById: jest.fn(),
      updatePatient: jest.fn(),
      deletePatient: jest.fn()
    };

    patientController = new PatientControllerImpl(patientService);
    mockRes.status = jest.fn().mockReturnThis();
    mockRes.json = jest.fn().mockReturnThis();
  });

  describe('getAllDoctors', () => {
    it('should get all doctors', async () => {
      // Mock Process

      const patients: Patient[] = [
        { id_paciente: 1, nombre: 'Carlos', apellido: 'Caceres', identificacion: '1234567890', telefono: 1234567890, updatedAt: new Date(), createdAt: new Date() },
        { id_paciente: 2, nombre: 'Alveiro', apellido: 'Tarsisio', identificacion: '1234567890', telefono: 1234567890, updatedAt: new Date(), createdAt: new Date() },
      ];

      (patientService.getAllPatients as jest.Mock).mockResolvedValue(patients);

      // Method execution
      await patientController.getAllPatient(mockReq, mockRes);

      expect(patientService.getAllPatients).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(patients);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should be handler error and return 400 status', async () => {
      const error = new Error('Internal Server Error');
      (patientService.getAllPatients as jest.Mock).mockRejectedValue(error);

      await patientController.getAllPatient(mockReq, mockRes);

      expect(patientService.getAllPatients).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to retrieve patients" });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    }
    );
  });

  describe('createPatient', () => {
    it('should create a new patient and return info', async () => {
      // Mock Process      
      const patientReq: PatientReq = {
        nombre: 'Carlos',
        apellido: 'Caceres',
        identificacion: '1234567890',
        telefono: 1234567890
      };
      const patientRes: Patient = {
        id_paciente: 1,
        nombre: 'Carlos',
        apellido: 'Caceres',
        identificacion: '1234567890',
        telefono: 1234567890,
        updatedAt: new Date(),
      };
      (mockReq.body) = patientReq;
      (patientService.createPatient as jest.Mock).mockResolvedValue(patientRes);

      // Method execution
      await patientController.createPatient(mockReq, mockRes);

      expect(patientService.createPatient).toHaveBeenCalledWith(patientReq);
      expect(mockRes.json).toHaveBeenCalledWith(patientRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it('should be handler error and return 400 status', async () => {
      const error = new Error('Internal Server Error');
      (mockReq.body) = {};
      (patientService.createPatient as jest.Mock).mockRejectedValue(error);

      await patientController.createPatient(mockReq, mockRes);

      expect(patientService.createPatient).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getPatientById', () => {
    it('should get a patient by id', async () => {
      // Mock Process
      const patient: Patient = {
        id_paciente: 1,
        nombre: 'Carlos',
        apellido: 'Caceres',
        identificacion: '1234567890',
        telefono: 1234567890
      };

      (mockReq.params) = { id: "1" };
      (patientService.getPatientById as jest.Mock).mockResolvedValue(patient);

      // Method execution
      await patientController.getPatientById(mockReq, mockRes);

      expect(patientService.getPatientById).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(patient);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should be handler error and return 400 status', async () => {
      const error = new Error('Internal Server Error');
      (patientService.getPatientById as jest.Mock).mockRejectedValue(error);

      await patientController.getPatientById(mockReq, mockRes);

      expect(patientService.getPatientById).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to retrieve patient" });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});