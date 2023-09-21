import express from 'express';
import workshifts_g from './Shifts/controller/Shift_g.js';
const router = express.Router();

router.use('/shifts-g', workshifts_g);

export default  router;