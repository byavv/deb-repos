export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'repositories',
        data: {
          menu: {
            title: 'Репозитории',
            icon: '',
            selected: false,
            expanded: false,
            order: 0
          },
          children: [
            {
              path: 'nav',
              data: {
                menu: {
                  title: 'Навигация',
                }
              }
            }
          ]
        }
      }
    ]
  }
];
