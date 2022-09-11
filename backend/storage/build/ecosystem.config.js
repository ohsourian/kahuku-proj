/* ecosystem.config.js */
module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      ignore_watch: ["dist", "node_modules", "storage", "tests"],
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
