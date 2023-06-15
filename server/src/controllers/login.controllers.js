import { prisma } from '../lib/prisma.js';

const getLogin = async (req, res) => {
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

export const loginController = { getLogin };
