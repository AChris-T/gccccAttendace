import Chart from "react-apexcharts";
import { useFirstTimerStore } from "../../../store/firstTimer.store";
import { useEffect } from "react";
import { BarChartSkeleton } from "../../skeleton";
import { barChartOptions, barChartOptions2 } from "../../../utils/constant";


const FirstTimersData = () => {
    const { total_first_timers, integrated_first_timers, loading, getAnalytics } = useFirstTimerStore()

    useEffect(() => {
        getAnalytics()
    }, [])

    const seriesOne = [
        {
            name: "First Timers",
            data: total_first_timers || [],
        },
    ];
    const seriesTwo = [
        {
            name: "Integrated First Timers",
            data: integrated_first_timers || [],
        },
    ];

    if (loading) return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <BarChartSkeleton />
                <BarChartSkeleton />
            </div>
        </>
    )
    return (<>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <p>Monthly First Timers</p>
                <Chart options={barChartOptions} series={seriesOne} type="bar" height={180} />
            </div>
            <div>
                <p>Monthly Integrated First Timers</p>
                <Chart options={barChartOptions2} series={seriesTwo} type="bar" height={180} />
            </div>
        </div>
    </>
    )
}

export default FirstTimersData