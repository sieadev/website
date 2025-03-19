<script setup lang="ts">

</script>

<template>
  <div class="music-player dark" :class="{ 'is-playing': isPlaying, 'minimized': !isHovered }" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <!-- Add minimized view -->
    <div class="minimized-view">
      <i class="fas fa-music" :class="{ 'active': isPlaying }"></i>
    </div>
    
    <!-- Existing content wrapped in expanded view -->
    <div class="expanded-view">
      <div class="song-info">
        <img :src="currentSong.thumbnail" alt="Album Cover" class="cover-art">
        <div class="text-info">
          <h3>{{ currentSong.title }}</h3>
          <p>{{ currentSong.artist }}</p>
        </div>
      </div>
      
      <div class="controls">
        <button @click="previousSong">
          <i class="fas fa-backward"></i>
        </button>
        <button @click="togglePlay" class="play-btn">
          <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
        </button>
        <button @click="nextSong">
          <i class="fas fa-forward"></i>
        </button>
      </div>
  
      <div class="progress-container">
          <div class="progress-bar" :class="{ 'live': currentSong.isLive }">
              <div class="progress" :style="{ width: currentSong.isLive ? '100%' : progress + '%' }"></div>
          </div>
          <span v-if="currentSong.isLive" class="live-indicator">LIVE</span>
      </div>
  
      <iframe
        ref="player"
        :src="currentSong.embedUrl"
        style="display: none"
        allow="autoplay"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const player = ref(null)
const isPlaying = ref(false)
const currentIndex = ref(0)
const progress = ref(0)
const isHovered = ref(false)

const playlist = [
  {
    title: 'Lo-Fi Study Mix',
    artist: 'ChilledCow',
    videoId: 'jfKfPfyJRdk',
    thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?enablejsapi=1',
    isLive: true
  },
  {
    title: 'Relaxing Piano',
    artist: 'YellowBrickCinema',
    videoId: 'XYmLhn3qJ6Y',
    thumbnail: 'https://img.youtube.com/vi/XYmLhn3qJ6Y/maxresdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/XYmLhn3qJ6Y?enablejsapi=1',
    isLive: false
  }
]

const currentSong = ref(playlist[0])

const togglePlay = () => {
  const iframe = player.value
  const message = isPlaying.value ? 'pauseVideo' : 'playVideo'
  iframe.contentWindow.postMessage(`{"event":"command","func":"${message}","args":""}`, '*')
  isPlaying.value = !isPlaying.value
}

const nextSong = () => {
  const wasPlaying = isPlaying.value
  currentIndex.value = (currentIndex.value + 1) % playlist.length
  currentSong.value = playlist[currentIndex.value]
  
  if (wasPlaying) {
    isPlaying.value = false
    setTimeout(() => {
      const iframe = player.value
      // Seek to beginning of video
      iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0]}', '*')
      togglePlay()
    }, 1000)
  }
}

const previousSong = () => {
  const wasPlaying = isPlaying.value
  currentIndex.value = currentIndex.value === 0 ? playlist.length - 1 : currentIndex.value - 1
  currentSong.value = playlist[currentIndex.value]
  
  if (wasPlaying) {
    isPlaying.value = false
    setTimeout(() => {
      const iframe = player.value
      // Seek to beginning of video
      iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0]}', '*')
      togglePlay()
    }, 1000)
  }
}

onMounted(() => {
  window.onYouTubeIframeAPIReady = () => {
    console.log('YouTube API Ready')
  }
})
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 300px;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.music-player.minimized {
  width: 50px;
  height: 50px;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
}

.minimized-view {
  display: none;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.minimized-view i {
  opacity: 0.5;
  transition: all 0.3s ease;
}

.minimized-view i.active {
  opacity: 1;
  animation: pulseIcon 2s infinite;
}

.music-player.minimized .minimized-view {
  display: flex;
}

.music-player.minimized .expanded-view {
  display: none;
}

.expanded-view {
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* Update existing animations */
.music-player:not(.is-playing):not(.minimized) {
  transform: translateY(10px);
  opacity: 0.8;
}

.music-player:hover {
  transform: translateY(0);
  opacity: 1;
}

.dark {
  background: rgba(18, 18, 18, 0.95);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dark .text-info h3 {
  color: #ffffff;
}

.dark .text-info p {
  color: #a1a1a1;
}

.dark .controls button {
  color: #ffffff;
}

.dark .play-btn {
  background: #ffffff;
  color: #000000 !important;
}

.dark .play-btn:hover {
  background: #e1e1e1;
}

.dark .progress-bar {
  background: #333333;
}

.dark .progress {
  background: #ffffff;
}

/* Common styles remain the same */
.song-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.cover-art {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 15px;
}

.text-info h3 {
  margin: 0;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.text-info p {
  margin: 5px 0 0;
  font-size: 0.8rem;
  transition: color 0.3s ease;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}

.controls button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  opacity: 0.8;
  transform: scale(1);
}

.controls button:hover {
  opacity: 1;
  transform: scale(1.1);
}

.controls button:active {
  transform: scale(0.95);
}

.play-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.play-btn:hover {
  transform: scale(1.03);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.play-btn:active {
  transform: scale(0.95);
}


.music-player {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.music-player:not(.is-playing) {
  transform: translateY(10px);
  opacity: 0.8;
}

.music-player:hover {
  transform: translateY(0);
  opacity: 1;
}


.play-btn i {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.play-btn:hover i {
  transform: scale(1.1);
}

.is-playing .play-btn i {
  animation: pulseIcon 2s infinite;
}

@keyframes pulseIcon {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
}

.live-indicator {
  color: #ff0000;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
  transition: background 0.3s ease;
}

.progress {
  height: 100%;
  transition: all 0.3s ease;
}

.progress-bar.live {
  background: rgba(255, 0, 0, 0.2);
}

.progress-bar.live .progress {
  background: rgba(255, 0, 0, 0.8);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.live-badge {
  background: #ff0000;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  vertical-align: middle;
}
</style>