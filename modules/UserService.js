// it has been implemented via composition unlike it is done in C# via inheritance from

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  create(params) {
    return this.repository.create(params);
  }

  findOne(criteria) {
    return this.repository.findOne(criteria)
  }

  findMany(criteria) {
    return this.repository.find(criteria)
  }

}

module.exports = UserService;
