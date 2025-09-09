// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * API route handler.
 * @param {import('next').NextApiRequest} req - The request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
