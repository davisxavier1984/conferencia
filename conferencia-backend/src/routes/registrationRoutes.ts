import { Router } from 'express';
import {
  createRegistration,
  listRegistrations,
  getRegistrationById,
  getRegistrationByCode,
  filterRegistrations,
  updateRegistration,
  deleteRegistration,
  authorizeCertificate,
} from '../controllers/registrationController';

const router = Router();

// Rotas de inscrições
router.post('/registrations', createRegistration);
router.get('/registrations', listRegistrations);
router.get('/registrations/filter', filterRegistrations);
router.get('/registrations/code/:code', getRegistrationByCode);
router.get('/registrations/:id', getRegistrationById);
router.put('/registrations/:id', updateRegistration);
router.delete('/registrations/:id', deleteRegistration);
router.patch('/registrations/:id/certificate', authorizeCertificate);

export default router;
