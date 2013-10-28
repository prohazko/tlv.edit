/// <reference path="Tlv.ts" />
/// <reference path="Bytestring.ts" />

module tlv {
    export class TlvComplex extends Tlv {

        private fields: Tlv[] = [];
        private children: TlvComplex[] = [];

        constructor(tag: string);
        constructor(tag: number[]);
        constructor(tag: ByteString);
        constructor(tag: any) {
            super(tag, null);
        }


        addField(field: Tlv) {
            this.fields.push(field);
            this.updateLength();
        }

        addChild(child: TlvComplex) {
            this.children.push(child);
            this.updateLength();
        }

        getSize() {
            return this.getLength() + this.tag.getBytes().length + this.length.getBytes().length;
        }

        getLength() {
            if (!this.fields) return 0;
            var fieldsLength = this.fields
                .map(f=> f.getLength())
                .reduce((acc, len) => acc += len, 0);

            var childrenLength = this.children
                .map(f=> f.getSize())
                .reduce((acc, len) => acc += len, 0);

            return fieldsLength + childrenLength;
        }

        updateLength() {
            if (!this.fields) return;
            this.tag.updateBytes();
            this.fields.forEach(f=> f.updateLength());
            this.children.forEach(f=> f.updateLength());
            this.length.setBytes([this.getLength()]);
        }

        getFields() {
            return this.fields;
        }

        getChildren() {
            return this.children;
        }

        asString() {
            return [
                this.tag.asString(),
                this.length.asString(),
                this.fields.map(f=> f.asString()).join(' '),
                this.children.map(f=> f.asString()).join(' ')
            ].join('  ');
        }


        toStore():any {
            return {
                tag: this.tag.asString(),
                fields: this.fields.map(f=> f.toStore()),
                children: this.children.map(f=> f.toStore())
            }
        }

        static Empty() {
            return new TlvComplex('0x00');
        }

        static FromStore(stored: any): TlvComplex {
            var complex = new TlvComplex(stored.tag);
            complex.fields = stored.fields.map(f=> Tlv.FromStore(f));
            complex.children = stored.children.map(f=> TlvComplex.FromStore(f));
            complex.updateLength();
            return complex
        }

    }
}