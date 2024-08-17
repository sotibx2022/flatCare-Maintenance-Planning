"use client"
import IdeaItem from './IdeaItem';
import "../contact/contact.css";
import ContactForm from "./ContactForm";
import { ideaItemDatas } from './ideaItemData';
import CommonFooter from '../ui/footer/commonFooter/CommonFooter';
import CommonHeader from '../ui/header/commonHeader/CommonHeader';
const Contact = () => {
    return (
        <>
            <CommonHeader />
            <section id="contact-section" className='container'>
                <h1 className='subHeading'>Contact Area</h1>
                <h1 className="primary_heading">Lets Connect to address your Idea !! </h1>
                <div className='contactSections'>
                    <div className="idea-items">
                        {ideaItemDatas.map((item, index) => (
                            <IdeaItem
                                key={index}
                                title={item.title}
                                paragraph={item.paragraph}
                                icon={item.icon}
                                className={item.className}
                            />
                        ))}
                    </div>
                    <ContactForm />
                </div>
            </section>
            <CommonFooter />
        </>
    );
};
export default Contact;
