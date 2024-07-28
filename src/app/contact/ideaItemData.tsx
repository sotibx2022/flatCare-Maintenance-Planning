import { faCommenting, faLaptop, faLightbulb, faListOl } from "@fortawesome/free-solid-svg-icons";
type IdeaItemData = {
    title: string;
    paragraph: string;
    icon: any;
    className: string;
};
export const ideaItemDatas: IdeaItemData[] = [
    {
        title: 'Project Idea',
        paragraph: 'I am always excited to explore new innovative ideas to convert your dream to reality. Let’s open the topic!',
        icon: faLightbulb,
        className: 'idea-item-helper'
    },
    {
        title: 'Project Requirement',
        paragraph: 'What are you looking for? How can we work together? Kindly drop a message. I am available 24/7 for your requirements.',
        icon: faListOl,
        className: 'idea-item-text'
    },
    {
        title: 'Online Meeting',
        paragraph: 'Communication is key to deliver the project exactly as per your requirements. Let’s ensure our best time.',
        icon: faLaptop,
        className: 'idea-item-helper'
    },
    {
        title: 'Feedback/Suggestions',
        paragraph: 'Raise any issues with your project frankly. I always appreciate your reviews to move ahead with more productivity.',
        icon: faCommenting,
        className: 'idea-item-text'
    }
];