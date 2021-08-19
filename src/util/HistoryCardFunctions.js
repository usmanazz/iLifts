const createMapOfReps = (sets) => {
  let map = {};

  for (let i = 0; i < sets.length; i++) {
    if (sets[i].reps === "5" && sets[i].state === "active") {
      if (map["5"] === undefined) map["5"] = 0;
      map["5"]++;
    } else if (
      (sets[i].reps === "5" && sets[i].state === "inactive") ||
      sets[i].reps === "X"
    ) {
      continue;
    } else {
      if (map[sets[i].reps] === undefined) map[sets[i].reps] = 0;
      map[sets[i].reps]++;
    }
  }

  return map;
};

const appendRepsToSetsString = (reps, state) => {
  if (reps === "5" && state === "inactive") return "-";
  else if (reps === "X") return "";
  else {
    return `${reps}`;
  }
};

export const generateCompletedExerciseString = (numSets, sets) => {
  // 1. did all sets with same # of reps ===> 5x5 100lbs
  // 2. did at least 1 set ===> -/2/4/-/2 50lbs
  // 3. did NO sets ===> Skipped

  // generate map of reps for all sets in exercise
  const map = createMapOfReps(sets);

  if (Object.keys(map).length === 0) return "Skipped";
  else if (
    Object.keys(map).length === 1 &&
    Object.entries(map)[0][1] === numSets
  )
    return `${numSets}x${Object.keys(map)[0]}`;
  else {
    let result = "";

    for (let i = 0; i < numSets; i++) {
      if (i !== numSets - 1)
        result =
          result + appendRepsToSetsString(sets[i].reps, sets[i].state) + "/";
      else result += appendRepsToSetsString(sets[i].reps, sets[i].state);
    }

    return result;
  }
};
