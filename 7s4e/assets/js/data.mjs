/* wdd131/7s4e/assets/js/data.js */

import family from "../../data/family.mjs";
import portraits from "../../data/portraits.mjs";

function getPortrait(name) {return portraits.find(
  portrait => portrait.id.toLowerCase() === name.toLowerCase()
);}

function buildFamilyTree(parent) {
  const generation = parent.generation;
  const spouse = parent.spouse || null;
  const names = spouse ? [parent.name, spouse] : [parent.name];

  const parents = names.map(name => {
    const portrait = getPortrait(name);
    return {
      "name": name,
      "portrait": portrait
    };
  });

  const children = family
    .filter(child => 
      child.generation === generation + 1 && 
      child.parent === parent.name
    ).map(child => buildFamilyTree(child));

    return {
    "parents": parents,
    "children": children
  };
}

export function getFamilyObject() {
  const root = family.reduce((a, b) => a.generation < b.generation ? a : b);
  return buildFamilyTree(root);
}

export default getFamilyObject;
