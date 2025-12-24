module.exports = {
  apps: [
    {
      name: "Helace",
      script: "npm",
      args: "run preview -- --port=4173",
      env: {
        PORT: 4173,
      },
    },
  ],
};
