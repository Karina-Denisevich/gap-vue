<template>
    <div class="home-image">
        <img :src="imagePath"/>
    </div>
    <div class="body-home">
        <div class="intro">
            <div class="container">
                <img v-bind:src="'../../resources/img/Black-panther-paw-print-clipart-1024x683.png'" class="hero"/>
                <div class="hero-unit">
                    <h1 class="font-light">ASSISTANT PROGRAMMER</h1>
                    <h3>Make your coding easier.</h3>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <h2>Search GitHub Repos</h2>
                <div id="custom-search-input">
                    <div class="input-group col-md-12">
                        <input v-on:keyup.enter="showTable()" v-model="query" type="text" class="form-control input-lg"
                               placeholder="Search AP"/>
                        <span class="input-group-btn">
                        <button @click="showTable()" class="btn btn-info btn-lg" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="show">
            <search-box :query="query"></search-box>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                query: '',
                imagePath: '../../resources/img/body/full_m1fOZwnQ.jpg'
            }
        },
        methods: {
            showTable(){
                this.show = true
                this.$children[0].changeUrl();

            }
        }

    }

</script>