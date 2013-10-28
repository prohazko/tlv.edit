
module tlv.store{

    export class TlvStore {

        private key = 'prohazko-tlv-root';

        persist(root:TlvComplex[] = []) {
            var graph = JSON.stringify(root.map(e=>e.toStore()));
            localStorage.setItem(this.key, graph);
        }

        restore(): TlvComplex[] {
            var graph = JSON.parse(localStorage.getItem(this.key));
            if (!graph) return [TlvComplex.Empty()];

            return graph.map(t=> TlvComplex.FromStore(t) );
            
        }
    }

    export var root = new TlvStore();

}