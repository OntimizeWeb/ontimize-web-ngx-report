export abstract class Preferences {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public vertical: boolean,
        public title: string,
        public subtitle: string,
        public columns: {},
        public groups: {},
        public functions: {},
        public styleFunctions: {}
    ) {
    }
}