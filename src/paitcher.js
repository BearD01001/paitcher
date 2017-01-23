class paitcher {
    constructor(options = {}) {
        let defaultOptions = {
            loader: 'progress',
            animation: 'switch',
            before: () => {},
            after: () => {},
        };

        options = Object.assign(defaultOptions, options);
    } 
}