import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FlowNode} from "../types/FlowNode";
import {FlowEdge} from "../types/FlowEdge";

interface FlowState {
    nodes: FlowNode[];
    edges: FlowEdge[];
    selectedNodeId: string | null;
}

const saved = localStorage.getItem("flowState");

const localState = saved
    ? JSON.parse(saved)
    : null

const defaultState = {
    nodes: [
        {
            id: '1',
            type: 'textUpdater',
            position: { x: 200, y: 200 },
            data: { label: 'Hello' },
        },
    ] as FlowNode[],
    edges: [
            { id: 'e1-2', source: '1', target: '2' },
    ] as FlowEdge[],
    selectedNodeId: null as string | null,
};

const parsedState = localState as FlowState;

const initialState = parsedState !== null ? parsedState : defaultState;



export const flowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<FlowNode>) => {
            state.nodes.push(action.payload)
        },
        updateNodes: (state, action: PayloadAction<FlowNode[]>) => {
            state.nodes = action.payload;
        },
        updateNodesLabel: (state, action: PayloadAction<{ id: string; label: string }>) => {
            const node = state.nodes.find(n => n.id === action.payload.id)
            if (node) {
                node.data.label = action.payload.label
            }
        },
        addEdge: (state, action: PayloadAction<FlowEdge>) => {
            state.edges.push(action.payload);
        },
        updateEdges: (state, action: PayloadAction<FlowEdge[]>) => {
            state.edges = action.payload;
        },
        setSelectedNode: (state, action: PayloadAction<string | null>) => {
            state.selectedNodeId = action.payload;
        },
        updateNodeColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
            const node = state.nodes.find(n => n.id === action.payload.id);
            if (node) {
                if (!node.data.style) node.data.style = {};
                node.data.style.background = action.payload.color;
            }
        },

    }

})

export const { addNode, addEdge, updateEdges, updateNodes, updateNodesLabel, setSelectedNode, updateNodeColor } = flowSlice.actions;
export default flowSlice.reducer;