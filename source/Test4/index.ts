interface INode {
  id: string;
  name: string;
  pv: number;
}
interface Link {
  source: string;
  target: string;
  weight: number;
}
interface Graph {
  [id: string]: string[];
}
interface QueueItem {
  id: string;
  parent: string | null;
  level: number;
}

interface SiteMapNode extends INode, QueueItem {}

export default function generateSiteMap(
  nodes: INode[],
  links: Link[]
): SiteMapNode[] {
  const siteMapNodes: SiteMapNode[] = [];
  const rootNode: INode | null = nodes.reduce(
    (maxNode: INode | null, currentNode) => {
      if (maxNode === null) {
        return currentNode;
      } else {
        return maxNode.pv > currentNode.pv ? maxNode : currentNode;
      }
    },
    null
  );
  const id2Index = nodes.reduce(function (
    acc: { [id: string]: number },
    cur,
    i
  ) {
    acc[cur.id] = i;
    return acc;
  },
  {});

  if (rootNode === null) {
    return siteMapNodes;
  }

  const graph: Graph = {};
  // 通过邻接表构建图
  links.forEach(({ source, target }: Link) => {
    if (!graph[source]) {
      graph[source] = [];
    }
    graph[source].push(target);
  });

  // BFC遍历
  const queue: QueueItem[] = [{ id: rootNode.id, parent: null, level: 0 }];
  const visited: { [id: string]: boolean } = { [rootNode.id]: true };

  while (queue.length !== 0) {
    const queueItem = queue.shift() as QueueItem;
    const { id: currentId, level: currentLevel } = queueItem;
    const linkedList = graph[currentId];

    siteMapNodes.push({
      ...queueItem,
      ...nodes[id2Index[currentId]],
    });

    if (linkedList && linkedList.length) {
      linkedList.forEach((linkedId) => {
        if (!visited[linkedId]) {
          queue.push({
            id: linkedId,
            parent: currentId,
            level: currentLevel + 1,
          });
          visited[linkedId] = true;
        }
      });
    }
  }

  return siteMapNodes;
}
