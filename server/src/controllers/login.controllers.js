import { prisma } from "../lib/prisma.js";

const getUser = async (req, res) => {
  try {
  const login = await prisma.user.findUnique({
    where: {
      email: req.params.email,
    },
  });
  if (login.password !== req.params.password) {
    return res.status(404).send({ error: "Wrong password" });
  } 
    return login;
  } catch (error) {
    return res.status(404).send({ error: "User not found" });
  }
};

const getAllUsers = async (_req, _res) => {
  const users = await prisma.user.findMany();
  return users;
};

export const loginController = { getUser, getAllUsers };
