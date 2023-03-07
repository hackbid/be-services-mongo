const UserController = require("../controllers");
router = require("express").Router();

//routing untuk collection itemImages
router.get("/itemImages/:id", UserController.getItemImages);
router.post("/itemImages/:id", UserController.postImage);

//routing untuk collection itemHistory
router.get("/itemHistory/:id", UserController.getItemHistory);

//routing untuk menambah chat baru
router.post("/itemHistory/:id/chat", UserController.postChat);

//routing untuk menambah bidhistory baru
router.post("/itemHistory/:id/bid", UserController.postBid);

//reuting untuk menambah reporting
router.get("/reporting", UserController.getReporting);
router.post("/reporting", UserController.postReporting);

//routing delete reporting
router.delete("/reporting/:id", UserController.deleteReporting);

module.exports = router;
