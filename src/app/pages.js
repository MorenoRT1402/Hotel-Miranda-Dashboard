export const pages = {
    home: {
      path: '/',
      title: 'Dashboard'
    },
    rooms: {
      path: 'rooms/:id',
      title: 'Room List',
      detailTitle: 'Room Detail'
    },
    booking: {
      path: 'booking/:id',
      title: 'Guest List',
      detailTitle: 'Guest Detail'
    },
    concierges: {
      path: 'concierges/:id',
      title: 'Concierges List',
      detailTitle: 'Concierge Detail'
    },
    login: {
      path: 'login',
      title: 'Login'
    }
  };

  export const getPageByRoute = route => {
    const normalizedRoute = route.split('/')[1];
  
    for (const key in pages) {
      const page = pages[key].path.split('/')[0];

      if (page == normalizedRoute) {
        return pages[key];
      }
    }
  
    return null;
  };
  