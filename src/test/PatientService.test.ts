import { Patient, PatientReq } from "../api/components/pacientes/model";
import { PatientServiceImpl } from "../api/components/pacientes/service";
import { PatientRepository } from "../api/components/pacientes/repository";


describe('PatientService', () => {
  let patientService: PatientServiceImpl;
  let patientRepository: PatientRepository;

  beforeEach(() => {
    patientRepository = {
      getAllPatients: jest.fn(),
      createPatient: jest.fn(),
      getPatientById: jest.fn(),
      updatePatient: jest.fn(),
      deletePatient: jest.fn()

    };

    patientService = new PatientServiceImpl(patientRepository);
  });

  describe('getAllDoctors', () => {
    it('should get all doctors from service', async () => {
      // Mock Process
      const patients: Patient[] = [
        { id_paciente: 1, nombre: 'Carlos', apellido: 'Caceres', identificacion: '1234567890', telefono: 1234567890, updatedAt: new Date(), createdAt: new Date() },
      ];

      (patientRepository.getAllPatients as jest.Mock).mockResolvedValue(patients);

      // Method execution
      const result = await patientService.getAllPatients();

      // Asserts
      expect(patientRepository.getAllPatients).toHaveBeenCalled();
      expect(result).toEqual(patients);

    });
    it('should return an empty array when no doctors are found', async () => {
      // Mock Process
      (patientRepository.getAllPatients as jest.Mock).mockResolvedValue([]);
      // Method execution
      const result = await patientService.getAllPatients();

      // Asserts
      expect(patientRepository.getAllPatients).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('createDoctor', () => {
    it('should create a new doctor and return it from  service', async () => {
      // Mock Process
      const patientRes: Patient = { id_paciente: 1, nombre: 'Carlos', apellido: 'Caceres', identificacion: '1234567890', telefono: 1234567890, updatedAt: new Date(), createdAt: new Date() };
      const patientReq: PatientReq = { nombre: 'Carlos', apellido: 'Caceres', identificacion: '1234567890', telefono: 1234567890 };

      (patientRepository.createPatient as jest.Mock).mockResolvedValue(patientRes);

      // Method execution
      const result = await patientService.createPatient(patientReq);

      // Asserts
      expect(patientRepository.createPatient).toHaveBeenCalledWith(patientReq);
      expect(result).toEqual(patientRes);
    });
    it('should throw and error if doctor creation fails', async () => {
      // Mock Process
      const patientReq: PatientReq = { nombre: 'Carlos', apellido: 'Caceres', identificacion: '1234567890', telefono: 1234567890 };
      const error1 = new Error('Failed to create patient');
      (patientRepository.createPatient as jest.Mock).mockRejectedValue(error1);

      await expect(patientService.createPatient(patientReq)).rejects.toThrowError(error1);
      expect(patientRepository.createPatient).toHaveBeenCalledWith(patientReq);

    });
  });

  describe('getDoctorById', () => {
    it('should get  doctor by id from service', async () => {
      // Mock Process
      const patient: Patient = { id_paciente: 1, nombre: 'Carlos', apellido: 'Caceres', identificacion: '1234567890', telefono: 1234567890, updatedAt: new Date(), createdAt: new Date() };
      const patientId = 1;
      (patientRepository.getPatientById as jest.Mock).mockResolvedValue(patient);

      // Method execution
      const result = await patientService.getPatientById(patientId);

      // Asserts
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);
      expect(result).toEqual(patient);
    });
    it('should return an empty array when no doctors are found', async () => {
      // Mock Process
      const patientId = 1;
      (patientRepository.getPatientById as jest.Mock).mockResolvedValue(null);


      // Method execution
      const result = await patientService.getPatientById(patientId);

      // Asserts
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);
      expect(result).toBeNull();
    });
    it('should throw an error if retrieval fails', async () => {
      // Mock Process
      const patientId = 1;
      const error = new Error('Database error');
      (patientRepository.getPatientById as jest.Mock).mockRejectedValue(error);

      // Asserts
      await expect(patientService.getPatientById(patientId)).rejects.toThrowError(error);
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);
    });
  });
});