<script setup lang="ts">
import { ref } from 'vue';

interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

const menuItems = ref<MenuItem[]>([
  { id: 'dashboard', name: 'Dashboard', icon: 'home-1' },
  { id: 'asset', name: 'My Asset', icon: 'wallet' },
  { id: 'analytics', name: 'Analytics', icon: 'chart' },
  { id: 'history', name: 'History', icon: 'time' },
  { id: 'news', name: 'News', icon: 'news' },
]);

const generalItems = ref<MenuItem[]>([
  { id: 'help', name: 'Help', icon: 'info' },
  { id: 'settings', name: 'Settings', icon: 'settings' },
  { id: 'logout', name: 'Logout', icon: 'logout' },
]);

const activeItem = ref('dashboard');

const setActiveItem = (id: string) => {
  activeItem.value = id;
};
</script>

<template>
  <nav class="side-nav">
    <div class="nav-content">
      <div class="menu-section">
        <h3 class="section-title">MENU</h3>
        <ul class="menu-list">
          <li v-for="item in menuItems" :key="item.id"
              :class="['menu-item', { active: activeItem === item.id }]"
              @click="setActiveItem(item.id)">
            <div class="item-content">
              <div class="icon-wrapper">
                <img :src="`/src/assets/icons/${item.icon}.svg`" :alt="item.name">
              </div>
              <span class="item-name">{{ item.name }}</span>
            </div>
            <div v-if="activeItem === item.id" class="active-indicator"></div>
          </li>
        </ul>
      </div>

      <div class="menu-section">
        <h3 class="section-title">GENERAL</h3>
        <ul class="menu-list">
          <li v-for="item in generalItems" :key="item.id"
              :class="['menu-item', { active: activeItem === item.id }]"
              @click="setActiveItem(item.id)">
            <div class="item-content">
              <div class="icon-wrapper">
                <img :src="`/src/assets/icons/${item.icon}.svg`" :alt="item.name">
              </div>
              <span class="item-name">{{ item.name }}</span>
            </div>
            <div v-if="activeItem === item.id" class="active-indicator"></div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.side-nav {
  width: 256px;
  height: 100vh;
  background: #FFFFFF;
  box-shadow: 24px 0px 80px 0px rgba(49, 79, 124, 0.02);
  padding: 32px 16px;
  box-sizing: border-box;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #8F98B7;
  margin: 0;
  padding-left: 16px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  position: relative;
  height: 56px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: rgba(244, 246, 248, 0.73);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(244, 246, 248, 0.9);
  }

  &.active {
    background: rgba(244, 246, 248, 0.9);

    .item-name {
      color: #1CAC70;
    }

    .icon-wrapper {
      background: linear-gradient(135deg, #1CAC70 0%, #EDDC46 100%);
      img {
        filter: brightness(0) invert(1);
      }
    }
  }
}

.item-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(143, 152, 183, 0.2);
  transition: all 0.3s ease;

  img {
    width: 16px;
    height: 16px;
    transition: all 0.3s ease;
  }
}

.item-name {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #8F98B7;
  transition: color 0.3s ease;
}

.active-indicator {
  position: absolute;
  right: 13px;
  width: 4px;
  height: 29px;
  background: linear-gradient(135deg, #1CAC70 0%, #EDDC46 100%);
  border-radius: 2px;
}
</style>