<template>
    <div id="app-table" class="ui vertical stripe segment">
        <div class="ui container">
            <div id="content" class="ui basic segment top-buffer">
                <h3 class="ui header">Github Repos</h3>
                <div>
                    <label>Per Page:</label>
                    <select class="ui simple dropdown" v-model="perPage">
                        <option value=10>10</option>
                        <option value=15>15</option>
                        <option value=20>20</option>
                        <option value=25>25</option>
                        <option value=50>50</option>
                        <option value=100>100</option>
                        <option value=250>250</option>
                    </select>
                </div>
                <vuetable ref="vuetable"
                          :api-url="url"
                          table-wrapper="#content"
                          :fields="columns"
                          :per-page="perPage"
                          :item-actions="itemActions"
                          pagination-path=""
                ></vuetable>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '../auth'
    import git from '../git'
    export default {
        watch: {
            'perPage': function (val, oldVal) {
                this.$broadcast('vuetable:refresh')
            },
        },
        data() {
            return {
                repoData: '',
                url: 'http://localhost:8082/api/git/' + this.query,
                perPage: 10,
                columns: [
                    {
                        name: 'id',
                        titleClass: 'odd',
                        dataClass: ''
                    },
                    {
                        name: 'name',
                        titleClass: 'even',
                        dataClass: ''
                    },
                    {
                        name: 'owner',
                        titleClass: '',
                        dataClass: ''
                    },
                    {
                        name: 'url',
                        titleClass: '',
                        dataClass: 'table-url'
                    },
                    {
                        name: 'language',
                        titleClass: '',
                        dataClass: ''
                    },
                    {
                        name: '__actions',
                        titleClass: '',
                        dataClass: ''
                    }
                ],
                itemActions: [
                    {name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button'}
                ]
            }
        },
        props: ['query'],
        methods: {
            changeUrl(){
                this.url = 'http://localhost:8082/api/git/' + this.query,
                    this.$nextTick(() => {
//                        this.$broadcast('vuetable:reload')
                        this.$broadcast('vuetable:refresh')
                    })
            }
        },
        ready(){
            this.changeUrl();
        },
        events: {
            'vuetable:action': function (action, data) {
               // if(auth.checkAuth()){


                            git.goToRepo(data.owner, data.name);

               // }
            },
            'vuetable:load-error': function (response) {
                console.log("load error");
            },
            'vuetable:loading': function () {
                console.log("load started");
            },
            'vuetable:load-success': function (response) {
                console.log("load completed");

            },
            'vuetable:loaded': function (response) {
                $('td.table-url').each(function () {
                    var link = $(this).html();
                    $(this).html('<a target="_blank" href="' + link + '">' + link + '</a>')
                })
            }
        }
    }

</script>


