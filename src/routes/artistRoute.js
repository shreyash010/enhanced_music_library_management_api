const express = require('express'); const {
  getArtists,
  getArtistById,
  addArtist,
  updateArtist,
  deleteArtist
} = require('../controllers/artistController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const Constants = require('../utils/constants')

const router = express.Router();

router.get('/artists', roleMiddleware([Constants.ROLES.ADMIN, Constants.ROLES.EDITOR, Constants.ROLES.VIEWER]), getArtists);
router.get('/artists/:id', roleMiddleware([Constants.ROLES.ADMIN, Constants.ROLES.EDITOR, Constants.ROLES.VIEWER]), getArtistById);
router.post('/artists/add-artist', roleMiddleware([Constants.ROLES.ADMIN, Constants.ROLES.EDITOR]), addArtist);
router.put('/artists/:id', roleMiddleware([Constants.ROLES.ADMIN, Constants.ROLES.EDITOR]), updateArtist);
router.delete('/artists/:id', roleMiddleware([Constants.ROLES.ADMIN, Constants.ROLES.EDITOR]), deleteArtist);

module.exports = router;
