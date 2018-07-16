 window.computeUsersStats = (users, progress, courses) => {
  const newArrUsers = users.map((user) => {
    // Declaring my variables
    let percent = 0;
    let totalExercises = 0;
    let completedExcercises = 0;
    let totalReads = 0;
    let completedReads = 0;
    let totalQuizzes = 0;
    let completedQuizzes = 0;
    let scoreSum = 0;
    let scoreAvg = 0;
    // calculations of completeness percent
    courses.forEach(coursesName => { 
      if (progress[user.id].hasOwnProperty(coursesName)) {  
        percent = progress[user.id].intro.percent;
        const unitsOfProgress = progress[user.id].intro.units;
        Object.keys(unitsOfProgress).forEach((nameOfUnit) => { 
          const parts = unitsOfProgress[nameOfUnit].parts
          Object.keys(parts).forEach((partName) => {
            const partsName = parts[partName];
            //console.log(partsName)
            if (partsName.hasOwnProperty('exercises')) {
              const exercises = partsName.exercises;
              Object.keys(exercises).forEach((exerciseName) => {
                const exercise = exercises[exerciseName];
                totalExercises += 1;
                if (exercise.completed !== undefined) {
                  completedExcercises += exercise.completed;
                } else {
                  completedExcercises = 0;
                }
              });
            }
            // Calculations of reads (completeness)
            if (partsName.hasOwnProperty('type')) {
              if (partsName.type === 'read') {
                totalReads++;
                completedReads += partsName.completed;
              }
            }
            // Calculations of quizzes (completeness, score and average)
            if (partsName.hasOwnProperty('type')) {
              if (partsName.type === 'quiz') {
                totalQuizzes += 1;
                completedQuizzes += partsName.completed;
                scoreSum += partsName.score ? partsName.score : 0;
                scoreAvg = scoreSum / completedQuizzes ? scoreSum / completedQuizzes : 0;
              }
            }
          })
        })
      }
    })
    // Calculations of percent (exercises, reads and quizzes)
    const percentExercises = (completedExcercises / totalExercises) * 100
    const percentReads = (completedReads / totalReads) * 100
    const percentQuizzes = (completedQuizzes / totalQuizzes) * 100
    // Return users with their respective statistics
    const usersWithStats = {
      name: user.name.toUpperCase(),
      stats: {
        percent: percent,
        exercises: {
          total: totalExercises,
          completed: completedExcercises,
          percent: percentExercises,
        },
        reads: {
          total: totalReads,
          completed: completedReads,
          percent: Math.round(percentReads),
        },
        quizzes: {
          total: totalQuizzes,
          completed: completedQuizzes,
          percent: Math.round(percentQuizzes),
          scoreSum: Math.round(scoreSum),
          scoreAvg: Math.round(scoreAvg),
        }
      }
    }
    return usersWithStats
  });
  return newArrUsers
};
// This global function show the data in the order you choose
window.sortUsers = (users, orderBy, orderDirection) => {
  const orderList = users;
  // Function to order by NAME
  if (orderBy === "name" && orderDirection === 'ASC') {
    return orderList.sort(function (a, b) {
      const nameA = a.name.toUpperCase(), nameB = b.name.toUpperCase()
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0; 
    })
  }
  if (orderBy === "name" && orderDirection === 'DESC') {
    return orderList.sort(function (a, b) {
      const nameA = a.name.toUpperCase(), nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0; 
    })
  }
  // The ending for order by NAME

  // Function to order by PERCENT
  if (orderBy === "percent" && orderDirection === 'ASC') {

    return orderList.sort(function (a, b) {
      const percentA = a.stats.percent, percentB = b.stats.percent
      if (percentA > percentB) {
        return 1;
      }
      if (percentA < percentB) {
        return -1;
      }
      return 0; 
    });
  }

  if (orderBy === "percent" && orderDirection === 'DESC') {
    return orderList.sort(function (a, b) {
      const percentB = b.stats.percent, percentA = a.stats.percent
      if (percentA < percentB) {
        return 1;
      }
      if (percentA > percentB) {
        return -1;
      }
      return 0;  
    });
  }
  // The ending for order by PERCENT

  // Function to order by EXERCISES
  if (orderBy === "exercises" && orderDirection === 'ASC') {
    return orderList.sort(function (a, b) {
      const excercisesA = a.stats.exercises.completed, excercisesB = b.stats.exercises.completed
      if (excercisesA > excercisesB) {
        return 1;
      }
      if (excercisesA < excercisesB) {
        return -1;
      }
      return 0; 
    });
  }
  if (orderBy === "exercises" && orderDirection === 'DESC') {
    return orderList.sort(function (a, b) {
      const excercisesB = b.stats.exercises.completed, excercisesA = a.stats.exercises.completed
      if (excercisesA < excercisesB) {
        return 1;
      }
      if (excercisesA > excercisesB) {
        return -1;
      }
      return 0;  
    });
  }
  // The ending for order by EXERCISES

  // Function to order by QUIZZES
  if (orderBy === "quizz" && orderDirection === 'ASC') {
    return orderList.sort(function (a, b) {
      const quizzA = a.stats.quizzes.completed, quizzB = b.stats.quizzes.completed
      if (quizzA > quizzB) {
        return 1;
      }
      if (quizzA < quizzB) {
        return -1;
      }
      return 0; 
    });
  }
  if (orderBy === "quizz" && orderDirection === 'DESC') {
    return orderList.sort(function (a, b) {
      const quizzB = b.stats.quizzes.completed, quizzA = a.stats.quizzes.completed
      if (quizzA < quizzB) {
        return 1;
      }
      if (quizzA > quizzB) {
        return -1;
      }
      return 0; 
    });
  }

  if (orderBy === "quizzAvg" && orderDirection === 'ASC') {
    return orderList.sort(function (a, b) {
      const quizzA = a.stats.quizzes.scoreAvg, quizzB = b.stats.quizzes.scoreAvg
      if (quizzA > quizzB) {
        return 1;
      }
      if (quizzA < quizzB) {
        return -1;
      }
      return 0; 
    });
  }
  if (orderBy === "quizzAvg" && orderDirection === 'DESC') {
    return orderList.sort(function (a, b) {
      const quizzB = b.stats.quizzes.scoreAvg, quizzA = a.stats.quizzes.scoreAvg
      if (quizzA < quizzB) {
        return 1;
      }
      if (quizzA > quizzB) {
        return -1;
      }
      return 0; 
    });

  }
  // The ending for order by QUIZZES

  // Function to order by READS
  if (orderBy === "reads" && orderDirection === 'ASC') {
    return orderList.sort(function (a, b) {
      const quizzA = a.stats.reads.completed, quizzB = b.stats.reads.completed
      if (quizzA > quizzB) {
        return 1;
      }
      if (quizzA < quizzB) {
        return -1;
      }
      return 0; 
    });
  }
  if (orderBy === "reads" && orderDirection === 'DESC') {
    return orderList.sort(function (a, b) {
      const readsB = b.stats.reads.completed, readsA = a.stats.reads.completed
      if (readsA < readsB) {
        return 1;
      }
      if (readsA > readsB) {
        return -1;
      }
      return 0; 
    });
  }
  // The ending for order by READS
}

window.filterUsers = (users, search) => {
  // console.log(users);
  const filUsers = users.filter(user => {
    return user.name.toUpperCase().indexOf(search.toUpperCase()) > -1;
  });
  // console.log(filUsers);
  return filUsers;
}

window.processCohortData = (options) => {
  let courses = Object.keys(options.cohort.coursesIndex);
  let totalStudents = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);

  totalStudents = sortUsers(totalStudents, options.orderBy, options.orderDirection);

  if (options.search !== '') {
    totalStudents = filterUsers(totalStudents, options.search);
  }
  return totalStudents;
}
