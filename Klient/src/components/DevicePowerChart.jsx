import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../ThemeContext';

const DevicePowerChart = ({ devices }) => {
    const { theme } = useTheme();
    const activeDevices = devices.filter(d => d.is_active && d.power_watts > 0);

    if (activeDevices.length === 0) {
        return (
            <div className="text-center text-muted py-4">
                <p className="mb-0">Brak aktywnych urządzeń do wyświetlenia na wykresie.</p>
                <small>Włącz jakieś urządzenie, aby zobaczyć jego zużycie mocy.</small>
            </div>
        );
    }

    const data = activeDevices.map(d => ({
        name: d.name,
        value: d.power_watts
    }));

    const COLORS = [
        '#36A2EB', // Blue
        '#FF6384', // Red
        '#FFCE56', // Yellow
        '#4BC0C0', // Teal
        '#9966FF', // Purple
        '#FF9F40', // Orange
    ];

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                                stroke={theme === 'dark' ? '#343a40' : '#fff'}
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#2b3035' : '#fff',
                            borderColor: theme === 'dark' ? '#495057' : '#dee2e6',
                            borderRadius: '0.375rem',
                            color: theme === 'dark' ? '#f8f9fa' : '#212529'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#f8f9fa' : '#212529' }}
                    />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value) => <span style={{ color: theme === 'dark' ? '#f8f9fa' : '#212529' }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DevicePowerChart;