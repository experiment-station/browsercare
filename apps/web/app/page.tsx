import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center min-h-screen">
      <div className="my-10">
        <Image
          className="border border-neutral-700 rounded-full"
          src="/logo.svg"
          alt="browsercare"
          width={120}
          height={120}
        />
      </div>
    </main>
  );
}
