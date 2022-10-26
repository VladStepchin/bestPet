const GoogleImages = require("google-images");
const axios = require('axios');

// const client = new GoogleImages(
//   "35dd036bea24d447e",
//   "AIzaSyB4Wz_r2z5TinFG6yA6rIfjwRfvI49Yw6o"
// );

// client
//   .search("Steve Angello")
//   .then((images) => {
//     console.log(images[0]);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

class Utils {
  static async getRandomImage() {
    const url = "https://picsum.photos/v2/list";
    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
      console.log("Error occurred while fetching data");
      return;
    }

    return response;
  }
}

module.exports = Utils;