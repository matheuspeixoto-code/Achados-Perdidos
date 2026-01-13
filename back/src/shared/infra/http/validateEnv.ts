import "dotenv/config";

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

function validateEnv() {
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    console.error(
      "❌ Variáveis de ambiente faltando:",
      missingEnvVars.join(", ")
    );
    console.error(
      "Certifique-se de que as seguintes variáveis estão configuradas:"
    );
    missingEnvVars.forEach((envVar) => {
      console.error(`  - ${envVar}`);
    });

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  } else {
    console.log("✅ Todas as variáveis de ambiente obrigatórias foram configuradas");
  }
}

export default validateEnv;
