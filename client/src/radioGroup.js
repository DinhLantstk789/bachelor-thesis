import {Fragment, useEffect, useState} from 'react';
import {FormRadio, Tooltip} from "shards-react";

export default function RadioGroup({selectedId, enableTooltip, inline, radioArray, onSelected}) {
    const [newSelectedId, setNewSelectedId] = useState(null);
    const [toggleState, setToggleState] = useState({});
    useEffect(() => {
        setNewSelectedId(selectedId)
    });

    let toggle = (pos) => {
        setToggleState(prevState => ({...prevState, [pos]: !toggleState[pos]}));
    }

    return (
        <Fragment>
            {radioArray.map((radioElement) => (
                <div style={inline ? {display: "inline", marginRight: 5} : {display: ""}}>
                    <label id={radioElement.id} style={{paddingRight: 10}}>
                        <FormRadio
                            name={radioElement.id}
                            checked={newSelectedId === radioElement.id}
                            onChange={() => {
                                setNewSelectedId(radioElement.id);
                                onSelected(radioElement.id);
                            }}>
                            {radioElement.name}
                        </FormRadio>
                    </label>
                    {enableTooltip ? <Tooltip
                        placement="top" style={{maxWidth: 900}}
                        open={toggleState[radioElement.id + 'Open']}
                        target={"#" + radioElement.id}
                        toggle={() => toggle(radioElement.id + 'Open')}>
                        {radioElement.tooltip}
                    </Tooltip> : ''}
                </div>
            ))}
        </Fragment>
    )
}

