import React from 'react';
import "./../commonFooter/commonFooter.css";
import Link from 'next/link';
const maintenanceCategories = [
    {
        categoryTitle: "Plumbing",
        categoryIcon: "🚰"
    },
    {
        categoryTitle: "Electrical",
        categoryIcon: "💡"
    },
    {
        categoryTitle: "HVAC",
        categoryIcon: "🌬️"
    },
    {
        categoryTitle: "Carpentry",
        categoryIcon: "🔨"
    },
    {
        categoryTitle: "Painting",
        categoryIcon: "🎨"
    },
    {
        categoryTitle: "Cleaning and Hygiene",
        categoryIcon: "🧹"
    },
    {
        categoryTitle: "Pest Control",
        categoryIcon: "🐜"
    },
    {
        categoryTitle: "Appliance Repair",
        categoryIcon: "🔧"
    },
    {
        categoryTitle: "Security Systems",
        categoryIcon: "🔒"
    },



    {
        categoryTitle: "Flooring",
        categoryIcon: "🪵"
    },

    {
        categoryTitle: "Waste Management",
        categoryIcon: "🚮"
    },
    {
        categoryTitle: "Interior Design",
        categoryIcon: "🛋️"
    },

];

const CommonFooter = () => {
    return (
        <div className='categoreis_wrapper flex_items container'>
            {maintenanceCategories.map((category, index) => {
                return <Link href={`/${category.categoryTitle.toLocaleLowerCase().replace(/ /g,'-')}`} className='category_wrapper flex_items' key={index}>
                    <p>{category.categoryTitle}</p>
                    <span>{category.categoryIcon}</span>
                </Link>
            })}
        </div>
    )
}

export default CommonFooter