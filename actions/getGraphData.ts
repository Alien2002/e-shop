import Prisma from '@/libs/prismadb'
import moment from 'moment'

export default async function getGraphData() {
    try {
        //getting start and end date for the data range(last 7 days).....
        const startDate = moment().subtract(6, 'days').startOf('day');
        const endDate = moment().endOf('day');

        //querying the database to get order data ordered by created date
        const result = await Prisma.order.groupBy({
            by: ["createdDate"],
            where: {
                createdDate: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString(),
                },
                status: 'completed'
            },
            _sum: {
                amount: true
            }
        })

        //initializing an object to aggregate the data by day
        const aggregatedData: {
            [day: string]: {day: string, date: string, totalAmount: number};
        } = {}

        //creating a clone of the start date to iterate over each day
        const currentDate = startDate.clone();

        //iterate over each day in the date range...
        while(currentDate <= endDate) {
            //formatting the day as a string (eg. MOnday)
            const day = currentDate.format('dddd')
            console.log("day<<<<", day, currentDate)

            //initializing the aggregate data for the day wit the day, date and total amount....
            aggregatedData[day] = {
                day,
                date: currentDate.format("YYYY-MM-DD"),
                totalAmount: 0
            }

            //moving to the next day.......
            currentDate.add(1, "day")
        }

        //calculating the total amount for each day by summing the order amounts....
        result.forEach((entry) => {
            const day = moment(entry.createdDate).format("dddd")
            const amount = entry._sum.amount || 0
            aggregatedData[day].totalAmount += amount 
        })

        //converting the aggregatedData to an array and sort it by date....
        const formattedData = Object.values(aggregatedData).sort((a, b) => 
            moment(a.date).diff(moment(b.date))
        ) 

        //returning the formatted data.........
        return formattedData;

    } catch (error: any) {
        throw new Error(error)
    }
}