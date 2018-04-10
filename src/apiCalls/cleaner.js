export const raceCleaner = (races) => {
  const cleanRaces = races.map(race => {
    return {
      venue: race.place.placeName,
      city: race.place.cityName,
      website: race.registrationUrlAdr,
      date: dateCleaner(race.activityStartDate),
      event: race.organization.organizationName
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