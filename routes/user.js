const router = require("express").Router()

const authController = require("./../controllers/authControllers")
const userController = require("./../controllers/userController")

router.use(authController.protect)

router.get("/me",userController.getMe);
router.patch("/me",userController.updateMe);
router.patch("/avatar",userController.updateAvatar);
router.patch("/password",userController.updatePassword)

router.get("/users",userController.getUsers)
router.post("/start-conversation",userController.startConversation)
router.get("/conversations",userController.getConversations)

module.exports = router;