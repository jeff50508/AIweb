
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function LineDemo({ historydata,selectedStock }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [keysarray, setKeysArray] = useState([]);
    const [valuesarray, setValuesArray] = useState([]);

    console.log(historydata);
    useEffect(() => {
        if (historydata && historydata.data && historydata.data.Close) {
            const closeData = historydata.data.Close;
            const keys = Object.keys(closeData);
            const values = Object.values(closeData);
            setKeysArray(keys);
            setValuesArray(values);
        }
    }, [historydata]);
    console.log(historydata)
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        console.log(keysarray)
        console.log(valuesarray)
        const data = {
            labels: keysarray,
            datasets: [
                {
                    label: selectedStock,
                    data: valuesarray,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'predict',
                    data: valuesarray,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [historydata]);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
        