import React from 'react';
import Classes from './LoadingBar.module.css';

function LoadingBar() {
  return (
    <div
      data-test='component-loading-bar'
      className={`container ${Classes.loadingBar}`}
    >
      <div className={`progress`}>
        <div className='indeterminate'></div>
      </div>
    </div>
  );
}

export default LoadingBar;
