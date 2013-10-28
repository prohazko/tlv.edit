
module tlv {


    export class ByteFormatter {


        normalize(byte8 = 0) {
            if (byte8 < 0) byte8 = 0;
            if (byte8 > 0xFF) byte8 = 0xFF;
            return byte8;
        }

        format(byte8 = 0, prepend0x = false) {

            byte8 = this.normalize(byte8);

            var formatted = byte8.toString(16).toUpperCase();
            if (formatted.length == 1) formatted = '0' + formatted;
            if (prepend0x) formatted = '0x' + formatted;

            return formatted;
        }


        static instance = new ByteFormatter();
    }
}