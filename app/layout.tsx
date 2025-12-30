import "../styles/globals.css";

export const metadata = {
  title: "La Senda — App",
  description: "Versión digital del programa"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-3xl px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
