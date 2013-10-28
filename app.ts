/// <reference path="directives/DragAndDrop.ts" />

/// <reference path="typings/all.d.ts" />
/// <reference path="controller/EditorController.ts" />


module tlv {

    export class EditorApplication {

        app: ng.IModule;

        run() {
            this.app = angular.module('tlv',[]);

            this.registerControllers();
            this.registerDirectives();
            this.registerServices();
            this.registerRoutes();
            this.registerFilters();
            this.app.run(this.onComplete);

            return this;

        }

        onComplete() {
            console.log('application started');
        }

        registerControllers() {
            this.registerController(controllers.EditorCtrl)
        }

        registerController(ctrl: any) {
            this.app.controller(util.getName(ctrl), ctrl.prototype.injection());
            return this;
        }

        registerDirectives() {
            this.app.directive('drag', directives.drag)
                    .directive('drop', directives.drop)
        }

        registerServices() {
            this.app.value(Config.ioc.store, store.root);
        }

        registerRoutes() {
        }

        registerFilters() {
        }

    }

    export var app = new EditorApplication();
}



tlv.app.run();