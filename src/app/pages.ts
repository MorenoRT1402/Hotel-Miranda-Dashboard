import { endpoints } from "./api";

interface PageConfig {
  path: string;
  title: string;
  detailTitle?: string,
  uri?: string,
}

export const pages: Record<string, PageConfig> = {
  home: {
      path: '/',
      title: 'Dashboard',
  },
  rooms: {
      path: endpoints.rooms,
      title: 'Room List',
      detailTitle: 'Room Detail',
  },
  booking: {
      path: endpoints.booking,
      title: 'Guest List',
      detailTitle: 'Guest Detail',
      uri: 'Guest'
  },
  users: {
      path: endpoints.users,
      title: 'Concierges List',
      detailTitle: 'Concierge Detail',
  },
  contact: {
    path: endpoints.contacts,
    title: 'Reviews',
    detailTitle: 'Review'
  },
  login: {
      path: endpoints.login,
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
