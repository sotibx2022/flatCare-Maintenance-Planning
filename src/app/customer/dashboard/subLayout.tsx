'use client';
import React, { useState } from 'react';
import Navigation from './navigation/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from '../../../Redux/Store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
interface SubLayoutProps {
  children: React.ReactNode;
}
const SubLayout: React.FC<SubLayoutProps> = ({ children }) => {
  const [hideSideBar, setHideSIdeBar] = useState(false);
  const toggleSidebar = () => {
    setHideSIdeBar(!hideSideBar);
  };
  const queryClient = new QueryClient()
  return (
    <main>
      <div className="layoutContainer dashboardContainer">
        <section
          id="leftSide"
          className={hideSideBar ? 'hideSideBar' : 'showSideBar'}
        >
          <div onClick={toggleSidebar} className="responsiveDashboardIcon">
            {' '}
            <FontAwesomeIcon
              icon={hideSideBar ? faChevronRight : faChevronLeft}
            />
          </div>
          <Navigation hideSideBar={hideSideBar} />
        </section>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <section
              id="rightSide"
              className={hideSideBar ? 'expandRightSide' : 'collapseRightSide'}
            >
              {children}
            </section>
          </QueryClientProvider>
        </Provider>
      </div>
    </main>
  );
};
export default SubLayout;
