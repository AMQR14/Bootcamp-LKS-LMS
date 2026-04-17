import { useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js/auto'

export default function StatsChart({ data }) {
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    useEffect(() => {
        if (chartRef.current) chartRef.current.destroy()

        const years = [2022, 2023, 2024, 2025, 2026]
        const counts = years.map(year => {
            const found = data.find(d => d.year === year)
            return found ? found.total : 0
        })

        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Students Joined',
                    data: counts,
                    backgroundColor: '#bed5df',
                    color : "#bed5df",
                    borderColor: '#A3BAC2',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: 'Students Joined (2022 - 2026)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0 } 
                    }
                }
            }
        })

        return () => chartRef.current.destroy()
    }, [data])

    return <canvas ref={canvasRef} />
}