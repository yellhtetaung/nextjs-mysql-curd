import { prisma } from "@/config/db";

const handler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      return await deleteMulti(req, res);
  }
};

const deleteMulti = async (req, res) => {
  try {
    const { ids } = req.body;

    await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return res.status(200).json({ success: "delete multi", ids: ids });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default handler;
