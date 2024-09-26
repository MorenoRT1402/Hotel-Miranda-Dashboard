interface PageConfig {
  path: string;
  title: string;
  detailTitle?: string;
}

export const pages: Record<string, PageConfig> = {
  home: {
      path: '/',
      title: 'Dashboard',
  },
  rooms: {
      path: 'rooms',
      title: 'Room List',
      detailTitle: 'Room Detail',
  },
  booking: {
      path: 'booking',
      title: 'Guest List',
      detailTitle: 'Guest Detail',
  },
  concierges: {
      path: 'concierges',
      title: 'Concierges List',
      detailTitle: 'Concierge Detail',
  },
  contact: {
    path: 'contact',
    title: 'Reviews',
    detailTitle: 'Review'
  },
  login: {
      path: 'login',
      title: 'Login',
  },
};

export const getPageByRoute = (route: string): PageConfig | null => {
  const normalizedRoute = route.split('/')[1];

  for (const key in pages) {
      const page = pages[key].path.split('/')[0];

      if (page === normalizedRoute) {
          return pages[key];
      }
  }

  return null;
};
