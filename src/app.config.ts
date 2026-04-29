export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/health/index',
    'pages/reminder/index',
    'pages/profile/index',
    'pages/user-init/index',
    'pages/family/index',
    'pages/baby/index',
    'pages/medical-record/index',
  ],
  tabBar: {
    color: '#8e8376',
    selectedColor: '#e97853',
    backgroundColor: '#fffaf3',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/tabbar-default.png',
        selectedIconPath: 'assets/tabbar-active.png',
      },
      {
        pagePath: 'pages/health/index',
        text: '健康',
        iconPath: 'assets/tabbar-default.png',
        selectedIconPath: 'assets/tabbar-active.png',
      },
      {
        pagePath: 'pages/reminder/index',
        text: '提醒',
        iconPath: 'assets/tabbar-default.png',
        selectedIconPath: 'assets/tabbar-active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/tabbar-default.png',
        selectedIconPath: 'assets/tabbar-active.png',
      },
    ],
  },
  window: {
    navigationBarTitleText: '宝宝健康档案',
    navigationBarBackgroundColor: '#f8f4ea',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f6f2ea',
    backgroundTextStyle: 'light',
  },
});
