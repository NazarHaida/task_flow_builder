import {
    ReactFlow,
    Controls,
    Background,
    NodeChange,
    applyNodeChanges,
 addEdge, Panel, EdgeChange, applyEdgeChanges
} from '@xyflow/react';
import {TextUpdaterNode} from './TextUpdaterNode';
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from "react";
import {addNode, setSelectedNode, updateEdges, updateNodes} from "../store/FlowSlice";
import { FlowNode } from '../types/FlowNode';
import {FlowEdge} from "../types/FlowEdge";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";

const nodeTypes = {
    textUpdater: TextUpdaterNode
};


export const FlowCanvas = () => {
    const allNodes = useAppSelector((state) => state.flow.nodes)
    const allEdges = useAppSelector((state) => state.flow.edges)
    const defaultEdgeOptions = {animated: true};
    const dispatch = useAppDispatch()

    const onNodesChange = useCallback(
        (changes: NodeChange<FlowNode>[]) => {
            const updated = applyNodeChanges(changes, allNodes);
            dispatch(updateNodes(updated));
        },
        [allNodes, dispatch]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange<FlowEdge>[]) => {
            const updated = applyEdgeChanges(changes, allEdges);
            dispatch(updateEdges(updated));
        },
        [allNodes, dispatch]
    );

    const onConnect = useCallback(
        (connection: any) => {
            const updated = addEdge(connection, allEdges);
            dispatch(updateEdges(updated));
        },
        [allEdges, dispatch]
    );

    const rfStyle = {
        backgroundColor: '#B8CEFF',
    };

    return (
        <div className={"flow"}>
            <div  style={{ height: '100%' }}>
                <ReactFlow
                    nodes={allNodes}
                    edges={allEdges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    defaultEdgeOptions={defaultEdgeOptions}
                    style={rfStyle}
                >
                    <Background />
                    <Controls />
                    <Panel position="top-left">
                        <button onClick={() => {
                            const id = String(+allNodes[allNodes.length - 1].id + 1)
                            dispatch(addNode({
                                id: id,
                                type: 'textUpdater',
                                position: {x: 300, y: 300},
                                data: {label: '', style: {backgroundColor: 'green',},},
                            },))
                            dispatch(setSelectedNode(id))
                        }}
                                className={'button'}
                        >Add Task</button>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    );
}
