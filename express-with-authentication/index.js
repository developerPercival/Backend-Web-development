const bcrypt = require("bcrypt");

//Create hash value with salt
const createHashPasswor = async (pass) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(pass, salt);
  console.log(hash);
};

// createHashPasswor("say my name");

//Compare password
const comparePw = async (pass, hashPass) => {
  const result = await bcrypt.compare(pass, hashPass);

  if (result) {
    console.log("LOGGED IN!");
  } else {
    console.log("INCORRECT PASSWORD!");
  }
};

//Enter credintial and hash value
comparePw(
  "say my name",
  `$2b$12$xrryYwO3Tv7UB7pVFe.PR.rBi5L/KJ7mGfKjFfUzCD1vNKdiFQDSS`
);
