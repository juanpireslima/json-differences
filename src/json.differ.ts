export default class JsonDiffer {
    public getJsonDiff(oldJSON: object, newJSON: object, option = 'all') {
        if(!oldJSON) this.sendError('Old JSON not provided');
        if(!newJSON) this.sendError('New JSON not provided');

        const validOptions: any = ['all', 'new', 'updated', 'deleted'];
        if(!validOptions.includes(option)) this.sendError('Option provided does not exist');

        let diff: any = {
            new: {},
            updated: {},
            deleted: {}
        };

        diff.updated = this.getUpdatedFields(oldJSON, newJSON);
        diff.new = this.getNewFields(oldJSON, newJSON);
        diff.deleted = this.getDeletedFields(oldJSON, newJSON);

        return option == 'all' ? diff : diff[option];
    }

    private getNewFields(oldJSON: any, newJSON: any) {
        let newFields: any = {};

        for(const key in newJSON) {
            if(!oldJSON.hasOwnProperty(key)) newFields[key] = newJSON[key];
        }

        return newFields;
    }

    private getUpdatedFields(oldJSON: any, newJSON: any) {
        let updates: any = {};

        for(const key in oldJSON) {
            if(newJSON.hasOwnProperty(key)) {
                if(oldJSON[key] !== newJSON[key]) {
                    updates[key] = {
                        old: oldJSON[key],
                        new: newJSON[key]
                    }
                }
            }
        }

        return updates;
    }

    private getDeletedFields(oldJSON: any, newJSON: any) {
        let deletedFields: any = {};

        for(const key in oldJSON) {
            if(!newJSON.hasOwnProperty(key)) deletedFields[key] = oldJSON[key];
        }

        return deletedFields;
    }


    private sendError(message: string) {
        throw new Error(message);
    }
}