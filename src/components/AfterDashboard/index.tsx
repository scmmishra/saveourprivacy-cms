import React from 'react';

import './index.scss';

const baseClass = 'after-dashboard';

const AfterDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <h4>Need Help?</h4>
      <p>
        This is the backend app that powers <a target="_blank" href="https://saveourprivacy.in">saveourprivacy.in</a>., in case you're facing any issues getting started,
        you can reach out to <a target="_blank" href="mailto:anushka@internetfreedom.in">Anushka</a> or <a target="_blank" href="mailto:hey@shivam.dev">Shivam</a>.
      </p>
    </div>
  );
};

export default AfterDashboard;
