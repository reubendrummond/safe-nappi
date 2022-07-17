import { User } from "lib/types/backend";
import { StandardResponse } from "lib/types/shared";
import {SafeNappiApiHandler} from "safe-nappi";

const handler: SafeNappiApiHandler<StandardResponse<{ user: User }>, "id"> = (
  req,
  res
) => {
  const id = req.query.id;
  if (typeof id !== "string")
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
