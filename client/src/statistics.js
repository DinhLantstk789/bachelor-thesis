import {Component, Fragment} from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {ComposedChart, Area, Bar} from 'recharts'

class Statistics extends Component {
    static demoUrl = 'https://codesandbox.io/s/composed-chart-in-responsive-container-pkqmy';

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {year: 2016, score: 4000, 'Number of Articles': 2400, amt: 2400},
                {year: 2017, score: 3000, 'Number of Articles': 1398, amt: 2210},
                {year: 2018, score: 2000, 'Number of Articles': 9800, amt: 2290},
                {year: 2019, score: 2780, 'Number of Articles': 3908, amt: 2000},
                {year: 2020, score: 1890, 'Number of Articles': 4800, amt: 2181},
                {year: 2021, score: 300, 'Number of Articles': 3800, amt: 2500},
            ]
        }
    }

    render() {
        const {data} = this.state;

        return (
            <Fragment>
                <ResponsiveContainer className="chart" height={300}>
                    <LineChart
                        width={600}
                        height={300}
                        data={data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="year"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="Number of Articles" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="score" stroke="#82ca9d"/>
                    </LineChart>
                </ResponsiveContainer>
                <div style={{width: '100%', height: 300, marginTop: 30}}>
                    <ResponsiveContainer>
                        <ComposedChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="year" scale="band"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8"/>
                            <Bar dataKey="Number of Articles" barSize={20} fill="#413ea0"/>
                            <Line type="monotone" dataKey="score" stroke="#ff7300"/>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </Fragment>

        );
    }
}


export default Statistics;