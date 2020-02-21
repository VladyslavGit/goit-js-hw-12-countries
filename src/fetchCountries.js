export default function fetchCountries(searchQuery, findingCountry) {
  return fetch(searchQuery)
    .then(data => data.json())
    .then(data => {
      return findingCountry(data);
    })
    .catch(err => {
      console.error(err);
      }
    );
}