const router = require("express").Router();
const { getAllBooks, getBookById, AddBook, DeleteBook, getIdBookByName, getIdBookByNameNotOk, getAdsByFilters } = require("../controllers/books.controller")
const { getAllUsers, getUserById, AddUser, DeleteUser, getUserByPassword, UpdateUserToManager } = require("../controllers/users.controller")
const { getAllAds, getAdById, getAllOkAds, getFirstOkAd, AddAd, DeleteAd, getAdsByCategory, getAllAdsToConfirm, ConfirmAdById } = require("../controllers/ads.controller");
const { getAllcities, getCityById } = require("../controllers/cities.controller");
const { getAllneighberhoods, getNeighberhoodById } = require("../controllers/neighberhoods.controller");
const { addIntrested, getAllIntrestedByuserId, getAdsIdOrderByUserIntrested } = require("../controllers/intrestedCat.controller")
const { getAllPublishings } = require("../controllers/publishings.controller")
const { getAllcategories } = require("../controllers/categories.controller")
// const {getAdsByFilters} = require("../controllers/books.controller")
const { getAllWriters } = require("../controllers/writers.controller")
const { sendMail } = require("../controllers/sendEmail")


router.get("/getAllBooks", getAllBooks);
router.get("/getBookById/:id", getBookById);
router.get("/getIdBookByName/:id", getIdBookByName);
router.get("/getIdBookByNameNotOk/:id", getIdBookByNameNotOk);
router.post("/AddBook", AddBook);
router.post("/DeleteBook", DeleteBook);
//router.post("/UpdateRoom", UpdateRoomName);

router.post("/getAdsByFilters", getAdsByFilters);
//router.post("/UpdateRoom", UpdateRoomName);

router.get("/getAllUsers", getAllUsers);
router.get("/getAllCities", getAllcities);
router.get("/getAllPublishings", getAllPublishings);
router.get("/getAllWriters", getAllWriters);
router.get("/getAllCategories", getAllcategories);

// router.get("/getAdsByFilters", getAdsByFilters);

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.post("/getUserByPassword", getUserByPassword);
router.post("/AddUser", AddUser);

router.post("/DeleteUser/:id", DeleteUser);
router.post("/UpdateUserToManager/:id", UpdateUserToManager);
//router.post("/UpdateNameCustomer", UpdateNameCustomer);

router.get("/getAllAds", getAllAds);
router.get("/getAllOkAds", getAllOkAds);
router.get("/getAdById/:id", getAdById);
router.post("/AddAd", AddAd);
router.post("/DeleteAd/:id", DeleteAd);
router.get("/getFirstOkAd", getFirstOkAd)
router.get("/getAdsByCategory/:id", getAdsByCategory);

router.get("/getAllcities", getAllcities)
router.get("/getCityById/:id", getCityById);

router.get("./getAllneighberhoods", getAllneighberhoods)
router.get("/getNeighberhoodById/:id", getNeighberhoodById);

router.post("/addIntrested", addIntrested)
router.get("/getAllIntrestedByuserId/:id", getAllIntrestedByuserId);
router.get("/getAdsIdOrderByUserIntrested/:id", getAdsIdOrderByUserIntrested);
router.get("/getAllAdsToConfirm", getAllAdsToConfirm);
router.post("/ConfirmAdById/:id", ConfirmAdById)

router.post("/sendmail", sendMail)
module.exports = router;