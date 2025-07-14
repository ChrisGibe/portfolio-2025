<template>
    <Head>
      <Title>Gibelli Christophe — Frontend developer</Title>
      <Meta name="description" content="Gibelli Christophe — Frontend developer" />
    </Head>
    <NuxtLayout>
        <Opening />
        <Wip />
        <Projects />
    </NuxtLayout>
</template>

<script setup>
import { gsap } from 'gsap'
import { SmoothScroll } from './assets/js/modules/SmoothScroll';

onMounted(() => {
    window.scrollTo(0, 0);
    
    const smoothScroll = new SmoothScroll();
    smoothScroll.init();

    const tl = gsap.timeline();
    tl
    .to('.line', {scaleX: 0.2, duration: 1.2, ease: 'linear'})
    .to('.line', {scaleX: 0.8, duration: 1, ease: 'power2.inOut'})
    .to('.line', {scaleX: 1, duration: 1.2, ease: 'power2.inOut'})
    .to('.top', {scaleY: 0, duration: 1.7, ease: 'power4.inOut'})
    .to('.bottom', {scaleY: 0, duration: 1.7, ease: 'power4.inOut'}, '<')
    .to('.line', { autoAlpha: 0, duration: 0.2, ease: 'linear' }, '<')
    .from(['.first-name', '.last-name'], { translateY: '100%', duration: 1.1, ease: 'power2.inOut'}, '<0.4')
    .from(['.job', '.company'], { autoAlpha: 0, duration: 0.2, ease: 'power2.inOut'}, '<1')
})
</script>
