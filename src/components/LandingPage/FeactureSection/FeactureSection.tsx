import {  RiTeamLine, RiTimeLine, RiNotificationLine } from 'react-icons/ri';

const FeactureSection = () => {
    const features = [
        {
          name: 'Team Collaboration',
          description: 'Work together seamlessly with your team members in real-time.',
          icon: RiTeamLine,
        },
        {
          name: 'Task Management',
          description: 'Create, assign, and track tasks with ease using our intuitive interface.',
          icon: RiTimeLine,
        },
        {
          name: 'Real-time Updates',
          description: 'Stay informed with instant notifications about project progress.',
          icon: RiNotificationLine,
        },
      ];
    return (
        <section id="features" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage projects effectively
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to help your team stay organized and productive
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default FeactureSection;