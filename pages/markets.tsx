import Markets from '@/components/Markets/Markets';
import runServerSideQueries from '@/utils/runServerSideQueries';

// interface indexProps {}

const MarketsPage = (): React.ReactNode => <Markets />;

export async function getServerSideProps(context: any) {
  return runServerSideQueries(context);
}

export default MarketsPage;
