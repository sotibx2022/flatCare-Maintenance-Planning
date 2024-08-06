import {
    faDatabase,
    faRocket,
    faSearch,
    faTools,
    faWrench,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
interface Service {
    title: string;
    altTag: string;
    serviceSubtitle: string,
    serviceDescription: string[];
    icon: IconDefinition;
}
export const services: Service[] = [
    {
        title: 'Preventive Maintenance',
        altTag: 'Preventive Maintenance',
        serviceSubtitle: 'Comprehensive Maintenance Strategy for Equipment Longevity',
        serviceDescription: [
            'Ensure equipment longevity with our preventive maintenance.',
            'Regular inspections help avoid unexpected failures.',
            'Minimize downtime and boost efficiency with our services.',
            'Stay proactive and ahead of potential issues.'
        ],
        icon: faTools,
    },
    {
        title: 'Asset Management',
        altTag: 'Asset Management',
        serviceSubtitle: 'Streamlined Solutions for Effective Asset Lifecycle Management',
        serviceDescription: [
            'Optimize asset lifecycle with our management solutions.',
            'Track and maintain assets from start to end.',
            'Make informed decisions for better operational goals.',
            'Enhance asset use and cut costs efficiently.'
        ],
        icon: faDatabase,
    },
    {
        title: 'Emergency Repairs',
        altTag: 'Emergency Repairs',
        serviceSubtitle: 'Quick and Reliable Repairs for Unexpected Equipment Failures',
        serviceDescription: [
            'Rapid response for unexpected breakdowns.',
            'Minimize disruptions with our swift repairs.',
            'Expert handling for urgent issues.',
            'Available 24/7 for quick restoration.'
        ],
        icon: faWrench,
    },
    {
        title: 'Facility Inspection',
        altTag: 'Facility Inspection',
        serviceSubtitle: 'In-Depth Inspections to Ensure Safety and Compliance',
        serviceDescription: [
            'Identify issues with thorough facility inspections.',
            'Ensure safety and compliance with standards.',
            'Receive detailed reports and recommendations.',
            'Maintain a secure and efficient environment.'
        ],
        icon: faSearch,
    },
];