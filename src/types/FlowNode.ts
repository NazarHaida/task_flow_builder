export interface FlowNode {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    data: {
        label: string;
        style?: React.CSSProperties;
    };
}
