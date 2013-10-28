/// <reference path="../all.d.ts" />
/// <reference path="../store/TlvStore.ts" />

module tlv.controllers {

    export interface IEditorScope extends ng.IScope {
        root: tlv.TlvComplex[];
        output: string;
    }


    export class EditorCtrl {

        public injection(): any[] {
            return [
                Config.ioc.scope,
                Config.ioc.store,
                EditorCtrl
            ];
        }



        constructor(private scope: IEditorScope, private store: store.TlvStore) {
            scope.root = store.restore();
            scope.output = '';
            util.bindToScope(this, scope);
            window.onbeforeunload = () => store.persist(scope.root);
            this.updateLength();
        }

        addFieldTo(node: tlv.TlvComplex) {
            node.addField(tlv.Tlv.Empty());
            this.updateLength();
        }

        addChildTo(node: tlv.TlvComplex) {
            node.addChild(TlvComplex.Empty());
            this.updateLength();
        }

        updateLength() {
            this.scope.root.forEach(node=> node.updateLength());
            this.scope.output = this.scope.root.map(t=>t.asString()).join();
        }

        removeField(node: tlv.TlvComplex, field: tlv.Tlv) {
            var fields = node.getFields();
            var filedIdx = fields.indexOf(field);
            fields.splice(filedIdx, 1);
            this.updateLength();
        }

        removeChild(node: tlv.TlvComplex, child: tlv.TlvComplex) {
            var children = node.getChildren();
            var childIdx = children.indexOf(child);
            children.splice(childIdx, 1);
            this.updateLength();
        }


        log() {
            console.log(arguments)
        }

        swapFields(node: tlv.TlvComplex, srcField: tlv.Tlv, dstField: tlv.Tlv) {
            var fields = node.getFields();
            var srcIndex = fields.indexOf(srcField);
            var dstIndex = fields.indexOf(dstField);
            fields[dstIndex] = srcField;
            fields[srcIndex] = dstField;

            this.updateLength();
        }

    }

}
