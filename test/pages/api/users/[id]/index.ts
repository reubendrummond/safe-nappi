import { NextApiHandler } from "next";
import { User } from "lib/types/backend";
import { StandardResponse } from "lib/types/shared";

const handler: NextApiHandler<StandardResponse<{ user: User }>> = (
  req,
  res
) => {
  const id = req.query.id;
  if (!id)
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: "Must define an id",
      },
    });

  const user: User = {
    id: Number(id),
    name: "Jeremy",
  };

  res.json({
    success: true,
    data: {
      user,
    },
  });
};

export default handler;
