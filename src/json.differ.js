"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonDiffer = /** @class */ (function () {
    function JsonDiffer() {
    }
    JsonDiffer.prototype.getJsonDiff = function (oldJSON, newJSON, option) {
        if (option === void 0) { option = 'all'; }
        if (!oldJSON)
            this.sendError('Old JSON not provided');
        if (!newJSON)
            this.sendError('New JSON not provided');
        var validOptions = ['all', 'new', 'updated', 'deleted'];
        if (!validOptions.includes(option))
            this.sendError('Option provided does not exist');
        var diff = {
            new: {},
            updated: {},
            deleted: {}
        };
        diff.updated = this.getUpdatedFields(oldJSON, newJSON);
        diff.new = this.getNewFields(oldJSON, newJSON);
        diff.deleted = this.getDeletedFields(oldJSON, newJSON);
        return option == 'all' ? diff : diff[option];
    };
    JsonDiffer.prototype.getNewFields = function (oldJSON, newJSON) {
        var newFields = {};
        for (var key in newJSON) {
            if (!oldJSON.hasOwnProperty(key))
                newFields[key] = newJSON[key];
        }
        return newFields;
    };
    JsonDiffer.prototype.getUpdatedFields = function (oldJSON, newJSON) {
        var updates = {};
        for (var key in oldJSON) {
            if (newJSON.hasOwnProperty(key)) {
                if (JSON.stringify(oldJSON[key]) !== JSON.stringify(newJSON[key])) {
                    updates[key] = {
                        old: oldJSON[key],
                        new: newJSON[key]
                    };
                }
            }
        }
        return updates;
    };
    JsonDiffer.prototype.getDeletedFields = function (oldJSON, newJSON) {
        var deletedFields = {};
        for (var key in oldJSON) {
            if (!newJSON.hasOwnProperty(key))
                deletedFields[key] = oldJSON[key];
        }
        return deletedFields;
    };
    JsonDiffer.prototype.sendError = function (message) {
        throw new Error(message);
    };
    return JsonDiffer;
}());
exports.default = JsonDiffer;
