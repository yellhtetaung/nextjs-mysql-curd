import { prisma } from "@/config/db";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return await getUser(req, res);
    case "PUT":
      return await updateUser(req, res);
    case "DELETE":
      return await deleteUser(req, res);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.query;

    const result = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const { userId } = req.query;

    await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: { username, email },
    });

    return res.status(200).json({ username, email, userId });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.query;

    const result = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default handler;
