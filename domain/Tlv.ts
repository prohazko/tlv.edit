/// <reference path="Bytestring.ts" />

module tlv{
    export class Tlv{

        public tag = ByteString.Empty();
        public length = ByteString.Empty();
        public value = ByteString.Empty();


        constructor(tag: string, value:string);
        constructor(tag: number[], value: number[]); 
        constructor(tag: ByteString, value: ByteString); 
        constructor(tag: any, value: any) {
            this.tag = new ByteString(tag);
            this.value = new ByteString(value);
            this.updateLength();
        }

        updateLength() {
           
            this.tag.updateBytes();
            this.value.updateBytes();

            var length = this.value.getBytes().length;
            this.length.setBytes([length]);
        }

       setValue(value:string) {

       }

        getLength() {
            var length = 0;
            length += this.tag.getBytes().length;
            length += this.length.getBytes().length;
            length += this.value.getBytes().length;
            return length;
        }

        asString() {
            return this.toStore().join('   ');
        }

        toStore():any {
            return [
                this.tag.asString(),
                this.length.asString(),
                this.value.asString()
            ];
        }


        static Empty(init = '0x00') {
            return new tlv.Tlv(init, init)
        }

        static FromStore(stored: any):Tlv {
            return new Tlv(stored[0], stored[2]);
        }

    }
}