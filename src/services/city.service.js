const { CityRepository } = require("../repositories");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const response = await cityRepository.update(id, data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot update city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(data) {
  try {
    const response = await cityRepository.destroy(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot delete city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  updateCity,
  destroyCity,
};
