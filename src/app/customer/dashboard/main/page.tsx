'use client';
import NotificationStatus from '../dashboardBlock/NotificationStatus';
import NotificationPriority from '../dashboardBlock/NotificationPriority';
import NotificationCategory from '../dashboardBlock/NotificationCategory';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <section className="dashboard_main_block notificationsbyCategory">
        <h2 className="primary_heading">Notifications By Category</h2>
        <NotificationCategory />
      </section>
      <section className=" statusBlock secondary_block">
        <h2 className="primary_heading">Notifications By Status</h2>
        <NotificationStatus />
      </section>
      <section className=" priorityBlock secondary_block">
        <h2 className="primary_heading">Notifications By Priority</h2>
        <NotificationPriority />
      </section>
      <section className=" emailsBlock secondary_block">
        <h2 className="primary_heading">Work Flow Emails</h2>
        <p className="secondary_heading">
          There are no workflow emails yet for your action.
        </p>
      </section>
      <section className="secondary_block">
        <div className=" materialsManagementBlock ">
          <h2 className="primary_heading">Material Management</h2>
          <p className="secondary_heading">
            There are no materials ordered yet by planner for your notification.
          </p>
        </div>
        <div className=" ordersManagementBlock ">
          <h2 className="primary_heading">Orders Management</h2>
          <p className="secondary_heading">
            There are no work orders created yet by planner for your
            notification.
          </p>
        </div>
      </section>
    </div>
  );
};
export default Dashboard;
