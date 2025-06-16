import * as fs from "fs"
import * as path from "path"

// Path to your service account JSON file
const jsonPath = path.resolve(process.cwd(), "config/service-account.json")

try {
  // Read and parse the JSON file
  const serviceAccount = JSON.parse(fs.readFileSync(jsonPath, "utf8"))

  // Generate environment variable strings
  console.log("# Google Service Account Credentials")
  console.log(`GOOGLE_SERVICE_ACCOUNT_TYPE=${serviceAccount.type}`)
  console.log(`GOOGLE_SERVICE_ACCOUNT_PROJECT_ID=${serviceAccount.project_id}`)
  console.log(`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID=${serviceAccount.private_key_id}`)

  // For private key, we need to escape newlines
  const privateKey = serviceAccount.private_key.replace(/\n/g, "\\n")
  console.log(`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="${privateKey}"`)

  console.log(`GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=${serviceAccount.client_email}`)
  console.log(`GOOGLE_SERVICE_ACCOUNT_CLIENT_ID=${serviceAccount.client_id}`)
  console.log(`GOOGLE_SERVICE_ACCOUNT_AUTH_URI=${serviceAccount.auth_uri}`)
  console.log(`GOOGLE_SERVICE_ACCOUNT_TOKEN_URI=${serviceAccount.token_uri}`)
  console.log(`GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL=${serviceAccount.auth_provider_x509_cert_url}`)
  console.log(`GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL=${serviceAccount.client_x509_cert_url}`)
  console.log(`GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN=${serviceAccount.universe_domain || "googleapis.com"}`)

  console.log("\nCopy these environment variables to your .env.local file or add them to your Vercel project settings.")
} catch (error) {
  console.error("Error reading or parsing the service account JSON file:", error)
}
