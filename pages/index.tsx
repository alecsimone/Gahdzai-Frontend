import Home from '@/components/Foundation/Home/Home';
import runServerSideQueries from '@/utils/runServerSideQueries';

// interface indexProps {}

const HomePage = (): JSX.Element => <Home />;

export async function getServerSideProps(context: any) {
  return runServerSideQueries(context);
}

export default HomePage;
