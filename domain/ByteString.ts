/// <reference path="../Util.ts" />
/// <reference path="ByteFormatter.ts" />

module tlv {


    export class ByteString {

        private bytes: number[] = [];
        private internalString = "";
        private displayString = "";
        public model = null;

        constructor(bytes: string);
        constructor(bytes: number[]);
        constructor(bytes: ByteString);
        constructor(bytes: any) {
            if (!bytes) {
                this.setBytes([]);
            }else if (bytes instanceof ByteString) {
                this.setBytes(bytes.getBytes());
            }else if (util.isArray(bytes)) {
                this.setBytes(bytes);
            } else if (util.isString(bytes)) {
                this.setBytes(ByteString.ParseBytes(bytes));
            }
        }

        static Empty() {
            return new ByteString([]);
        }

        setBytes(bytes: number[]= []) {
            this.bytes = bytes.map(b=> ByteFormatter.instance.normalize(b));
            var bytesFormatted = bytes.map(b=> ByteFormatter.instance.format(b));

            this.internalString = bytesFormatted.join('');
            this.displayString = bytesFormatted.join(' ');
            if (!this.model) this.model = this.displayString;
        }

        updateBytes() {
            var fromModel = ByteString.ParseBytes(this.model);
            this.setBytes(fromModel);
        }

        getBytes() {
            return this.bytes;
        }

        getValue() {
            return this.internalString;
        }

        toArrayDefinitionString() {
            var bytes = this.bytes.map(b=> ByteFormatter.instance.format(b, true));
            return '{' + bytes.join(', ') + '}';
        }

        static ParseBytes(bstr: string) {
            bstr = bstr.replace(/\s/gi, ''); // remove spaces
            bstr = bstr.replace(/0x/gi, ''); // remove 0x-es

            var bytes: number[] = [];
            var bytesCount = Math.floor(bstr.length / 2);

            for (var i = 0; i < bytesCount * 2; i += 2) {
                var byte = Number('0x' + bstr.substring(i, i + 2));
                byte = ByteFormatter.instance.normalize(byte);

                bytes.push(byte);
            }
            return bytes;
        }

        asString() {
            return this.displayString;
        }
    }
}