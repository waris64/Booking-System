import express from 'express'

import {
    createTrip,
    allTrips,
    getTripById,
    deleteTrip
} from '../Controllers/tripController.js';

const router = express.Router();
router.post('/', createTrip);
router.get('/', allTrips);
router.get('/:id', getTripById);
router.delete('/:id', deleteTrip);

export default router;