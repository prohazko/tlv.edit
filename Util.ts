module util {
    export function isArray(o:any) {
        return o instanceof Array;
    }
    export function isString(o: any) {
        return typeof (o) == 'string';
    }

    var propertyExceptions = ['constructor'];
    export function bindToScope(src: Object, dest: Object): Object {
        for (var prop in src) {
    
            if (propertyExceptions.indexOf(prop) < 0 && (prop.indexOf('_') < 0) && (prop.indexOf('$') < 0)) {
                if (typeof (src[prop]) == "function") {
                    dest[prop] = src[prop].bind(src);
                } else {/* */ }
            }
        }
        return dest;
    }

    export function getName(ent: any): string {
        if (typeof ent == "string") return ent;

        if (ent.constructor && ent.constructor.name != "Function") {
            return ent.constructor.name || (ent.toString().match(/function (.+?)\(/) || [, ''])[1];
        } else {
            return ent.name;
        }

    }
}