import { RiListCheck2, RiTeamLine, RiTimeLine } from 'react-icons/ri';

const StatsSection = () => {
    const stats = [
        { name: 'Active Projects', value: '12', icon: RiListCheck2 },
        { name: 'Team Members', value: '24', icon: RiTeamLine },
        { name: 'Tasks in Progress', value: '38', icon: RiTimeLine },
      ];
    return (
        <div>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800 sm:p-6"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-indigo-100 p-3 dark:bg-indigo-900">
                <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
    );
};

export default StatsSection;