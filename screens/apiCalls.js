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

export const postItem = async (listing) => {
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(listing)
  })
  return response.json()
}


export const fetchCharities = async (search) => {
  try {
    const response = await fetch(`https://auctionable-change-api.herokuapp.com/charities/${search}`)
    if(!response.ok) {
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch(error) {
    return false
  }
}

export const submitListing = async (listing) => {
  try {
    const response = await fetch(
      `https://auctionable-change-api.herokuapp.com/items`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
        body: JSON.stringify({
          ...listing
        })
      });
    if (!response.ok) {
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};

const updateItemStatus = async (itemId) => {
try {
    const response = await fetch(
      `https://auctionable-change-api.herokuapp.com/items/${itemId}`,
        {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "status": "unavailable"
        }),
      }
    );
    if (!response.ok) {
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
}

export const submitPurchase = async (buyerInfo) => {
  try {
    console.log(buyerInfo);
    const response = await fetch(
      `https://auctionable-change-api.herokuapp.com/bids`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...buyerInfo,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(error);
    }
    await updateItemStatus(buyerInfo.item_id);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};

let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djk5anakm/upload";

export const cloudinaryPost = (pickerResult, updateStore) => {
  let photoData;
    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
    let data = {
      file: base64Img,
      upload_preset: "oclsdjxp",
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (res) => await res.json())
      .then((res) => (photoData = res.url))
      .then(() => console.log("photo data", photoData))
      .then(() => updateStore(photoData));
  };

