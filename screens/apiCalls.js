const url = 'https://auctionable-change-api.herokuapp.com/items'

export const fetchItems = async () => {
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch(error) {
    return false
  }
}