<template>
    <section class="sec-projects">
        <h2 class="section-title">Latest projects</h2>
        <ul class="projects-list">
            <li class="project" v-for="item in projects" :key="item.id">
                <div class="video-container">
                    <video :src="item.video" muted loop playsinline></video> 
                </div>
                <div class="project-info">
                    <h3 v-html="item.title"></h3>
                    <p v-html="item.description"></p>
                </div>
                <a class="project-link" :href="item.url" target="" :aria-label="item.ariaLabel">View it online</a>
            </li>
        </ul>
    </section>
</template>

<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = ref([
    {
        id: 1,
        video: '/videos/dassault-website.mp4',
        title: 'Timeline Dassaut adventure',
        url: 'https://timeline.dassault-aviation.com/fr/',
        ariaLabel: 'The Dassault Adventure Timeline website in French',
        description: 'Made at <a href="https://dusens.group/en/stories/dassault-aviation-creation-of-an-immersive-timeline/" target="">Dusens Europe Tech Team</a>',
    },
    {
        id: 2,
        video: '/videos/nexans-infography-data-center.mp4',
        title: 'Nexans infography data center',
        url: 'https://www.nexans.com/perspective/data-centers-wired-to-last/',
        ariaLabel: 'The Nexans website in French',
        description: 'Made at <a href="https://dusens.group/en/stories/nexans-creation-of-the-new-corporate-website/" target="">Dusens Europe Tech Team</a>',
    },
])

onMounted(() => {
    ScrollTrigger.create({
        trigger: '.project',
        start: 'top center',
        end: 'top center',
        onEnter: () => {
            const videos = document.querySelectorAll('video');
            videos.forEach((video) => {
                video.play();
            });
        },
    })
})

</script>