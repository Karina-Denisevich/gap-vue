<template>
    <div class="cust-container-top-buttom file-save-info" v-html="legacySystemHTML">
    </div>
</template>

<script>
    import git from '../git'
    import auth from '../auth'
    var thisObject;

    export default {
        data() {
            return {
                legacySystemHTML: '<div></div>'
            }
        },
        ready() {
            thisObject = this;
            git.getTree(this, this.$route.path.replace('/repo', '')).then(result => {
                    // this.git = result.data;

                    this.legacySystemHTML = result.data.repoContent;
                    addCopyFunctionality();
                },
                error => {
                    this.error = error;
                }
            );
        },
    }

    function addCopyFunctionality() {
        var prev;
        var start = 0;
        var end = 0;
        var code = [];
        $('.file-save-info').on('click', '.blob-num.js-line-number', function (event) {
            if (event.shiftKey) {
                // let start = 0;
                if (prev) {
                    start = parseInt(prev.getAttribute('data-line-number'));
                }
                let last = $('.js-file-line-container tr:last td:first').attr('data-line-number');
                for (let i = 1; i < last; i++) {
                    if (i !== start) {
                        $('#L' + i).removeClass('highlight-code');
                        $('#LC' + i).removeClass('highlight-code');
                        code.splice(i, 1);
                    }
                }
                end = parseInt(event.target.getAttribute('data-line-number'))

                if (start > end) {
                    for (let i = end; i < start; i++) {
                        $('#L' + i).addClass('highlight-code');
                        $('#LC' + i).addClass('highlight-code');
                        let tr = '<tr>' + $('#L' + i).closest('tr').html() + '</tr>';
                        code.push(tr);
                    }
                } else {
                    for (let i = start + 1; i < end + 1; i++) {
                        $('#L' + i).addClass('highlight-code');
                        $('#LC' + i).addClass('highlight-code');
                        let tr = '<tr>' + $('#L' + i).closest('tr').html() + '</tr>';
                        code.push(tr);
                    }
                }
            } else {
                let last = $('.js-file-line-container tr:last td:first').attr('data-line-number');
                for (let i = 1; i < last; i++) {
                    $('#L' + i).removeClass('highlight-code');
                    $('#L' + i).children('#save-lines__div').remove();
                    $('#LC' + i).removeClass('highlight-code');
                    code = [];
                }
                handler(event);

                var myDiv = document.createElement("div");
                myDiv.className = "BlobToolbar position-absolute js-file-line-actions dropdown js-menu-container js-select-menu js-transitionable is-dirty active";
                myDiv.id = 'save-lines__div';

                var myBtn = document.createElement("button");
                myBtn.id = 'save-lines__btn';
                myBtn.className = "btn btn-sm";
                myBtn.innerHTML = "Save lines";

                myDiv.appendChild(myBtn);
                event.target.appendChild(myDiv);

            }
        });


        function handler(event) {
            if (event.target === document.body ||
                (prev && prev === event.target)) {
                return;
            }
            if (prev) {
                prev.className = prev.className.replace(/\b highlight-code\b/, '');
                let line = prev.getAttribute('data-line-number');
                $('#LC' + line).removeClass('highlight-code');
                code = [];
                prev = undefined;
            }
            if (event.target) {
                prev = event.target;
                prev.className += " highlight-code";
                let line = prev.getAttribute('data-line-number');
                start = line;
                end = line;
                $('#LC' + line).addClass('highlight-code');
                let tr = '<tr>' + $('#L' + line).closest('tr').html() + '</tr>';
                code.push(tr);
            }
        }

        $('.file-save-info').on('click', '#save-lines__btn', function () {
            alert(start + '  ' + end);

            var linesInfo = {
                text: code.join(''),
                firstLine: start,
                lastLine: end,
                filePath: thisObject.$route.path.replace('/repo', '')
            };

            git.saveLines(thisObject, linesInfo, auth.user.id).then(result => {

                },
                error => {
                    alert(error)
                }
            );
        })
    }
</script>