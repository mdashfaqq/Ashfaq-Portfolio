import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { Resend } from "resend";

function resendDevPlugin(apiKey?: string): Plugin {
  return {
    name: "resend-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if ((req.url === "/api/send" || req.url === "/api/contact") && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    error: "RESEND_API_KEY is not configured in .env file",
                  })
                );
                return;
              }

              const resend = new Resend(apiKey);
              const data = JSON.parse(body || "{}");
              const { name, email, message, subject } = data;

              if (!email || !message) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Email and message are required" }));
                return;
              }

              const fromAddress =
                process.env.RESEND_FROM_EMAIL ||
                process.env.FROM_EMAIL ||
                "Mohamed Ashfaq Portfolio <onboarding@resend.dev>";

              const result = await resend.emails.send({
                from: fromAddress,
                to: "ash47306@gmail.com",
                replyTo: email,
                subject: subject || `Portfolio Inquiry from ${name || "Visitor"}`,
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff;">
                    <h2 style="color: #111; margin-top: 0; font-size: 20px; border-bottom: 2px solid #D62F27; padding-bottom: 8px;">New Message from Portfolio</h2>
                    <div style="margin: 16px 0;">
                      <p style="margin: 6px 0;"><strong>Name:</strong> ${name || "Anonymous"}</p>
                      <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #D62F27;">${email}</a></p>
                      <p style="margin: 6px 0;"><strong>Subject:</strong> ${subject || "Portfolio Inquiry"}</p>
                    </div>
                    <div style="margin-top: 20px; padding: 16px; background: #f7f7f8; border-radius: 8px; border-left: 4px solid #D62F27;">
                      <p style="margin: 0; font-size: 14px; color: #333; white-space: pre-wrap;">${(message || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 16px 0;" />
                    <p style="font-size: 12px; color: #888; margin: 0;">Sent via Resend from your portfolio website</p>
                  </div>
                `,
              });

              if (result.error) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: result.error.message || "Failed to send email" }));
                return;
              }

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, data: result.data }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message || "Internal server error" }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.RESEND_API_KEY || env.resend || env.RESEND || process.env.RESEND_API_KEY || process.env.resend || process.env.RESEND;

  return {
    plugins: [react(), tailwindcss(), resendDevPlugin(apiKey)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "framer-motion"],
          },
        },
      },
    },
  };
});
