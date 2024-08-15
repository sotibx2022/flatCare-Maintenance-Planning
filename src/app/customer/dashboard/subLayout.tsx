'use client';
<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../../../useContext/themeContext';
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
import Navigation from './navigation/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from '../../../Redux/Store';
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
=======
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
interface SubLayoutProps {
  children: React.ReactNode;
}
const SubLayout: React.FC<SubLayoutProps> = ({ children }) => {
  const [hideSideBar, setHideSIdeBar] = useState(false);
  const toggleSidebar = () => {
    setHideSIdeBar(!hideSideBar);
  };
<<<<<<< HEAD
  const queryClient = new QueryClient()
=======
  const { state } = useContext(DarkModeContext);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
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
<<<<<<< HEAD
          <QueryClientProvider client={queryClient}>
            <section
              id="rightSide"
              className={hideSideBar ? 'expandRightSide' : 'collapseRightSide'}
            >
              {children}
            </section>
          </QueryClientProvider>
=======
          <section
            id="rightSide"
            className={hideSideBar ? 'expandRightSide' : 'collapseRightSide'}
          >
            {children}
          </section>
>>>>>>> b0c3e862adb56ff0b76a17c01abdaac6a64ff053
        </Provider>
      </div>
    </main>
  );
};
export default SubLayout;
