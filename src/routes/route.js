import {Router} from "express";
import { getAllContacts, getMessages, saveMessage } from "../controllers/controller.js";

const router = Router();

router.get("/contactlist",getAllContacts);
//router.get("/contacts/:id",getContactById);
router.post("/messages/:id",saveMessage);
router.get("/messagelist",getMessages);

export default router;