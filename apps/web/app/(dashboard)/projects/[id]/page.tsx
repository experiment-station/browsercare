import { Project } from '../components/Project';

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
