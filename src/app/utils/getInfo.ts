import { UAParser } from "ua-parser-js";

export const getClientInfo = async (req: any) => {
  // IP
  let ip = "";

  // Device
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();

  const device = `${result.browser.name} on ${result.os.name}`;

  // Time
  const time = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
  });

  // Location (optional)
  let location = "Unknown";
  try {
    const res = await fetch(`http://ip-api.com/json`);
    const data = await res.json();
    location = `${data.city}, ${data.country}`;
    ip = data.query;
  } catch {}

  return { ip, device, time, location };
};
