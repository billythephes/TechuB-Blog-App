// const mongoose = require("mongoose");

// class TransactionWrapper {
//     constructor(functionForWrapper) {
//         this.functionToWrap = functionForWrapper;
//     }

//     async process(parameters) {
//         const session = await mongoose.startSession();
//         let result = {};
//         session.startTransaction();
//         try {
//             result = await this.functionToWrap(parameters, session);
//             await session.commitTransaction(); // commit the transaction if the function is successful
//         } catch (error) {
//             if (error.errorLabels && error.errorLabels.indexOf('TransientTransactionError') >= 0) {
//                 console.log('TransientTransactionError, retrying transaction ...');
//                 await process(parameters);
//             } else {
//                 console.error(error)
//                 if (session.inTransaction()) { // check if the session is in a transaction
//                     await session.abortTransaction();
//                 }
//                 result = error
//             }
//         } finally {
//             session.endSession();
//             if ((result instanceof Error)) throw result
//             return result;
//         }
//     }
// }

// module.exports = TransactionWrapper;


const mongoose = require('mongoose');

class TransactionWrapper {
    constructor(functionForWrapper) {
        this.functionToWrap = functionForWrapper;
    }

    async process(parameters) {
        let result = {};
        try {
            const session = await mongoose.startSession();
            await session.withTransaction(async (session) => {
                result = await this.functionToWrap(parameters, session);
            });
            await session.endSession()
            return result;
        } catch (error) {
            throw error
        }
    }
}

module.exports = TransactionWrapper;