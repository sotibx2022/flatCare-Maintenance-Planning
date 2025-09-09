import React from 'react';
import ProcessItem from './ProcessItem';
import CommonFooter from '../ui/footer/commonFooter/CommonFooter';
import CommonHeader from '../ui/header/commonHeader/CommonHeader';
const tasks = [
    {
        TaskTitle: "Create Notification",
        TaskDescription: "Generate a notification with details like urgency, issue, and instructions.",
        Role: "Customer",
    },
    {
        TaskTitle: "Approve Notification",
        TaskDescription: "Review and approve the customer’s notification for accuracy and completeness.",
        Role: "Planner",
    },
    {
        TaskTitle: "Site Visit",
        TaskDescription: "Visit the site to assess work needed, note resources, and record findings.",
        Role: "Technician",
    },
    {
        TaskTitle: "Request Material",
        TaskDescription: "Request necessary materials with specs, quantities, and special instructions.",
        Role: "Customer",
    },
    {
        TaskTitle: "Create Work Order",
        TaskDescription: "Prepare a work order outlining tasks, materials, instructions, and deadlines.",
        Role: "Planner",
    },
    {
        TaskTitle: "Order Material",
        TaskDescription: "Order required materials, confirm items and quantities, and verify delivery.",
        Role: "Planner",
    },
    {
        TaskTitle: "Approve Work Order",
        TaskDescription: "Review the planner’s work order and approve once details are correct.",
        Role: "Customer",
    },
    {
        TaskTitle: "Update Work Order Status",
        TaskDescription: "Update work order progress, note delays, and record changes if needed.",
        Role: "Planner",
    },
    {
        TaskTitle: "Complete Job",
        TaskDescription: "Perform the job as per work order and resolve issues during the process.",
        Role: "Technician",
    },
    {
        TaskTitle: "Complete Confirmation",
        TaskDescription: "Confirm job completion, ensuring work meets customer satisfaction.",
        Role: "Customer",
    },
    {
        TaskTitle: "Close Work Order",
        TaskDescription: "Close the work order, update documents, and complete follow-up tasks.",
        Role: "Planner",
    }
];
const ProcessItemsSection: React.FC = () => {
    return (
        <>
            <CommonHeader />
            <section id="processes" className='container timeline'>
                <div className='pageTitle'>
                    <h1 className='subHeading'>How it Works</h1>
                    <p>At Flatcare Maintenance, we ensure that managing and maintaining your property is as seamless and stress-free as possible. Here’s how our process works</p>
                </div>
                <div className='stepItemsWrapper'>
                    {tasks.map((process, index) => (
                        <ProcessItem
                            key={index}
                            taskTitle={process.TaskTitle}
                            taskDescription={process.TaskDescription}
                            role={process.Role}
                            index={index}
                        />
                    ))}
                </div>
            </section>
            <CommonFooter />
        </>
    );
};
export default ProcessItemsSection;
