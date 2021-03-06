import type { NextApiRequest, NextApiResponse } from "next";
import { StandardResponse } from "../../lib/types/shared";

export type UnsafeUserRes = StandardResponse<{
  id: number;
  name: string;
}>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UnsafeUserRes> // define return type using this generic
) {
  res.status(200).json({
    success: true,
    data: { id: 17, name: "John Doe" },
  });
}
