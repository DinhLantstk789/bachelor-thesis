import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "shards-react";
import React, {useState} from "react";
import {publicationSorting, userSorting} from "../utils/configs";

export default function SortingSelector({sortingType, onSelected}) {
    const [sortingOpen, setSortingOpen] = useState(false);
    const sortingCategory = sortingType === 'publication' ? publicationSorting : userSorting;
    const [sortedBy, setSortedBy] = useState(sortingCategory[0]);
    return (
        <Dropdown open={sortingOpen} toggle={() => setSortingOpen(!sortingOpen)} className='mr-2'>
            <DropdownToggle theme='light' pill>{sortedBy} &nbsp; <i className="fa fa-sort-amount-down"/></DropdownToggle>
            <DropdownMenu>
                {sortingCategory.map(s => <DropdownItem onClick={() => {
                    setSortedBy(s);
                    onSelected(s);
                }}>{s}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>
    );
}
