
import React, {useCallback, useState} from "react";
import {updateNodeColor, updateNodesLabel} from "../store/FlowSlice";
import {useAppDispatch} from "../hooks/reduxHooks";

interface MenuProps {
    id: string;
    label: string;
    visible: boolean;
}

export const Menu = React.memo(({ id, label, visible }: MenuProps) => {
    const [color, setColor] = useState("#ffffff");
    const dispatch = useAppDispatch()

    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNodesLabel({id, label: evt.target.value}));
    }, [dispatch, id]);

    const onColorChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        setColor(evt.target.value)

    }, [id]);

    const confirmColorChange = useCallback(() => {
        dispatch(updateNodeColor({id, color}));
    }, [dispatch, id, color]);


    return (
        <aside className={`aside ${visible ? 'visible' : ''}`}
               style={{
            display:'flex',
            flexDirection: 'column',
        }}>
            <label
                style={{
                    alignItems: 'center',
                    textAlign: 'center',
                    margin: 'auto',
                    justifyContent: 'center'
                }}
            > Label:
            <input
                autoFocus
                name="text"
                value={label}
                onChange={onChange}
                className="nodrag"
                style={{
                    alignItems: 'center',
                    height: '30px',
                    width: '120px',
                    textAlign: 'center',
                    margin: 'auto',
                    justifyContent: 'center'
                }}
            />
            </label>
            <label style={{
                alignItems: 'center',
                textAlign: 'center',
                margin: 'auto',
                justifyContent: 'center'
            }}> Color:
                <input
                    type={"color"}
                    onChange={onColorChange}
                       style={{
                           height: '30px',
                           width: '120px',
                       }}/>
                <button onClick={confirmColorChange} style={{
                    marginTop: '8px',
                    height: '30px',
                    width: '120px', }}
                >Apply
                </button>
            </label>
        </aside>
    );
});