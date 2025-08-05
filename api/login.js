
export default function handler(req, res) {
  if (req.method === "POST") {
    const { pin } = req.body;
    if (pin === "234432") {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } else {
    res.status(405).end();
  }
      }
