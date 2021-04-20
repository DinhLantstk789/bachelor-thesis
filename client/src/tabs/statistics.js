import React, {Fragment, useState} from "react";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts'
import {Row} from "shards-react";


export default function Statistics() {
    const [data, setData] = useState([
        {
            name: "2010",
            firstTerm: 4000,
            secondTerm: 4000,
            article: 4000,
            conferenceWorkshop: 2400,
            technicalReport: 2400,
            bookSection: 2400,
            book: 2400,
            thesis: 2400,
            patent: 2400,
            image: 2400,
            video: 2400,
            dataset: 2400,
            experiment: 2400,
            teachingResource: 2400,
            projectGrant: 2400,
        },
        {
            name: "2011",
            firstTerm: 4000,
            secondTerm: 4000,
            article: 4000,
            conferenceWorkshop: 2400,
            technicalReport: 2400,
            bookSection: 2400,
            book: 2400,
            thesis: 2400,
            patent: 2400,
            image: 2400,
            video: 2400,
            dataset: 2400,
            experiment: 2400,
            teachingResource: 2400,
            projectGrant: 2400,
        },
        {
            name: "2012",
            firstTerm: 4000,
            secondTerm: 4000,
            article: 4000,
            conferenceWorkshop: 2400,
            technicalReport: 2400,
            bookSection: 2400,
            book: 2400,
            thesis: 2400,
            patent: 2400,
            image: 2400,
            video: 2400,
            dataset: 2400,
            experiment: 2400,
            teachingResource: 2400,
            projectGrant: 2400,
        },
        {
            name: "2013",
            firstTerm: 4000,
            secondTerm: 4000,
            article: 4000,
            conferenceWorkshop: 2400,
            technicalReport: 2400,
            bookSection: 2400,
            book: 2400,
            thesis: 2400,
            patent: 2400,
            image: 2400,
            video: 2400,
            dataset: 2400,
            experiment: 2400,
            teachingResource: 2400,
            projectGrant: 2400,
        },
        {
            name: "2014",
            firstTerm: 4000,
            secondTerm: 4000,
            article: 4000,
            conferenceWorkshop: 2400,
            technicalReport: 2400,
            bookSection: 2400,
            book: 2400,
            thesis: 2400,
            patent: 2400,
            image: 2400,
            video: 2400,
            dataset: 2400,
            experiment: 2400,
            teachingResource: 2400,
            projectGrant: 2400,
        }
    ]);

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            let firstTerm = '', secondTerm = '';
            data.forEach(d => {
                if (label === d.name) {
                    firstTerm = d.firstTerm;
                    secondTerm = d.secondTerm;
                }
            })
            return (
                <div style={{backgroundColor: '#FFFFFF', opacity: 0.6, padding: 10}}>
                    <h6 className="label">{`Total publications in ${label}: ${payload[0].value}`}</h6>
                    <b>First term: </b>{firstTerm} ({firstTerm / (firstTerm + secondTerm) * 100})%<br/>
                    <b>Second term: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%<br/>
                    <br/>
                    <span style={{color: '#8884d8'}}><b>Article: </b>{firstTerm} ({firstTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#82ca9d'}}><b>Conference or Workshop Item: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#ffc658'}}><b>Technical Report: </b>{firstTerm} ({firstTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#E0B474'}}><b>Book section: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#AFB0A8'}}><b>Book: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#9B6155'}}><b>Thesis: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#DE8C64'}}><b>Patent: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#2F3330'}}><b>Image: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#5BCCDE'}}><b>Video: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#5F5490'}}><b>Dataset: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#AD5C73'}}><b>Experiment: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#F1C773'}}><b>Teaching Resource: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                    <span style={{color: '#EF622F'}}><b>Project-Grant: </b>{secondTerm} ({secondTerm / (firstTerm + secondTerm) * 100})%</span><br/>
                </div>
            );
        }
        return null;
    };

    return (
        <Fragment>
            <Row>
                <div>
                    <h6 style={{textAlign: 'center'}}>The Number of publications across different types over time</h6>
                    <AreaChart width={1200} height={800} data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip content={<CustomTooltip/>}/>
                        <Area type="monotone" dataKey="article" stackId="1" stroke="#8884d8" fill="#8884d8"/>
                        <Area type="monotone" dataKey="conferenceWorkshop" stackId="1" stroke="#82ca9d" fill="#82ca9d"/>
                        <Area type="monotone" dataKey="technicalReport" stackId="1" stroke="#ffc658" fill="#ffc658"/>
                        <Area type="monotone" dataKey="bookSection" stackId="1" stroke="#E0B474" fill="#E0B474"/>
                        <Area type="monotone" dataKey="book" stackId="1" stroke="#AFB0A8" fill="#AFB0A8"/>
                        <Area type="monotone" dataKey="thesis" stackId="1" stroke="#9B6155" fill="#9B6155"/>
                        <Area type="monotone" dataKey="patent" stackId="1" stroke="#DE8C64" fill="#DE8C64"/>
                        <Area type="monotone" dataKey="image" stackId="1" stroke="#2F3330" fill="#2F3330"/>
                        <Area type="monotone" dataKey="video" stackId="1" stroke="#5BCCDE" fill="#5BCCDE"/>
                        <Area type="monotone" dataKey="dataset" stackId="1" stroke="#5F5490" fill="#5F5490"/>
                        <Area type="monotone" dataKey="experiment" stackId="1" stroke="#AD5C73" fill="#AD5C73"/>
                        <Area type="monotone" dataKey="teachingResource" stackId="1" stroke="#F1C773" fill="#F1C773"/>
                        <Area type="monotone" dataKey="projectGrant" stackId="1" stroke="#EF622F" fill="#EF622F"/>
                    </AreaChart>
                </div>
            </Row>
        </Fragment>
    );
}