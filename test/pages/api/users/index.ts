import { NextApiHandler } from "next";
import { User } from "lib/types/backend";
import { StandardResponse } from "~/lib/types/shared";

const handler: NextApiHandler<StandardResponse<{ users: User[] }>> = (
  req,
  res
) => {
  const users: User[] = [
    {
      id: 1,
      name: "Jeremy",
    },
    {
      id: 2,
      name: "Betty",
    },
  ];

  if (Math.random() < 0.5)
    return res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "There was an error on the backend!",
      },
    });

  return res.status(200).json({
    success: true,
    data: {
      users,
    },
  });
};

export default handler;
