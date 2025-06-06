import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import SideNav from '../SideNav.vue';

describe('SideNav', () => {
  it('renders all menu items correctly', () => {
    const { getByText } = render(SideNav);
    
    // 检查菜单标题
    expect(getByText('MENU')).toBeTruthy();
    expect(getByText('GENERAL')).toBeTruthy();

    // 检查所有菜单项是否存在
    const menuItems = ['Dashboard', 'My Asset', 'Analytics', 'History', 'News'];
    menuItems.forEach(item => {
      expect(getByText(item)).toBeTruthy();
    });

    // 检查所有通用菜单项是否存在
    const generalItems = ['Help', 'Settings', 'Logout'];
    generalItems.forEach(item => {
      expect(getByText(item)).toBeTruthy();
    });
  });

  it('changes active item when clicked', async () => {
    const { getByText } = render(SideNav);
    
    // 默认选中 Dashboard
    const dashboardItem = getByText('Dashboard').closest('.menu-item');
    expect(dashboardItem?.classList.contains('active')).toBe(true);

    // 点击 Analytics 菜单项
    const analyticsItem = getByText('Analytics').closest('.menu-item');
    await fireEvent.click(analyticsItem!);
    
    // 验证 Analytics 变为激活状态
    expect(analyticsItem?.classList.contains('active')).toBe(true);
    expect(dashboardItem?.classList.contains('active')).toBe(false);
  });

  it('renders all icons correctly', () => {
    const { container } = render(SideNav);
    
    // 检查所有图标是否正确加载
    const icons = [
      'home-1', 'wallet', 'chart', 'time', 'news',
      'info', 'settings', 'logout'
    ];

    icons.forEach(icon => {
      const img = container.querySelector(`img[src="/src/assets/icons/${icon}.svg"]`);
      expect(img).toBeTruthy();
    });
  });
});