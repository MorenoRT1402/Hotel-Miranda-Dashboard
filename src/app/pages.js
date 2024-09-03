export const pages = {
    home: {
      path: '/',
      title: 'Dashboard'
    },
    booking: {
      path: 'booking/:id',
      title: 'Booking'
    },
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
  