"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateSiteMap(nodes, links) {
    const siteMapNodes = [];
    const rootNode = nodes.reduce((maxNode, currentNode) => {
        if (maxNode === null) {
            return currentNode;
        }
        else {
            return maxNode.pv > currentNode.pv ? maxNode : currentNode;
        }
    }, null);
    const id2Index = nodes.reduce(function (acc, cur, i) {
        acc[cur.id] = i;
        return acc;
    }, {});
    if (rootNode === null) {
        return siteMapNodes;
    }
    const graph = {};
    // 通过邻接表构建图
    links.forEach(({ source, target }) => {
        if (!graph[source]) {
            graph[source] = [];
        }
        graph[source].push(target);
    });
    // BFC遍历
    const queue = [{ id: rootNode.id, parent: null, level: 0 }];
    const visited = { [rootNode.id]: true };
    while (queue.length !== 0) {
        const queueItem = queue.shift();
        const { id: currentId, level: currentLevel } = queueItem;
        const linkedList = graph[currentId];
        siteMapNodes.push(Object.assign(Object.assign({}, queueItem), nodes[id2Index[currentId]]));
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
exports.default = generateSiteMap;
//# sourceMappingURL=index.js.map