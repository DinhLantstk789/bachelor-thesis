import {useState} from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export default function Statistics() {
    const [data, setData] = useState([
        {year: 2016, score: 4000, 'Number of Articles': 2400, amt: 2400},
        {year: 2017, score: 3000, 'Number of Articles': 1398, amt: 2210},
        {year: 2018, score: 2000, 'Number of Articles': 9800, amt: 2290},
        {year: 2019, score: 2780, 'Number of Articles': 3908, amt: 2000},
        {year: 2020, score: 1890, 'Number of Articles': 4800, amt: 2181},
        {year: 2021, score: 300, 'Number of Articles': 3800, amt: 2500},
    ])
    return (
        <div style={{marginRight: 30, marginBottom: 30}}>
            <h6 style={{textAlign: 'center'}}>Number of publications over years</h6>
            <ResponsiveContainer className="chart" height={250}>
                <LineChart
                    height={300}
                    data={data}
                    margin={{top: 5, right: 20, bottom: 5}}>
                    <XAxis dataKey="year"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="Number of Articles" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="score" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>
            {/*<ResponsiveContainer height={250}>*/}
            {/*    <ComposedChart*/}
            {/*        height={400}*/}
            {/*        data={data}*/}
            {/*        margin={{*/}
            {/*            top: 20,*/}
            {/*            right: 20,*/}
            {/*            bottom: 20,*/}
            {/*            left: 20,*/}
            {/*        }}>*/}
            {/*        <CartesianGrid stroke="#f5f5f5"/>*/}
            {/*        <XAxis dataKey="year" scale="band"/>*/}
            {/*        <YAxis/>*/}
            {/*        <Tooltip/>*/}
            {/*        <Legend/>*/}
            {/*        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8"/>*/}
            {/*        <Bar dataKey="Number of Articles" barSize={20} fill="#413ea0"/>*/}
            {/*        <Line type="monotone" dataKey="score" stroke="#ff7300"/>*/}
            {/*    </ComposedChart>*/}
            {/*</ResponsiveContainer>*/}
        </div>
    )
}