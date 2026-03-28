export function reverseMutations(mutations: MutationRecord[]) {
  for (const mutation of [...mutations].reverse()) {
    switch (mutation.type) {
      case "childList":
        revertChildListMutation(mutation);
        break;
      case "attributes":
        revertAttributeMutation(mutation);
        break;
      case "characterData":
        revertCharacterDataMutation(mutation);
        break;
      default:
        exhaustiveCheck(mutation.type);
    }
  }
}

function exhaustiveCheck(value: never): never {
  throw new Error(`Unexpected mutation type: ${String(value)}`);
}

export function startRecordingMutations(targetNode: Node) {
  const recordedMutations: MutationRecord[] = [];
  const observer = new MutationObserver((mutations) => {
    recordedMutations.push(...mutations);
  });

  observer.observe(targetNode, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  });

  return {
    stopAndGetMutations: () => {
      recordedMutations.push(...observer.takeRecords());
      observer.disconnect();
      return recordedMutations;
    },
  };
}

function revertChildListMutation(mutation: MutationRecord) {
  mutation.removedNodes.forEach((node) => {
    if (mutation.nextSibling) {
      mutation.target.insertBefore(node, mutation.nextSibling);
      return;
    }

    mutation.target.appendChild(node);
  });

  mutation.addedNodes.forEach((node) => {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

function revertAttributeMutation(mutation: MutationRecord) {
  const element = mutation.target as HTMLElement;
  const attributeName = mutation.attributeName;

  if (!attributeName) {
    return;
  }

  if (mutation.oldValue === null) {
    element.removeAttribute(attributeName);
    return;
  }

  element.setAttribute(attributeName, mutation.oldValue);
}

function revertCharacterDataMutation(mutation: MutationRecord) {
  mutation.target.textContent = mutation.oldValue;
}
