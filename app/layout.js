import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "App de tareas con Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
