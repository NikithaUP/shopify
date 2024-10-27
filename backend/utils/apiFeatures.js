class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    // removing params
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryStrCopy[field]);
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = (currentPage - 1) * resPerPage;
        this.query.limit(resPerPage).skip(skip);
        return this;
  }
}

module.exports = APIFeatures;