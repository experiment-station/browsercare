import { Project } from '../components/project';

export default function Page({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: {
    period?: string;
  };
}) {
  return <Project id={params.id} period={searchParams.period} />;
}
