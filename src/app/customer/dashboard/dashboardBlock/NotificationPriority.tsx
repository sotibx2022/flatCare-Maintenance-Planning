import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
const NotificationPriority = () => {
    const data = [
        { name: 'Normal', value: 13 },
        { name: 'Urgent', value: 10 },
        { name: 'Emergency', value: 3 },
    ];
    const COLORS = ['#90ee90', '#ffd700', '#ffcccb'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div style={{ width: '100%', height: '90%', position: 'relative', marginTop: '-1rem' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius="80%"
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginTop: '10px', position: 'absolute', bottom: '0', width: '100%' }}>
                {data.map((entry, index) => (
                    <div key={`legend-${index}`} style={{ display: 'inline-block', marginRight: '20px' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                backgroundColor: COLORS[index % COLORS.length],
                                marginRight: '5px',
                            }}
                        ></span>
                        {entry.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default NotificationPriority;
