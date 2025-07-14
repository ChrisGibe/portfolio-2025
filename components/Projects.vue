<template>
    <section class="sec-projects">
        <h2 class="section-title">
            <span class="line-section-title">Latest projects</span>
        </h2>
        <ul class="projects-list">
            <li class="project" v-for="item in projects" :key="item.id">
                <div class="video-container">
                    <video :src="item.video" muted loop playsinline></video> 
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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = ref([
    {
        id: 1,
        video: '/videos/dassault-website.mp4',
        title: 'Timeline Dassaut adventure',
        description: 'Made at <span class="compagny">Dusens Europe</span>, see the <a href="https://dusens.group/en/stories/dassault-aviation-creation-of-an-immersive-timeline/" target="">project use case</a> or <a href="https://timeline.dassault-aviation.com/fr/" target="">view it online</a>',
    },
    {
        id: 2,
        video: '/videos/nexans-infography-data-center.mp4',
        title: 'Nexans infography data center',
        description: 'Made at <span class="compagny">Dusens Europe</span>, see the <a href="https://dusens.group/en/stories/nexans-creation-of-the-new-corporate-website/" target="">project use case</a> or <a href="https://www.nexans.com/perspective/data-centers-wired-to-last/" target="">view it online</a>',
    },
])

onMounted(() => {
    ScrollTrigger.create({
        trigger: '.project',
        start: 'top center',
        end: 'bottom bottom',
        onEnter: () => {
            const videos = document.querySelectorAll('video');
            videos.forEach((video) => {
                //video.play();
            });
        },
    })

    gsap.from('.line-section-title', {
        translateY: '100%',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: '.section-title',
            start: 'bottom bottom',
            end: 'bottom bottom',
        }
    })
})

</script>