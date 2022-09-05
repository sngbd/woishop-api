class baseRepository {
  constructor(model) {
    this.model = model;
  }

  async all(criteria) {
    return this.model.findAll(criteria);
  }

  async one(criteria) {
    return this.model.findOne(criteria);
  }

  async create(row) {
    return this.model.create(row);
  }

  async update(criteria, column, value) {
    const row = await this.model.findOne(criteria);
    if (!row) return null;
    row[column] = value;
    return row.save();
  }

  async remove(criteria) {
    const row = await this.model.findOne(criteria);
    return row.destroy();
  }
}

module.exports = baseRepository;
