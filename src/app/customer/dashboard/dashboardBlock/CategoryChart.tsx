import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const CategoryChart = () => {
    const data = [
        {
            name: 'Electrical',
            Total: 5,
            Completed: 0,
            amt: 1,
        },
        {
            name: 'Plumbing',
            Total: 2,
            Completed: 0,
            amt: 1,
        },
        {
            name: 'HVAC',
            Total: 3,
            Completed: 1,
            amt: 1,
        },
        {
            name: 'Carpenting',
            Total: 6,
            Completed: 1,
            amt: 1,
        },
        {
            name: 'Painting',
            Total: 4,
            Completed: 1,
            amt: 1,
        },
        {
            name: 'Others',
            Total: 6,
            Completed: 3,
            amt: 1,
        },
    ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Completed" fill="#82ca9d" />
                <Bar dataKey="Total" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
export default CategoryChart;
