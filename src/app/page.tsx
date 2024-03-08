import Form from "./components/Form";

export default function Home() {
  return (
    <main className="flex flex-col justify-center min-h-screen max-w-md mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4 text-white">
        Connexion
      </h1>
      <Form />
    </main>
  );
}
