const mongoose = require('mongoose');

class DbConnection {
    constructor(connectionString) {
        if (typeof DbConnection.instance === 'object') {
            return DbConnection.instance
        }
        DbConnection.instance = this;
        this._connectionString = connectionString;
        return DbConnection.instance; // actually this === DbConn.instance
    }

    connect(){
        return mongoose.connect(this._connectionString)
    }
}

module.exports = DbConnection;