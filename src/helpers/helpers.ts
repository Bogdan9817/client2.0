declare global {
  interface String {
    replaceAt(index: number, replacement: string): string;
  }
}

String.prototype.replaceAt = function (index: number, replacement: string) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

function findDistance(find: string, comparer: string) {
  let operations = 0;
  if (find === comparer) return operations;
  let toTransform = find;

  for (let i = 0; i < comparer.length; i++) {
    if (comparer[i] !== toTransform[i] && comparer[i] === toTransform[i + 1]) {
      operations++;
      toTransform = toTransform.replaceAt(i, "");
    } else if (
      comparer[i] !== toTransform[i] &&
      comparer[i + 1] === toTransform[i]
    ) {
      operations++;
      toTransform = toTransform.replaceAt(i, comparer[i] + toTransform[i]);
    } else if (
      comparer[i] !== toTransform[i] &&
      comparer[i + 1] !== toTransform[i] &&
      comparer[i] !== toTransform[i + 1]
    ) {
      operations++;
      toTransform = toTransform.replaceAt(i, comparer[i]);
    } else if (!toTransform[i]) {
      operations++;
      toTransform += comparer[i];
    }
  }
  return operations;
}

export const minDistance = (string: string, find: string): number => {
  let temp;
  for (let i = 0; i < string.length; i++) {
    if (i + find.length > string.length) {
      break;
    }
    const tempDistance = findDistance(find, string.slice(i, i + find.length));
    temp = temp !== undefined ? Math.min(tempDistance, temp) : tempDistance;
  }
  return temp !== undefined ? temp : 9999;
};
