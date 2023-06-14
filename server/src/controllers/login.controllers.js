import { prisma } from '../lib/prisma.js';

const getUser = async (req, res) => {
  try {
    const login = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    });
    if (login.password !== req.params.password) {
      return res.status(404).send({ error: 'Wrong password' });
    }
    return login;
  } catch (error) {
    return res.status(404).send({ error: 'User not found' });
  } finally {
    await prisma.$disconnect();
  }
};

const getAllUsers = async (_req, _res) => {
  const users = await prisma.user.findMany();
  return users;
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
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send({ error: 'User cannot be deleted' });
  } finally {
    await prisma.$disconnect();
  }
};

export const loginController = { getUser, getAllUsers, createUser, deleteUser };
