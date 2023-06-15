import { userController } from '../controllers/user.controllers.js';

export async function userRouter(app) {
  app.get('/users', userController.getAllUsers);
  app.post('/users', userController.createUser);
  app.delete('/users/:id', userController.deleteUser);
  app.put('/users/:id', userController.updateUser);
}
