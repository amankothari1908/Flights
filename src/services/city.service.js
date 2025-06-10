const { CityRepository } = require("../repositories");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (error.name == "TypeError") {
      throw new AppError(
        "Cannot create a new city object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
};
