const fs = require("fs/promises");
(async () => {
  try {
    await fs.copyFile("document.txt", "new-document.txt");
  } catch (error) {
    console.log(error);
  }
})();
