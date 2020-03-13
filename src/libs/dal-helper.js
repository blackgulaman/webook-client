

class DalHelper {
    constructor(model, log) {
        this.model = model;
        this.log = log;
    }
    /**
     * @function save
     * @description This will save new document in the DB.
     * @param {Object} newDocumentObj An object that contains user data to be saved.
     * @returns This return an {Object} if successfully execute, null if not
     */
    async save(newDocumentObj) {
        const newUser = new this.model(newDocumentObj);
        return await newUser.save().catch(errMsg => {
            this.log.error('Error while saving a document. ', errMsg);
            return errMsg;
        });
    }

    /**
     * @function find
     * @description This will find the existing document in the DB.
     * @param {Object} condition An object that contains queries
     * @param {String} select This will include the specific filed in the document
     * @param {Boolean} isMulti Checker if finding of collection is many or single
     * @returns This return an {Object} if successfully execute, null if not
     */
    async find(condition, select, isMulti) {
        if (isMulti) {
            return await this.model.find(condition).select(select).catch(errMsg => {
                this.log.error('Error while finding a multiple document. ', { condition, select, isMulti, errMsg });
                return errMsg;
            });
        }

        // Execute when isMulti -> false
        return await this.model.findOne(condition).select(select).catch(errMsg => {
            this.log.error('Error while finding a single document. ', { condition, select, isMulti, errMsg });
            return errMsg;
        });
    }

    /**
     * @function update
     * @description This will update the document in the DB
     * @param {Object} condition An object that contains queries
     * @param {Object} param An object that contains updated information
     * @param {Boolean} isMulti Checker if updating of collection is many or single
     * @returns This return an {Object} if successfully execute, null if not
     */
    async update(condition, param, isMulti) {
        if (isMulti) {
            return await this.model.updateMany(condition, { $set: param }).catch(errMsg => {
                this.log.error('Error while updating a multiple document. ', { condition, param, isMulti, errMsg });
                return errMsg;
            });
        }

        // Execute when isMulti -> false
        return await this.model.findOneAndUpdate(condition, { $set: param }, { new: true }).catch(errMsg => {
            this.log.error('Error while updating a single document. ', { condition, param, isMulti, errMsg });
            return errMsg;
        });
    }

    /**
     * @function remove
     * @description This will remove the document in the DB
     * @param {Object} condition An object that contains query
     * @param {Boolean} isMulti Checker if deleting of collection is many or single
     * @returns This return an {Object} if successfully execute, null if not
     */
    async remove(condition, isMulti) {
        if (isMulti) {
            return this.model.deleteMany(condition).catch(errMsg => {
                this.log.error('Error while removing a multiple document. ', { condition, isMulti, errMsg });
                return errMsg;
            });
        }

        // Execute when isMulti -> false
        return this.model.deleteOne(condition).catch(errMsg => {
            this.log.error('Error while removing a single document. ', { condition, isMulti, errMsg });
            return errMsg;
        });
    }

    /**
     * @function findAndUpdate
     * @description This will increment the object
     * @param {Object} condition An object that contains queries
     * @param {Object} param An object contains what to data to increment
     * @returns This return an updated {Object} if successfully execute, null if not
     */
    async increment(condition, param) {
        return await this.model.findOneAndUpdate(condition, param, { new: true }).catch(errMsg => {
            this.log.error('Error while incrementing a document. ', { condition, param, errMsg });
            return errMsg;
        });
    }

    /**
     * @function count
     * @description This will count all the document.
     * @returns Returns the a number which is the total documents
     */
    async count(condition) {
        return await this.model.countDocuments(condition).catch(errMsg => {
            this.log.error('Error while counting a document. ', { condition, errMsg });
            return errMsg;
        });
    }

    /**
     * @function bulkWrite
     * @description Updating multiple documents with different values 
     * @returns Returns an object 
     */

    async bulkWrite(data) {
        return await this.model.bulkWrite(data).catch(errMsg => {
            this.log.error('Error in bulkWrite method. ', { data, errMsg });
            return errMsg;
        });
    }
}

module.exports = DalHelper;