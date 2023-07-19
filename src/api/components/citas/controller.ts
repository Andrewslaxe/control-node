
import { Request, Response } from 'express';
import { AppointmentService } from './service';
import logger from '../../../utils/logger';
import { CreationError, UpdateError, DeleteError, GetAllError, RecordNotFoundError } from '../../../utils/customErrors';

export interface AppointmentController {
  getAllAppointment(req: Request, res: Response): void;
  createAppointment(req: Request, res: Response): void;
  getAppointmentById(req: Request, res: Response): void;
  updateAppointment(req: Request, res: Response): void;
  deleteAppointment(req: Request, res: Response): void;
}

export class AppointmentControllerImpl implements AppointmentController {
  private appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  public async getAllAppointment(req: Request, res: Response): Promise<void> {
    try {
      const patients = await this.appointmentService.getAllAppointments();
      res.status(200).json(patients);
    } catch (error) {
      logger.error(error);
      if (error instanceof GetAllError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Failed to retrieve appointments" });
      }
    }
  }

  public createAppointment(req: Request, res: Response): void {
    const appointmentReq = req.body;
    this.appointmentService.createAppointment(appointmentReq)
      .then(
        (appointment) => {
          res.status(201).json(appointment);
        },
        (error) => {
          logger.error(error);
          if (error instanceof CreationError) {
            res.status(400).json({
              error_name: error.name,
              message: "Failed Creating appointment"
            });
          } else {
            res.status(400).json({
              message: "Internal Server Error"
            });
          }
        }
      );

  }

  public async getAppointmentById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("Id must be a number");
      }
      const appointment = await this.appointmentService.getAppointmentById(id);
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        throw new RecordNotFoundError();
      }
    } catch (error) {
      logger.error(error);
      if (error instanceof RecordNotFoundError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Failed to retrieve appointment" });
      }
    }
  }

  public async updateAppointment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("Id must be a number");
      }
      const appointmentReq = req.body;
      await this.appointmentService.updateAppointment(id, appointmentReq);
      res.status(200).json({ message: "Appointment updated successfully" });
    } catch (error) {
      logger.error(error);
      if (error instanceof UpdateError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Failed to update appointment" });
      }
    }
  }

  public async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("Id must be a number");
      }
      await this.appointmentService.deleteAppointment(id);
      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      logger.error(error);
      if (error instanceof DeleteError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Failed to delete appointment" });
      }
    }
  }

}