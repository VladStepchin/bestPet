class Repository {
  constructor(model) {
    this.model = model;
  }

  async findOne(criteria) {
    return await this.model.findOne(criteria).exec();
  }

  async findMany(criteria) {
    return await this.model.find(criteria).exec();
  }

  create(params) {
    return new this.model(params).save();
  }
}

module.exports = Repository;