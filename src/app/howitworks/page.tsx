import React from 'react';
import "../howitworks/howitworks.css";
import ProcessItem from './ProcessItem';
import CommonFooter from '../ui/footer/commonFooter/CommonFooter';
import CommonHeader from '../ui/header/commonHeader/CommonHeader';
const tasks = [
    {
        TaskTitle: "Create Notification",
        TaskDescription: "Generate a detailed notification based on the specific request submitted by the customer, including all relevant details such as urgency, description of the issue, and any specific instructions provided.",
        Role: "Customer",
    },
    {
        TaskTitle: "Approve Notification",
        TaskDescription: "Review and approve the notification created by the customer. Ensure all details are accurate and complete, and confirm that it meets the necessary requirements before moving forward.",
        Role: "Planner",
    },
    {
        TaskTitle: "Site Visit",
        TaskDescription: "Conduct an on-site visit to evaluate the current situation. Assess the scope of work required, identify any additional resources or materials needed, and document findings to facilitate further actions.",
        Role: "Technician",
    },
    {
        TaskTitle: "Request Material",
        TaskDescription: "Submit a request for the materials required for the job to the supplier. Include detailed specifications, quantities, and any special instructions to ensure the materials are suitable for the task at hand.",
        Role: "Customer",
    },
    {
        TaskTitle: "Create Work Order",
        TaskDescription: "Draft a comprehensive work order that outlines the tasks to be performed, the materials required, and any specific instructions or deadlines. Ensure the work order aligns with the customer’s request and requirements.",
        Role: "Planner",
    },
    {
        TaskTitle: "Order Material",
        TaskDescription: "Place an order for the materials specified in the work order. Verify that the order includes all necessary items and quantities, and follow up with the supplier to confirm delivery times and availability.",
        Role: "Planner",
    },
    {
        TaskTitle: "Approve Work Order",
        TaskDescription: "Review the work order created by the planner for accuracy and completeness. Ensure that all aspects of the job are correctly outlined and approve the work order to proceed with the next steps.",
        Role: "Customer",
    },
    {
        TaskTitle: "Update Work Order Status",
        TaskDescription: "Regularly update the status of the work order based on the progress of the tasks. Provide detailed information on completed activities, any delays or issues encountered, and any changes to the initial plan.",
        Role: "Planner",
    },
    {
        TaskTitle: "Complete Job",
        TaskDescription: "Carry out the job as specified in the work order. Ensure that all tasks are completed to the required standard, and address any issues or additional requirements that arise during the process.",
        Role: "Technician",
    },
    {
        TaskTitle: "Complete Confirmation",
        TaskDescription: "Verify and confirm the completion of the job from the customer’s perspective. Ensure that all aspects of the work meet the customer’s satisfaction and obtain formal confirmation that the job is finished.",
        Role: "Customer",
    },
    {
        TaskTitle: "Close Work Order",
        TaskDescription: "Finalize and close the work order after verifying that all tasks have been completed according to the specifications. Ensure all documentation is updated and filed appropriately, and perform any necessary follow-up tasks.",
        Role: "Planner",
    }
];
const ProcessItemsSection: React.FC = () => {
    return (
        <>
            <CommonHeader />
            <section id="processes" className='container timeline'>
                <div className='pageTitle'>
                    <h1 className='primary_heading'>How it Works</h1>
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
