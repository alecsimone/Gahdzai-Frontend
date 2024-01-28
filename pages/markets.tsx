import Markets from '@/components/Markets/Markets';
import runServerSideQueries from '@/utils/runServerSideQueries';

// interface indexProps {}

const HomePage = (): React.ReactNode => <Markets />;

export async function getServerSideProps(context: any) {
  return runServerSideQueries(context);
}

export default HomePage;
