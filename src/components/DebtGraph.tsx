import { FC } from "react";
import { DebtTransaction } from "../utils/debt";
import { Box } from "@mui/material";
import ForceGraph2D from "react-force-graph-2d";

interface Props {
  debts: DebtTransaction[];
}

interface GraphNode {
  id: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface GraphLink {
  source: string;
  target: string;
  label: string;
}

const DebtGraph: FC<Props> = ({ debts }) => {
  const nodesSet = new Set<string>();
  const links: GraphLink[] = debts.map((d) => {
    nodesSet.add(d.from);
    nodesSet.add(d.to);
    return {
      source: d.from,
      target: d.to,
      label: `${d.amount}`,
    };
  });

  const nodes: GraphNode[] = Array.from(nodesSet).map((name) => ({ id: name }));

  return (
    <Box height={500}>
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeLabel="id"
        nodeAutoColorBy="id"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id as string;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, node.x!, node.y!);
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkCanvasObjectMode={() => "after"}
        linkCanvasObject={(link, ctx, globalScale) => {
          const label = (link as GraphLink).label;
          if (!label) return;

          const start = link.source as GraphNode;
          const end = link.target as GraphNode;
          const midX = (start.x! + end.x!) / 2;
          const midY = (start.y! + end.y!) / 2;

          const fontSize = 10 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "gray";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${label} chips`, midX, midY);
        }}
      />
    </Box>
  );
};

export default DebtGraph;
