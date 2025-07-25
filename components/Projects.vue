<template>
    <section class="sec-projects">
        <h2 class="section-title">
            <span class="line-section-title">Latest projects</span>
        </h2>
        <ul class="projects-list">
            <li class="project" v-for="item in projects" :key="item.id">
                <div class="img-container">
                    <img :src="item.img" alt="">
                </div>
                <div class="project-info">
                    <h3 v-html="item.title"></h3>
                    <p v-html="item.description"></p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>

const projects = ref([
    {
        id: 1,
        img: '/images/dassault.webp',
        title: 'Timeline Dassaut adventure',
        description: 'Made at <span class="compagny">Dusens Europe</span>, see the <a href="https://dusens.group/en/stories/dassault-aviation-creation-of-an-immersive-timeline/" target="">project use case</a> or <a href="https://timeline.dassault-aviation.com/fr/" target="">view it online</a>',
    },
    {
        id: 2,
        img: '/images/nexans.webp',
        title: 'Nexans infography data center',
        description: 'Made at <span class="compagny">Dusens Europe</span>, see the <a href="https://dusens.group/en/stories/nexans-creation-of-the-new-corporate-website/" target="">project use case</a> or <a href="https://www.nexans.com/perspective/data-centers-wired-to-last/" target="">view it online</a>',
    },
    {
        id: 3,
        img: '/images/mobilize.webp',
        title: 'Mobilize',
        description: 'Made at <span class="compagny">Dusens Europe</span>, see the <a href="https://dusens.group/en/stories/mobilize-editorial-strategy-design-and-creation-of-the-mobilize-corporate-platform/" target="">project use case</a> or <a href="https://mobilize.com/" target="">view it online</a>',
    },
    {
        id: 4,
        img: '/images/vgf.webp',
        title: 'VGF France',
        description: 'Made at <span class="compagny">Dusens Europe</span>, see the <a href="https://dusens.group/en/stories/volkswagen-group-france-social-media-strategy-and-editorial-support/" target="">project use case</a> or <a href="https://volkswagengroup.fr/" target="">view it online</a>',
    },
    {
        id: 5,
        img: '/images/dusens.webp',
        title: 'Dusens "About" page with a three.js animation background',
        description: 'Made at <span class="compagny">Dusens Europe</span>, <a href="https://dusens.group/en/about-us/" target="">view it online</a>',
    },
])

</script>