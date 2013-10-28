module tlv.directives {

    var draggingSrc: any = null;
    var parentNode: any = null;


    export function drag() {
        var drags = [],
            dragging = new RegExp('(\\s|^)dragging(\\s|$)');;

        return {
            restrict: 'A',
            scope: false,
            link: function (scope, elem, attr, ctrl) {

                elem.bind('dragstart', function (e) {

                    //debugger;

                    var dragSource = attr.drag;
                    draggingSrc = scope[dragSource];
                    parentNode = scope.$parent.$parent.node;

                    console.log(parentNode.$$hashKey);

                    //  if (drags.length === 0) {
                    drags = <any>document.querySelectorAll('[drop="' + dragSource + '"][parentnode="' + parentNode.$$hashKey + '"]');
                    //   }

                    angular.forEach(drags, function (value, key) {

                        value.className = value.className + ' dragging';

                    });

                    this.style.opacity = '0.4';



                    e.originalEvent.dataTransfer.effectAllowed = 'move';

                    e.originalEvent.dataTransfer.setData('text', angular.toJson(scope.node));

                });

                elem.bind('dragleave', function (e) {

                });

                elem.bind('dragend', function (e) {

                    this.style.opacity = '1';

                    angular.forEach(drags, function (value, key) {

                        value.className = value.className.replace(dragging, '');

                    });

                });

                elem[0].draggable = true;

                elem[0].className = elem[0].className + ' drag';

            }
        };
    }

    export function drop() {

        var drags = [],
            dragging = new RegExp('(\\s|^)dragging(\\s|$)');;

        return {
            scope: false,
            link: function (scope, elem, attr, ctrl) {

                elem.bind('drop', function (e) {

                    // debugger;
                    e.stopPropagation();
                    e.preventDefault();


                    if (e.originalEvent.dataTransfer.dropEffect !== 'move') {

                        e.originalEvent.dataTransfer.clearData();

                        return;
                    }

                    var data = angular.fromJson(e.originalEvent.dataTransfer.getData('text'));

                    scope.$apply(function () {

                        var dragTarget = attr.drop;

                        var dragHandle = attr.whendrop;
                        if (dragHandle) {
                            scope[dragHandle](parentNode, draggingSrc, scope[dragTarget]);
                        }
                        //scope.whendrop({ data: data });

                    });

                    if (drags.length === 0) {
                        drags = <any> document.querySelectorAll('.drop');
                    }

                    angular.forEach(drags, function (value, key) {

                        value.className = value.className.replace(dragging, '');

                    });

                });

                elem.bind('dragover', function (e) {

                    if (e.preventDefault) {
                        e.preventDefault();
                    }

                    return false;

                });

                elem.bind('dragleave', function (e) {

                });


                elem.bind('dragenter', function (e) {

                });

                elem[0].className = elem[0].className + ' drop';

            }
        };
    }

}