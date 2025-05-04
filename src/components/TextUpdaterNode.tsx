import { useCallback } from 'react';
import {Handle, NodeProps, Position} from '@xyflow/react';
import {setSelectedNode, updateNodesLabel} from "../store/FlowSlice";
import {useAppDispatch} from "../hooks/reduxHooks";

export const TextUpdaterNode = ({id, data}: NodeProps) => {
    const dispatch = useAppDispatch()

    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNodesLabel({id, label: evt.target.value}));
    }, [dispatch, id]);

    const onNodeClick = () => {
        dispatch(setSelectedNode(id));
    }
    return (
        <>
            <Handle  type="target" position={Position.Top} />
            <div  style={{
                    backgroundColor: 'white',
                    ...data.style || {},
                    height: '40px',
                    width: '160px',
                    border: 'solid black 1px',
                    display: 'flex'
            }}>
                <input
                    id="text"
                    name="text"
                    value={data.label as string}
                    onChange={onChange}
                    onClick={onNodeClick}
                    className="nodrag"
                    style={{
                        height: '15px',
                        width: '120px',
                        border: 'none',
                        outline: 'none',
                        textAlign: 'center',
                        margin: 'auto',
                        ...data.style || {},
                    }}/>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </>
    );
}