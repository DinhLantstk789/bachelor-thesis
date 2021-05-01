import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "shards-react";
import React, {useState} from "react";
import {useSelector} from "react-redux";

export default function YearSelector({linkedValue, onSelected}) {
    const yearRange = useSelector(store => store.home.yearsRange);
    const [selectedYearOpen, setSelectedYearOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(2020);
    const value = linkedValue ? linkedValue : selectedYear;
    return (
        <Dropdown open={selectedYearOpen} toggle={() => setSelectedYearOpen(!selectedYearOpen)} className='mr-2'>
            <DropdownToggle theme='light' pill>Năm {value} &nbsp; <i className="fa fa-sort"/></DropdownToggle>
            <DropdownMenu>
                {yearRange.map(s =>
                    <DropdownItem onClick={() => {
                        setSelectedYear(s);
                        onSelected(s);
                    }}>{s}</DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
