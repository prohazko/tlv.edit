module tlv {


    export class Config {

        static ioc = {
            scope: '$scope',
            root: '$rootScope',
            promise: '$q',
            compile: '$compile',
            http: '$http',
            parse: '$parse',
            timeout: '$timeout',
            templateCache: '$templateCache',
            
            store: 'TlvStore' 
        };
    }
}