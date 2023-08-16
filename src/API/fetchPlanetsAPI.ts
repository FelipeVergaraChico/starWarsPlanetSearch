const fetchPlanetsAPI = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export default fetchPlanetsAPI;
