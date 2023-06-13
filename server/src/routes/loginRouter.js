import { loginController } from '../controllers/login.controllers.js';

export async function loginRouter(app) {
  app.get('/users', loginController.getAllUsers);
  app.get('/users/:email/:password', loginController.getUser);
}; 