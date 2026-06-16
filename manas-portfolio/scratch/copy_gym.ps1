# Create root folders
New-Item -ItemType Directory -Force -Path "D:\apex-gym-hub\frontend"
New-Item -ItemType Directory -Force -Path "D:\apex-gym-hub\backend"

# Copy frontend source files (excluding node_modules/dist)
Copy-Item -Path "D:\Wedding business\gym-app\*" -Destination "D:\apex-gym-hub\frontend\" -Recurse -Force -Exclude "node_modules","dist"

# Copy backend configuration files
Copy-Item -Path "D:\Wedding business\manas-portfolio\package.json" -Destination "D:\apex-gym-hub\backend\" -Force
Copy-Item -Path "D:\Wedding business\manas-portfolio\package-lock.json" -Destination "D:\apex-gym-hub\backend\" -Force
Copy-Item -Path "D:\Wedding business\manas-portfolio\next.config.ts" -Destination "D:\apex-gym-hub\backend\" -Force
Copy-Item -Path "D:\Wedding business\manas-portfolio\tsconfig.json" -Destination "D:\apex-gym-hub\backend\" -Force
Copy-Item -Path "D:\Wedding business\manas-portfolio\eslint.config.mjs" -Destination "D:\apex-gym-hub\backend\" -Force
Copy-Item -Path "D:\Wedding business\manas-portfolio\postcss.config.mjs" -Destination "D:\apex-gym-hub\backend\" -Force
Copy-Item -Path "D:\Wedding business\manas-portfolio\.env.local" -Destination "D:\apex-gym-hub\backend\" -Force
Copy-Item -Path "D:\Wedding business\manas-portfolio\gym_db.json" -Destination "D:\apex-gym-hub\backend\" -Force
Copy-Item -Path "D:\Wedding business\manas-portfolio\.gitignore" -Destination "D:\apex-gym-hub\backend\" -Force

# Create src/lib and copy contents
New-Item -ItemType Directory -Force -Path "D:\apex-gym-hub\backend\src\lib"
Copy-Item -Path "D:\Wedding business\manas-portfolio\src\lib\*" -Destination "D:\apex-gym-hub\backend\src\lib\" -Recurse -Force

# Create src/app/api/gym and copy route handlers
New-Item -ItemType Directory -Force -Path "D:\apex-gym-hub\backend\src\app\api\gym"
Copy-Item -Path "D:\Wedding business\manas-portfolio\src\app\api\gym\*" -Destination "D:\apex-gym-hub\backend\src\app\api\gym\" -Recurse -Force

# Create public/gym-app and copy compiled assets
New-Item -ItemType Directory -Force -Path "D:\apex-gym-hub\backend\public\gym-app"
Copy-Item -Path "D:\Wedding business\manas-portfolio\public\gym-app\*" -Destination "D:\apex-gym-hub\backend\public\gym-app\" -Recurse -Force

# Create a simplified index page.tsx to redirect root URL to /gym-app/
New-Item -ItemType Directory -Force -Path "D:\apex-gym-hub\backend\src\app"
Set-Content -Path "D:\apex-gym-hub\backend\src\app\page.tsx" -Value 'import { redirect } from "next/navigation";

export default function Home() {
  redirect("/gym-app/");
}' -Force

# Create a layout.tsx to wrap the Next.js app page
Set-Content -Path "D:\apex-gym-hub\backend\src\app\layout.tsx" -Value 'export const metadata = {
  title: "Apex Gym Hub API Server",
  description: "Bespoke SaaS operational core",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#09090b", color: "#f4f4f5", fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}' -Force
