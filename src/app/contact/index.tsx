import { faCalendarCheck, faCommentDots, faCommenting, faLaptop, faLightbulb, faListOl, faPhoneAlt, faTools } from "@fortawesome/free-solid-svg-icons";
type IdeaItemData = {
    title: string;
    paragraph: string;
    icon: any;
    className: string;
};
export const ideaItemDatas: IdeaItemData[] = [
    {
        title: 'Maintenance Services',
        paragraph: 'We provide comprehensive maintenance services to keep your property in top shape. From routine checks to urgent repairs, we’ve got you covered.',
        icon: faTools,
        className: 'idea-item-helper'
    },
    {
        title: 'Service Request',
        paragraph: 'Need maintenance? Let us know your requirements. Our team is available 24/7 to address your needs and provide timely solutions.',
        icon: faCalendarCheck,
        className: 'idea-item-text'
    },
    {
        title: 'Schedule a Visit',
        paragraph: 'Let’s set up a visit to discuss your maintenance needs and ensure we meet your expectations effectively.',
        icon: faPhoneAlt,
        className: 'idea-item-helper'
    },
    {
        title: 'Feedback/Suggestions',
        paragraph: 'Share your feedback or suggestions to help us improve our services. We value your input and strive to enhance your experience.',
        icon: faCommentDots,
        className: 'idea-item-text'
    }
];