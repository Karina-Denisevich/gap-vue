<template>
    <div class="container">
        <div>
            <meta charset="utf-8">
            <link crossorigin="anonymous" media="all"
                  integrity="sha512-ISsGppDAOaepQ4upEA9mm4sMLKs3V+WJ5yaoGgHBrY13vkDtM37b0Y8Uej1pifaUkAcHJ9kkdxNf48eHtV595g=="
                  rel="stylesheet"
                  href="https://assets-cdn.github.com/assets/frameworks-1a4dd44c32a7f3b22f5ee95cb87b4646.css">
            <link crossorigin="anonymous" media="all"
                  rel="stylesheet"
                  href="https://assets-cdn.github.com/assets/github-ef9e6df593c3136722bd837c0437786d.css">
            <link crossorigin="anonymous" media="all"
                  integrity="sha512-+G4sIYlb3eQxH1jJoAG/Ed2g3dlNc6jvO89e2RBT0+oVtPJQP4AINvlrwG4w48vGz0HVM7frVoaV1NLEfb6/1A=="
                  rel="stylesheet"
                  href="https://assets-cdn.github.com/assets/site-b4158a9f22ebd9e592779d889c0f9aaf.css">
            <meta name="viewport" content="width=device-width">
            <title>Java/.classpath at master · TheAlgorithms/Java · GitHub</title>


            <div class="alert alert-danger table-alert" v-if="error">
                <p>{{ error }}</p>
            </div>
            <div class="alert alert-info table-alert" v-if="info">
                <p>{{ info }}</p>
            </div>


            <div id="content" role="main" class="application-main  cust-container-top-buttom">
                <div itemscope="" itemtype="http://schema.org/SoftwareSourceCode" class="">
                    <div id="js-repo-pjax-container" data-pjax-container="">
                        <div class="container new-discussion-timeline experiment-repo-nav  ">
                            <div class="repository-content" v-for="item in bookmarks">
                                <!-- blob contrib key: blob_contributors:v21:2549229825bf0afafdd3cd7382c51f44 -->
                                <div class="file">

                                    <div class="file-header">
                                        <div class="file-actions">
                                            <button edit-id="{{item.id}}" v-on:click="editBookmark(item.id)"
                                                    class="btn-octicon tooltipped tooltipped-nw"
                                                    type="submit"
                                                    aria-label="Edit this file" data-hotkey="e" data-disable-with="">
                                                <svg class="octicon octicon-pencil" viewBox="0 0 14 16" version="1.1"
                                                     width="14" height="16" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                          d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"></path>
                                                </svg>
                                            </button>
                                            <!-- '"` --><!-- </textarea></xmp> -->

                                            <button delete-id="{{item.id}}" v-on:click="deleteBookmark(item.id)"
                                                    class="btn-octicon btn-octicon-danger tooltipped tooltipped-nw"
                                                    type="submit" aria-label="Delete this file" data-disable-with="">
                                                <svg class="octicon octicon-trashcan" viewBox="0 0 12 16" version="1.1"
                                                     width="12" height="16" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                          d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"></path>
                                                </svg>
                                            </button>
                                        </div>

                                        <div class="file-info">
                                            <a style="font-size: 16px"
                                               href="{{item.mainLinkPath}}">{{item.mainLinkTitle}}</a>
                                        </div>
                                    </div>

                                    <div itemprop="text" class="blob-wrapper data type-xml">
                                        <table class="highlight tab-size js-file-line-container" data-tab-size="8">
                                            <tbody v-html="item.text">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import user from '../user'
    import auth from '../auth'
    import {router} from '../index'
    export default {
        data() {
            return {
                legacySystemHTML: '',
                bookmarks: [],
                error: '',
                info: ''

            }
        },
        ready() {
            user.getBookmarks(this, auth.user.id).then(result => {
                    // this.git = result.data;

                    this.bookmarks = result.data;
                    for (let i = 0; i < result.data.length; i++) {
                        this.bookmarks[i].mainLinkTitle = result.data[i].filePath.substr(0, result.data[i].filePath.indexOf('blob'))
                        this.bookmarks[i].mainLinkPath = "/index.html#!/repo" + result.data[i].filePath;
                    }

                    // this.legacySystemHTML = result.data[0].text;
                },
                error => {
                    this.error = error;
                }
            );
        },
        methods: {
            editBookmark(id){
//                alert(id)
//                let vm = this;
//                user.updateBookmark(this, item)
//                    .then(result => {
//                            vm.info = 'Updated'
//                            setTimeout(function () {
//                                vm.info = '';
//                            }, 3000);
//                            for (var i = 0; i < vm.rows.length; i++) {
//                                if (item.id === vm.rows[i][0]) {
//                                    alert(vm.rowsCopy[i][0] + '  ' + item.username)
//                                    vm.rowsCopy[i][0] = item.username;
//                                    vm.rowsCopy[i][1] = item.password;
//                                    vm.rowsCopy[i][2] = item.authorities;
//                                    break;
//                                }
//                            }
//                        },
//                        error => {
//                            this.error = error.data;
//                            setTimeout(function () {
//                                vm.error = '';
//                            }, 10000);
//                        })
            },
            deleteBookmark(id){
                var vm = this;
                this.clearMessages();

                user.deleteBookmark(this, auth.user.id, id)
                    .then(result => {
                            for (let i = 0; i <  this.bookmarks.length; i++) {
                                if (this.bookmarks[i].id == id) {
                                    this.bookmarks.splice(i, 1);
                                }
                            }
                        },
                        error => {
                            this.error = error;
                        }
                    );
            },
            clearMessages(){
                this.error = '';
                this.info = '';
            }
        }
    }
</script>