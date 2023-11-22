import { Project } from "../components/Project";

export default function Page({ params }: { params: { id: number } }) {
  return <Project id={params.id} period="7d" />;
}
