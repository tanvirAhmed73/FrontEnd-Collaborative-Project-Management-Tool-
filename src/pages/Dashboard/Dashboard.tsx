import React, {lazy, Suspense} from 'react'
import NotificationField from './components/AllUsers/AllUsers';

const HeadSection = lazy(() => import('./components/HeadSection/HeadSection'));
const StatsSection = lazy(() => import('./components/StatsSection/StatsSection')); 
const MainSection = lazy(() => import('./components/MainSection/MainSection'));


const Dashboard: React.FC = () => {


  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6 lg:p-8">
      {/* Header Section */}

      <Suspense fallback={<div>Loading...</div>}> {/* Display while loading */}
        <HeadSection/>
      </Suspense>


      <Suspense fallback={<div>Loading...</div>}>
        {/* Stats Section */}
        <StatsSection/>
      </Suspense>
      
      
      <Suspense fallback={<div>Loading...</div>}>
        {/* Main Content Grid */}
          <MainSection/>
      </Suspense>
      
      <NotificationField/>

    </div>
  );

};

export default Dashboard;
