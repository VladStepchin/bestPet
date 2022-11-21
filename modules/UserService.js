// it has been implemented via composition unlike it is done in C# via inheritance

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  create(params) {
    return this.repository.create(params);
  }

  findOne(criteria) {
    return this.repository.findOne(criteria);
  }

  list(criteria) {
    return this.repository.list(criteria);
  }
}
module.exports = UserService;
