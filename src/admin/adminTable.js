export default {

    addStyles(vm){
        let context = this;

        $('select').addClass('selectpicker').attr('data-style', 'btn-primary');

        $('td.editable-email').attr('data-ok-button', 'OK').attr('data-cancel-button', 'Cancel').attr('data-type', "textarea");
        $('td.editable-password').attr('data-ok-button', 'OK').attr('data-cancel-button', 'Cancel').attr('data-type', "textarea");
        $('td.editable-roles').attr('data-type', 'select').attr('data-data', '[["ROLE_ADMIN", "Administrator"], ["ROLE_USER", "User"]]');

        $(document)
            .on('mousedown', ".jip-ok-button", (function (event) {
                var tr = event.target.closest('tr');
                vm.rowNumber = tr.cells[0].innerText;
            }));

        $(document).on('click', 'select', function () {
            var tr = event.target.closest('tr');
            vm.rowNumber = tr.cells[0].innerText;
        })


        $('td.editable-email').jinplace({
                submitFunction(ev, data) {
                    for (var i = 0; i < vm.rows.length; i++) {
                        if (vm.rowNumber === vm.rows[i][0] && vm.rows[i][1] !== data) {
                            vm.rows[i][1] = data;
                            context.redrawTable(vm);
                            context.addStyles(vm);
                            break;
                        }
                    }
                }
            }
        );

        $('td.editable-password').jinplace({
                submitFunction(ev, data) {
                    for (var i = 0; i < vm.rows.length; i++) {
                        if (vm.rowNumber === vm.rows[i][0] && vm.rows[i][2] !== data) {
                            vm.rows[i][2] = data;
                            context.redrawTable(vm);
                            context.addStyles(vm);
                            break;
                        }
                    }
                }
            }
        );
        $('td.editable-roles').jinplace({
            submitFunction(ev, data) {
                for (var i = 0; i < vm.rows.length; i++) {
                    if (vm.rowNumber === vm.rows[i][0] && vm.rows[i][3] !== data) {
                        vm.rows[i][3] = data;
                        context.redrawTable(vm);
                        context.addStyles(vm);
                        break;
                    }
                }
            }
        });

        $('.edit-btn').click(function () {
            var clickedBtnID = $(this).attr('id');
            var users = vm.getUserById(clickedBtnID);
            let user = users[0];
            let userCopy = users[1];
            for (var i = 0; i < userCopy.length; i++) {
                if (userCopy[i] !== user[i + 1]) {
                    vm.user.id = user[0];
                    vm.user.username = user[1];
                    vm.user.password = user[2];
                    vm.user.authorities = user[3];

                    vm.editItem(vm.user);
                    break;
                }
            }
        });

        $('.delete-btn').click(function () {
            var clickedBtnID = $(this).attr('id');
            var users = vm.getUserById(clickedBtnID);
            vm.deleteItem(users[0][0]);
        });
    },
    redrawTable(vm){
        vm.dtHandle.clear();
        vm.dtHandle.rows.add(vm.rows);
        vm.dtHandle.draw();
    }
}
