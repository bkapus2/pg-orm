// import joinTable from '../../utils/joinTables';

function oneToManySingleKeyJoin({ parents, relationKey, relationModel }) {
  const { joinMap, table } = relationModel;
  const [parentKey, childKey] = joinMap[0];
  const ids = parents.map(entity => entity[parentKey]);
  return table.select({ [childKey]: { $in:ids }})
    .then(children => {
      const hash = {};

      parents.forEach(parent => {
        parent[relationKey] = [];
        hash[parent[parentKey]] = parent;
      });

      children.forEach(child => {
        hash[child[childKey]][relationKey].push(child);
      });

      // joinTable({
      //   parents,
      //   children,
      //   joinMap,
      //   joinRows(parent, child) {
      //     // parent[relationKey].push(child);
      //   }
      // });

    });
}

export default function selectRelations({ model, parents }) {
  if (parents.length === 0) {
    return Promise.resolve(parents);
  }
  return new Promise((resolve, reject) => {
    const { relations } = model;
    const promises = Object.entries(relations).map(([relationKey, relationModel]) => {
      const { type, joinMap } = relationModel;
      if (type === 'one-to-many') {
        if (joinMap.length === 1) {
          return oneToManySingleKeyJoin({ parents, relationKey, relationModel });
        } else {
          throw Error('todo: implement multi key joins');
        }
      } else {
        throw Error('Unsupported relation type');
      }
    });

    Promise.all(promises)
      .then(() => resolve(parents))
      .catch(reject);
  });
}