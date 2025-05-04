import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Menu } from "./Menu";
import { useEffect, useState } from "react";

export const SidePannel = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { selectedNodeId, nodes } = useSelector((state: RootState) => state.flow);
    const selectedNode = nodes.find(n => n.id === selectedNodeId);

    useEffect(() => {
        setMenuVisible(!!selectedNode);
    }, [selectedNode]);

    if (!selectedNode || !menuVisible) return null;

    return (
        <Menu
            visible={menuVisible}
            id={selectedNode.id}
            label={selectedNode.data.label}
        />
    );
};
