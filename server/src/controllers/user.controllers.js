import { prisma } from '../lib/prisma.js';

const getAllUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    return res.status(404).send({ error: 'Users not found' });
  } finally {
    await prisma.$disconnect();
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(404).send({ error: 'User cannot be created' });
  } finally {
    await prisma.$disconnect();
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).send(user);
  } catch (error) {
    return res.status(404).send({ error: 'User cannot be deleted' });
  } finally {
    await prisma.$disconnect();
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send({ error: 'User cannot be updated' });
  } finally {
    await prisma.$disconnect();
  }
};

export const userController = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};
