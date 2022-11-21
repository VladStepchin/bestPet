class Repository {
  constructor(model) {
    this.model = model;
  }

  async list(criteria, populate = '') {
    return await this.model.find(criteria).populate(populate);
  }

  async findOne(criteria) {
    return await this.model.findOne(criteria);
  }

 async create(params) {
    return await new this.model(params).save();
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async update(id, newItem) {
    return await this.model.findByIdAndUpdate(id, newItem);
  } 
}

module.exports = Repository;