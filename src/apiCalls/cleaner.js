export const raceCleaner = (races) => {
  const cleanRaces = races.map(race => {
    return {
      city: race.city,
      state: race.state,
      date: dateCleaner(race.start_date_local),
      raceName: race.name,
      id: race.id
    };
  });
  return cleanRaces;
};

export const dateCleaner = (date) => {
  const dateOnly = date.split('').splice(0, 10);
  const yearOnly = dateOnly.splice(0, 5).splice(0, 4);
  const cleanDate = [...date.split('').splice(5, 5), '-', ...yearOnly].join('');
  return cleanDate;
};