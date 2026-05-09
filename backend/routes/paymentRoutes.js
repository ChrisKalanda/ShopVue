import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createStripeIntent,
  createPaypalOrder,
  capturePaypalOrder
} from '../controllers/paymentController.js';

const router = Router();

router.post('/stripe/create-intent', authMiddleware, createStripeIntent);
router.post('/paypal/create-order', authMiddleware, createPaypalOrder);
router.post('/paypal/capture/:orderId', authMiddleware, capturePaypalOrder);

export default router;
